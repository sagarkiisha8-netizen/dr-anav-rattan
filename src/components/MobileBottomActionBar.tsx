"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomActionBar() {
  const pathname = usePathname();

  // If on admin routes, do not render
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/book-appointment") {
      e.preventDefault();
      const form = document.querySelector("form") || document.getElementById("booking-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 350, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Fixed Mobile Bottom Action Bar */}
      <nav
        className="mobile-bottom-action-bar"
        aria-label="Mobile Quick Action Navigation"
      >
        <div className="mobile-bottom-action-grid">
          {/* 1. CALL */}
          <a
            href="tel:01722610806"
            className="mobile-bottom-action-item"
            aria-label="Call Dr. Rattan ENT Clinic at 0172-2610806"
          >
            <div className="mobile-action-icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="mobile-action-label">CALL</span>
          </a>

          {/* 2. DIRECTIONS */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Dr.+Rattan+ENT+Clinic,+Sector+33C,+Chandigarh"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bottom-action-item"
            aria-label="Get directions to Dr. Rattan ENT Clinic in Sector 33C, Chandigarh"
          >
            <div className="mobile-action-icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <span className="mobile-action-label">DIRECTIONS</span>
          </a>

          {/* 3. WHATSAPP */}
          <a
            href="https://wa.me/919988004806?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20Dr.%20Rattan%20ENT%20Clinic."
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bottom-action-item"
            aria-label="Chat on WhatsApp with Dr. Rattan ENT Clinic"
          >
            <div className="mobile-action-icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="mobile-action-label">WHATSAPP</span>
          </a>

          {/* 4. BOOK */}
          <Link
            href="/book-appointment"
            onClick={handleBookClick}
            className="mobile-bottom-action-item"
            aria-label="Book an Appointment at Dr. Rattan ENT Clinic"
          >
            <div className="mobile-action-icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="14" x2="8.01" y2="14" strokeWidth="2.5" />
                <line x1="12" y1="14" x2="12.01" y2="14" strokeWidth="2.5" />
                <line x1="16" y1="14" x2="16.01" y2="14" strokeWidth="2.5" />
                <line x1="8" y1="18" x2="8.01" y2="18" strokeWidth="2.5" />
                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                <line x1="16" y1="18" x2="16.01" y2="18" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="mobile-action-label">BOOK</span>
          </Link>
        </div>
      </nav>

      {/* Spacer to prevent fixed action bar from obscuring mobile footer/content */}
      <div className="mobile-bottom-action-spacer" aria-hidden="true" />
    </>
  );
}
