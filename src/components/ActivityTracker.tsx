"use client";

import { useEffect, useRef } from "react";

export function trackEvent(type: "page_visit" | "new_visitor" | "button_click", data?: any) {
  fetch("/api/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data }),
  }).catch((err) => console.error("Failed to track event:", err));
}

export default function ActivityTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    // Track page visit
    trackEvent("page_visit");

    // Check if new visitor
    const hasVisited = localStorage.getItem("wedding_has_visited");
    if (!hasVisited) {
      trackEvent("new_visitor");
      localStorage.setItem("wedding_has_visited", "true");
    }
  }, []);

  return null;
}
