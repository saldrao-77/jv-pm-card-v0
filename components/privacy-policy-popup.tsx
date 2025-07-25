"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PrivacyPolicyPopupProps {
  isOpen: boolean
  onAgree: () => void
  onCancel: () => void
}

export function PrivacyPolicyPopup({ isOpen, onAgree, onCancel }: PrivacyPolicyPopupProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <Dialog open={isOpen} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Privacy Policy Agreement</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-base mb-2">Privacy Policy</h3>
              <p className="text-gray-600">Effective Date: {currentDate}</p>
            </div>

            <p>
              This Privacy Policy explains how we collect, use, and protect your information when you use our Expense Management Demo platform. This policy is designed to comply with applicable laws and carrier guidelines, including requirements for Application-to-Person (A2P) messaging as set forth by U.S. mobile carriers and Twilio's policies.
            </p>

            <div>
              <h4 className="font-semibold mb-2">1. Information We Collect</h4>
              <p className="mb-2">We may collect the following types of information when you use our demo:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Personal Identifiers:</strong> such as your name and phone number, if provided.</li>
                <li><strong>Expense Data:</strong> any text or information submitted for the purpose of demonstrating expense tracking or messaging.</li>
                <li><strong>Device and Log Information:</strong> such as IP address, browser type, or usage data.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. How We Use Your Information</h4>
              <p className="mb-2">We use your information for the sole purpose of demonstrating the features of our expense management application. Specifically:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>To send and receive messages related to expense tracking.</li>
                <li>To simulate and display expense summaries and notifications.</li>
                <li>To troubleshoot, monitor, and improve demo functionality.</li>
              </ul>
              <p className="mt-2">We do not sell or share your information with third parties for marketing purposes.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Message Consent and Opt-Out</h4>
              <p className="mb-2">
                By submitting your phone number, you consent to receive automated demo messages (e.g., expense notifications) via SMS. These messages are for demonstration purposes only and do not represent a production or commercial system.
              </p>
              <p className="mb-2">
                To opt out, simply reply with "STOP" at any time. You may also reply "HELP" for more information.
              </p>
              <p>Message and data rates may apply depending on your mobile carrier plan.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">4. Data Retention</h4>
              <p>
                Any personal data or message content submitted through this demo is retained only as long as necessary to operate the demonstration. Data is periodically deleted and is not used beyond the scope of this demo.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">5. Security</h4>
              <p>
                We use reasonable technical and administrative measures to protect your information. However, as this is a demonstration platform, we recommend that you do not submit sensitive personal data.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={onAgree}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            I Agree - Send Demo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 