import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Extract device type from user agent
    const userAgent = data.userAgent || ""
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent.toLowerCase())
    const deviceType = isMobile ? "mobile" : "desktop"

    // Prepare data for Zapier with consistent format
    const zapierData = {
      // User information
      name: data.name || (data.source === "hero" ? "Prospect" : ""),
      email: data.email,
      company: data.company || (data.source === "hero" ? "Unknown" : ""),
      properties: data.properties || (data.source === "hero" ? "Unknown" : ""),

      // Source tracking
      source: data.source,
      url: data.url,

      // Device information
      deviceType: deviceType,
      userAgent: userAgent,
      ipAddress: data.ip || "",

      // UTM parameters
      utmSource: data.utmSource || "",
      utmMedium: data.utmMedium || "",
      utmCampaign: data.utmCampaign || "",

      // Timestamp
      submittedAt: data.submittedAt || new Date().toISOString(),

      // Additional tracking for hero > get-started flow
      isFromHero: data.source === "get-started" && data.url && data.url.includes("email=") ? "yes" : "no",
    }

    // Always send to Zapier regardless of duplicate status
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/22588169/2x8i6wn/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zapierData),
    })

    if (!zapierResponse.ok) {
      console.error("Error sending to Zapier:", await zapierResponse.text())
    }

    // For Supabase, check for duplicates before inserting
    let skipDatabaseInsert = false

    // If this is a hero form submission, check if the email already exists in the database
    if (data.source === "hero") {
      const { data: existingSubmissions, error: checkError } = await supabase
        .from("jv_pm")
        .select("id")
        .eq("email", data.email)
        .limit(1)

      if (checkError) {
        console.error("Error checking for existing submissions:", checkError)
      } else if (existingSubmissions && existingSubmissions.length > 0) {
        // This email already exists in the database, don't create a duplicate from hero form
        console.log("Hero form: Email already exists, skipping database insert")
        skipDatabaseInsert = true
      }
    }

    // Check if this is a duplicate submission (within the last 10 seconds with the same email and source)
    if (!skipDatabaseInsert) {
      const tenSecondsAgo = new Date(Date.now() - 10000).toISOString()
      const { data: recentSubmissions, error: checkError } = await supabase
        .from("jv_pm")
        .select("id")
        .eq("email", data.email)
        .eq("form_source", data.source)
        .gt("submitted_at", tenSecondsAgo)

      if (checkError) {
        console.error("Error checking for recent submissions:", checkError)
      } else if (recentSubmissions && recentSubmissions.length > 0) {
        // This is likely a duplicate submission, don't store it again
        console.log("Detected duplicate submission, skipping database insert")
        skipDatabaseInsert = true
      }
    }

    // Store in Supabase if not a duplicate
    if (!skipDatabaseInsert) {
      // For hero form, ensure we have default values for required fields
      const name = data.name || (data.source === "hero" ? "Prospect" : null)
      const company = data.company || (data.source === "hero" ? "Unknown" : null)
      const properties = data.properties || (data.source === "hero" ? "Unknown" : null)

      // Store submission in Supabase
      const { error: supabaseError } = await supabase.from("jv_pm").insert({
        name: name,
        email: data.email,
        company: company,
        properties: properties,
        form_source: data.source, // Store the original source (hero, homepage, get-started) in form_source
        source: "jv_pm", // Set the source to the table name
        url: data.url,
        user_agent: userAgent,
        ip_address: data.ip || null,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })

      if (supabaseError) {
        console.error("Error storing in Supabase:", supabaseError)
      }
    }

    // Return success if Zapier worked
    if (zapierResponse.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to send to Zapier" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing submission:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
