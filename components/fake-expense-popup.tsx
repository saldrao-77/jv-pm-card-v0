"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Receipt, Calendar, MapPin, CreditCard, X } from "lucide-react"

interface ExpenseItem {
  id: string
  store: string
  address: string
  date: string
  time: string
  items: Array<{
    name: string
    price: number
    quantity?: number
  }>
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  category: string
}

const FAKE_EXPENSES: ExpenseItem[] = [
  {
    id: "REC-001",
    store: "Home Depot",
    address: "1250 W Wisconsin Ave, Milwaukee, WI 53233",
    date: "2024-01-15",
    time: "2:34 PM",
    items: [
      { name: "Paint Rollers (4-pack)", price: 12.97 },
      { name: "Interior Paint - Eggshell White", price: 34.98 },
      { name: "Drop Cloth 9x12", price: 8.47 },
      { name: "Painter's Tape 2\"", price: 6.99 },
    ],
    subtotal: 63.41,
    tax: 5.07,
    total: 68.48,
    paymentMethod: "JobVault Card ****2847",
    category: "Maintenance & Repairs"
  },
  {
    id: "REC-002",
    store: "Lowe's",
    address: "2045 Miller Park Way, Milwaukee, WI 53219",
    date: "2024-01-14",
    time: "10:15 AM",
    items: [
      { name: "Toilet Repair Kit", price: 19.98 },
      { name: "Plumbing Snake 25ft", price: 24.97 },
      { name: "PVC Pipe Fittings", price: 11.46 },
    ],
    subtotal: 56.41,
    tax: 4.51,
    total: 60.92,
    paymentMethod: "JobVault Card ****2847",
    category: "Plumbing"
  },
  {
    id: "REC-003",
    store: "Ace Hardware",
    address: "789 Oakland Ave, Milwaukee, WI 53211",
    date: "2024-01-13",
    time: "4:22 PM",
    items: [
      { name: "Door Locks - Deadbolt Set", price: 45.99 },
      { name: "Keys (3 copies)", price: 4.50 },
      { name: "Lock Installation Kit", price: 12.99 },
    ],
    subtotal: 63.48,
    tax: 5.08,
    total: 68.56,
    paymentMethod: "JobVault Card ****2847",
    category: "Security"
  },
  {
    id: "REC-004",
    store: "Benjamin Moore Paint",
    address: "1455 N Water St, Milwaukee, WI 53202",
    date: "2024-01-12",
    time: "11:05 AM",
    items: [
      { name: "Premium Interior Paint - Gallon", price: 67.99 },
      { name: "Primer - Quart", price: 18.99 },
      { name: "Brushes - Professional Set", price: 29.99 },
    ],
    subtotal: 116.97,
    tax: 9.36,
    total: 126.33,
    paymentMethod: "JobVault Card ****2847",
    category: "Maintenance & Repairs"
  },
  {
    id: "REC-005",
    store: "Menards",
    address: "8400 W Brown Deer Rd, Milwaukee, WI 53223",
    date: "2024-01-11",
    time: "1:18 PM",
    items: [
      { name: "Ceiling Fan with Light", price: 89.99 },
      { name: "Electrical Wire 12AWG", price: 23.47 },
      { name: "Wire Nuts (Pack of 25)", price: 4.99 },
    ],
    subtotal: 118.45,
    tax: 9.48,
    total: 127.93,
    paymentMethod: "JobVault Card ****2847",
    category: "Electrical"
  },
  {
    id: "REC-006",
    store: "Sherwin-Williams",
    address: "2156 S Kinnickinnic Ave, Milwaukee, WI 53207",
    date: "2024-01-10",
    time: "3:45 PM",
    items: [
      { name: "Exterior Stain - Semi-Transparent", price: 52.99 },
      { name: "Deck Brushes (2-pack)", price: 16.99 },
      { name: "Stain Applicator Pads", price: 8.99 },
    ],
    subtotal: 78.97,
    tax: 6.32,
    total: 85.29,
    paymentMethod: "JobVault Card ****2847",
    category: "Exterior Maintenance"
  },
  {
    id: "REC-007",
    store: "Milwaukee Tool",
    address: "4932 W National Ave, Milwaukee, WI 53214",
    date: "2024-01-09",
    time: "9:30 AM",
    items: [
      { name: "Cordless Drill Kit", price: 149.99 },
      { name: "Drill Bit Set (29-piece)", price: 24.99 },
      { name: "Tool Bag", price: 19.99 },
    ],
    subtotal: 194.97,
    tax: 15.60,
    total: 210.57,
    paymentMethod: "JobVault Card ****2847",
    category: "Tools & Equipment"
  },
  {
    id: "REC-008",
    store: "TruGreen Lawn Care",
    address: "Mobile Service - Milwaukee Area",
    date: "2024-01-08",
    time: "2:00 PM",
    items: [
      { name: "Lawn Treatment Service", price: 75.00 },
      { name: "Weed Control Application", price: 35.00 },
    ],
    subtotal: 110.00,
    tax: 8.80,
    total: 118.80,
    paymentMethod: "JobVault Card ****2847",
    category: "Landscaping"
  },
  {
    id: "REC-009",
    store: "Roto-Rooter",
    address: "Emergency Service Call",
    date: "2024-01-07",
    time: "6:15 PM",
    items: [
      { name: "Drain Cleaning Service", price: 185.00 },
      { name: "Service Call Fee", price: 75.00 },
    ],
    subtotal: 260.00,
    tax: 20.80,
    total: 280.80,
    paymentMethod: "JobVault Card ****2847",
    category: "Emergency Repairs"
  },
  {
    id: "REC-010",
    store: "Floor & Decor",
    address: "6815 S 27th St, Oak Creek, WI 53154",
    date: "2024-01-06",
    time: "12:45 PM",
    items: [
      { name: "Luxury Vinyl Plank (20 sq ft)", price: 89.80 },
      { name: "Underlayment", price: 24.99 },
      { name: "Transition Strips", price: 15.99 },
      { name: "Installation Supplies", price: 12.99 },
    ],
    subtotal: 143.77,
    tax: 11.50,
    total: 155.27,
    paymentMethod: "JobVault Card ****2847",
    category: "Flooring"
  }
]

interface FakeExpensePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function FakeExpensePopup({ isOpen, onClose }: FakeExpensePopupProps) {
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0)
  const currentExpense = FAKE_EXPENSES[currentExpenseIndex]

  const getNextExpense = () => {
    setCurrentExpenseIndex((prev) => (prev + 1) % FAKE_EXPENSES.length)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white text-black p-0 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Receipt className="h-5 w-5" />
              Expense Captured!
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4">
          {/* Store Info */}
          <div className="text-center">
            <h3 className="font-bold text-lg">{currentExpense.store}</h3>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <MapPin className="h-3 w-3" />
              {currentExpense.address}
            </p>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(currentExpense.date)}
            </div>
            <span>{currentExpense.time}</span>
          </div>

          {/* Items */}
          <div className="border-t border-b border-gray-200 py-4">
            <div className="space-y-2">
              {currentExpense.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${currentExpense.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${currentExpense.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${currentExpense.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Paid with:</span>
              <span>{currentExpense.paymentMethod}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Category: {currentExpense.category}
            </div>
          </div>

          {/* Auto-categorization notice */}
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ <strong>Auto-categorized</strong> and ready for property owner reporting
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={getNextExpense}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              See Another Example
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white hover:bg-gray-900 font-medium border-0"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 