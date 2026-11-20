"use client";

import { Button } from "@/components/ui/button";

/**
 * Contact form — client component so the submit handler can stay on the page
 * while the page itself remains a server component with metadata.
 */
export function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>
      <input
        type="text"
        placeholder="Subject"
        className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
      />
      <div>
        <textarea
          placeholder="Message"
          rows={5}
          className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>
      <Button className="!text-base !px-6 !py-3 !rounded-full">
        Send Message
      </Button>
    </form>
  );
}

export default ContactForm;
