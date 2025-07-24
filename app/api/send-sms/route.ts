import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken || !twilioNumber) {
  console.error('Missing Twilio environment variables:', {
    accountSid: !!accountSid,
    authToken: !!authToken,
    twilioNumber: !!twilioNumber
  })
}

const client = twilio(accountSid, authToken)

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    console.log('SMS API called with phone number:', phoneNumber)

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format (+1XXXXXXXXXX)
    const formattedNumber = phoneNumber.startsWith('+1') 
      ? phoneNumber 
      : `+1${phoneNumber.replace(/\D/g, '')}`

    console.log('Formatted phone number:', formattedNumber)
    console.log('Twilio number:', twilioNumber)
    console.log('Account SID:', accountSid)

    // Send SMS via Twilio with A2P compliant message
    const message = await client.messages.create({
      body: 'JobVault: Demo requested. Our team will call you within 24hrs to discuss property expense management solutions. Reply STOP to opt out.',
      from: twilioNumber,
      to: formattedNumber,
    })

    console.log('Message sent successfully:', message.sid)

    return NextResponse.json({
      success: true,
      messageSid: message.sid,
      message: 'SMS sent successfully'
    })

  } catch (error: any) {
    console.error('Twilio error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      moreInfo: error.moreInfo,
      details: error.details
    })
    return NextResponse.json(
      { 
        error: 'Failed to send SMS',
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    )
  }
} 