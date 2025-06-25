export const TERMS_CONTENT = {
  title: "Terms & Conditions",
  lastUpdated: "Last Updated: May 2025",
  sections: [
    {
      title: "Introduction",
      content: "Welcome to Talk to Pro! These terms govern your use of our mentorship platform connecting students with experienced professionals."
    },
    {
      title: "Booking Sessions",
      content: "Users can book 1-hour sessions with verified professionals. All professionals are manually vetted by our admin team before approval."
    },
    {
      title: "Session Conduct",
      content: "All sessions are conducted via Google Meet. The link will be provided to both parties after booking confirmation."
    },
    {
      title: "Cancellation Policy",
      content: "Users may cancel sessions under the following conditions:\n- Cancel 3+ hours before session → 100% refund\n- Cancel within 3 hours of session → 90% refund (10% compensation to mentor)\nMentors cannot cancel sessions once booked."
    },
    {
      title: "No-Show Policy",
      content: "If the mentor doesn't join → 100% refund to user\nIf the user doesn't join → 90% refund (10% compensation to mentor)"
    },
    {
      title: "Completed Sessions",
      content: "For completed sessions: 90% goes to the mentor, 10% is retained as platform fee."
    },
    {
      title: "Payments",
      content: "We exclusively use Razorpay for payment processing. Failed payments can be retried or reported via our contact page."
    },
    {
      title: "Pricing Policy",
      content: "Refer to our dedicated Pricing Policy page for details on mentor pricing and platform fees."
    }
  ]
};

export const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  lastUpdated: "Last Updated: May 2025",
  sections: [
    {
      title: "Information We Collect",
      content: "We collect:\n- Name, email, phone number\n- Profile picture (stored in AWS S3)\n- Encrypted passwords (not visible to anyone including admins)\n- Session booking details"
    },
    {
      title: "How We Use Your Data",
      content: "Your data is used for:\n- Account creation and authentication\n- Session coordination\n- Payment processing\n- Customer support"
    },
    {
      title: "Data Storage & Security",
      content: "All data is stored in MongoDB Atlas databases. Profile images are stored in AWS S3 buckets. Passwords are encrypted using industry-standard protocols."
    },
    {
      title: "Third-Party Services",
      content: "We use:\n- Razorpay for payments (PCI-DSS compliant)\n- Google Meet for sessions\n- AWS S3 for media storage"
    },
    {
      title: "Data Retention",
      content: "We retain your data as long as your account is active. You may request account deletion at any time."
    }
  ]
};

export const REFUND_CONTENT = {
  title: "Refund Policy",
  lastUpdated: "Last Updated: May 2025",
  sections: [
    {
      title: "General Refund Rules",
      content: "All refunds are processed based on the following conditions:"
    },
    {
      title: "Cancellation by User",
      content: "Example 1:\n- Session time: 3:00 PM - 4:00 PM\n- Cancel at 10:00 AM (3+ hours before)\n→ 100% refund\n\nExample 2:\n- Session time: 3:00 PM - 4:00 PM\n- Cancel at 2:00 PM (within 3 hours)\n→ 90% refund (10% mentor compensation)"
    },
    {
      title: " No-Show Scenarios",
      content: "If mentor doesn't join:\n→ 100% refund to user\n\nIf user doesn't join:\n→ 90% refund (10% mentor compensation)"
    },
    {
      title: "Completed Sessions",
      content: "For completed sessions:\n→ 90% to mentor\n→ 10% platform fee"
    },
    {
      title: "Refund Processing",
      content: "Refunds are processed within 24 hours and will be credited to the original payment method on the next business day."
    },
    {
      title: "Disputes",
      content: "For any refund disputes, please contact us through the contact page with your booking details."
    }
  ]
};

export const PRICING_CONTENT = {
  title: "Pricing Policy",
  lastUpdated: "Last Updated: May 2025",
  sections: [
    {
      title: "Mentor-Determined Pricing",
      content: "Talk to Pro allows mentors to set their own session fees within our platform guidelines:"
    },
    {
      title: "Pricing Guidelines",
      content: "",
      listItems: [
        "Mentors must set prices between ₹200 to ₹10,000 per session",
        "Consider your experience and expertise when setting prices",
        "Competitive pricing attracts more mentees",
        "You can adjust pricing at any time (changes apply only to future sessions)"
      ]
    },
    {
      title: "Platform Fees",
      content: "For each completed session:\n- 90% goes to the mentor\n- 10% retained as platform fee"
    },
    {
      title: "Payment Processing",
      content: "All payments are processed via Razorpay. Mentors receive payments after session completion."
    }
  ]
};


export const FOOTER_CONTENT = {
  contact: "Contact us at: admin@talktopro.in",
  note: "By using Talk to Pro, you agree to these policies."
};