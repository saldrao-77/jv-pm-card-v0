"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Download, Search, ArrowUpDown, Trash2, Save, X, Edit2, Database } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define the submission type
type Submission = {
  id: string
  name: string | null
  email: string
  company: string | null
  properties: string | null
  status: string
  submitted_at: string
  source: string
  form_source: string | null
  notes: string | null
  url: string | null
  user_agent: string | null
  ip_address: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  last_contacted_at: string | null
  assigned_to: string | null
  isNew?: boolean
}

// Define available tables - Only Property Management
const AVAILABLE_TABLES = [{ id: "jv_pm", name: "Property Management" }]

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [formSourceFilter, setFormSourceFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesText, setNotesText] = useState("")
  const [newSubmissionsCount, setNewSubmissionsCount] = useState(0)
  const [currentTable, setCurrentTable] = useState(AVAILABLE_TABLES[0].id)
  const notesTextareaRef = useRef<HTMLTextAreaElement>(null)
  const lastSubmissionCountRef = useRef(0)

  // Load submissions from Supabase
  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from(currentTable).select("*").order("submitted_at", { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        // Check for new submissions
        if (lastSubmissionCountRef.current > 0 && data.length > lastSubmissionCountRef.current) {
          setNewSubmissionsCount(data.length - lastSubmissionCountRef.current)

          // Mark new submissions
          const updatedSubmissions = data.map((sub: Submission, index: number) => {
            if (index < data.length - lastSubmissionCountRef.current) {
              return { ...sub, isNew: true }
            }
            return sub
          })

          setSubmissions(updatedSubmissions)
          setFilteredSubmissions(updatedSubmissions)
        } else {
          setSubmissions(data)
          setFilteredSubmissions(data)
        }

        lastSubmissionCountRef.current = data.length
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
      // If table doesn't exist yet, show empty state
      setSubmissions([])
      setFilteredSubmissions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()

    // Set up polling for new submissions
    const interval = setInterval(fetchSubmissions, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [currentTable])

  // Filter submissions based on search, status, source, and date range
  useEffect(() => {
    let filtered = [...submissions]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false ||
          sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false,
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => sub.status === statusFilter)
    }

    // Filter by form source
    if (formSourceFilter !== "all") {
      filtered = filtered.filter((sub) => sub.form_source === formSourceFilter)
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter((sub) => new Date(sub.submitted_at) >= new Date(startDate))
    }

    if (endDate) {
      filtered = filtered.filter((sub) => new Date(sub.submitted_at) <= new Date(endDate + "T23:59:59"))
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.submitted_at).getTime()
      const dateB = new Date(b.submitted_at).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredSubmissions(filtered)
  }, [submissions, searchTerm, statusFilter, formSourceFilter, startDate, endDate, sortOrder])

  // Focus textarea when editing notes
  useEffect(() => {
    if (editingNotes && notesTextareaRef.current) {
      notesTextareaRef.current.focus()
    }
  }, [editingNotes])

  // Count submissions by status
  const totalCount = submissions.length
  const pendingCount = submissions.filter((sub) => sub.status === "pending").length
  const processedCount = submissions.filter(
    (sub) => sub.status === "contacted" || sub.status === "qualified" || sub.status === "converted",
  ).length

  // Handle refresh
  const handleRefresh = () => {
    fetchSubmissions()
    setNewSubmissionsCount(0)
  }

  // Handle export to CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Company", "Properties", "Status", "Date", "Form Source", "Table", "Notes"]
    const csvData = filteredSubmissions.map((sub) => [
      sub.id,
      sub.name || "",
      sub.email,
      sub.company || "",
      sub.properties || "",
      sub.status,
      new Date(sub.submitted_at).toLocaleString(),
      sub.form_source || "",
      sub.source,
      sub.notes || "",
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `jobvault-${currentTable}-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from(currentTable)
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
          last_contacted_at: newStatus === "contacted" ? new Date().toISOString() : null,
        })
        .eq("id", id)

      if (error) {
        throw error
      }

      // Update local state
      setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub)))
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  // Handle delete submission
  const handleDeleteSubmission = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        const { error } = await supabase.from(currentTable).delete().eq("id", id)

        if (error) {
          throw error
        }

        // Update local state
        setSubmissions(submissions.filter((sub) => sub.id !== id))
      } catch (error) {
        console.error("Error deleting submission:", error)
      }
    }
  }

  // Start editing notes
  const startEditingNotes = (id: string, currentNotes: string | null) => {
    setEditingNotes(id)
    setNotesText(currentNotes || "")
  }

  // Save notes
  const saveNotes = async (id: string) => {
    try {
      const { error } = await supabase
        .from(currentTable)
        .update({
          notes: notesText,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) {
        throw error
      }

      // Update local state
      setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, notes: notesText } : sub)))
      setEditingNotes(null)
    } catch (error) {
      console.error("Error updating notes:", error)
    }
  }

  // Cancel editing notes
  const cancelEditingNotes = () => {
    setEditingNotes(null)
    setNotesText("")
  }

  // Handle table change
  const handleTableChange = (tableId: string) => {
    setCurrentTable(tableId)
    setNewSubmissionsCount(0)
    lastSubmissionCountRef.current = 0
    setEditingNotes(null)
    setNotesText("")
  }

  // Get unique form sources for filter dropdown
  const uniqueFormSources = Array.from(new Set(submissions.map((sub) => sub.form_source).filter(Boolean)))

  // Get unique statuses for filter dropdown
  const uniqueStatuses = Array.from(new Set(submissions.map((sub) => sub.status)))

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Lead Submissions Dashboard</h1>
            <div className="flex items-center mt-2">
              <Database className="h-4 w-4 mr-2 text-blue-400" />
              <div className="flex items-center space-x-2">
                <span className="text-white/60">Current Table:</span>
                <span className="bg-zinc-800 border-zinc-700 rounded p-1 text-sm">Property Management</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2" onClick={toggleSortOrder}>
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2 relative" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Refresh Data
              {newSubmissionsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {newSubmissionsCount}
                </span>
              )}
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCSV}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="search" className="block text-xs font-medium mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name, email, company..."
                  className="pl-10 bg-zinc-800 border-zinc-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="formSource" className="block text-xs font-medium mb-1">
                Form Source
              </label>
              <select
                id="formSource"
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={formSourceFilter}
                onChange={(e) => setFormSourceFilter(e.target.value)}
              >
                <option value="all">All Sources</option>
                {uniqueFormSources.map((source) => (
                  <option key={source} value={source}>
                    {source?.charAt(0).toUpperCase() + source?.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-xs font-medium mb-1">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="bg-zinc-800 border-zinc-700"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-xs font-medium mb-1">
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  className="bg-zinc-800 border-zinc-700"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="text-sm">
              <span className="text-white/60">Total:</span> <span className="font-bold">{totalCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">Pending:</span>{" "}
              <span className="font-bold text-yellow-400">{pendingCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">Processed:</span>{" "}
              <span className="font-bold text-green-400">{processedCount}</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg overflow-hidden text-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={toggleSortOrder}>
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Form Source
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-white/60">Loading submissions...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-20 text-center text-white/60">
                      {currentTable === "jv_pm" ? (
                        "No submissions found matching your filters."
                      ) : (
                        <>
                          No data found in this table. This table may not exist yet.
                          <br />
                          Create the table in Supabase to start collecting data.
                        </>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className={`hover:bg-zinc-800/50 ${submission.isNew ? "bg-blue-900/20" : ""}`}
                    >
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.name || "-"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.email}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.company || "-"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">{submission.properties || "-"}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <select
                          className="bg-zinc-800 border-zinc-700 rounded p-1 text-xs w-24"
                          value={submission.status}
                          onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        {new Date(submission.submitted_at).toLocaleDateString() +
                          " " +
                          new Date(submission.submitted_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-blue-900/20 text-blue-400">
                          {submission.form_source || "-"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-green-900/20 text-green-400">
                          {submission.source}
                        </span>
                      </td>
                      <td className="px-3 py-2 max-w-[200px]">
                        {editingNotes === submission.id ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              ref={notesTextareaRef}
                              className="w-full h-16 bg-zinc-800 border-zinc-700 rounded p-1 text-xs"
                              value={notesText}
                              onChange={(e) => setNotesText(e.target.value)}
                              placeholder="Add notes here..."
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 py-1 h-8"
                                onClick={() => saveNotes(submission.id)}
                              >
                                <Save className="h-3 w-3" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 py-1 h-8"
                                onClick={cancelEditingNotes}
                              >
                                <X className="h-3 w-3" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="text-xs text-white/80 max-w-[180px] break-words">
                              {submission.notes || <span className="text-white/40 italic">No notes</span>}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="ml-2"
                              onClick={() => startEditingNotes(submission.id, submission.notes)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => handleDeleteSubmission(submission.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
