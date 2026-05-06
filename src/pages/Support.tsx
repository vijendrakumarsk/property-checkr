import { Link } from "wouter";
import { Mail, HelpCircle, Shield, MessageSquare } from "lucide-react";

export const SupportPage = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Support</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help you get the most out of Property Checkr.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">About Property Checkr</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Property Checkr is a mobile app designed for renters and buyers who want to make better decisions at open homes. Instead of relying on vague memories or scattered notes, you can use Property Checkr to systematically record everything that matters during an inspection — from room conditions and photos, to nearby amenities and your overall impressions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Once you've inspected multiple properties, Property Checkr helps you compare them using match scoring based on your priorities, so choosing becomes less stressful and more informed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The app is designed to be fast to use on-the-go, private by default, and simple enough that you can focus on the property — not the app.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-5">How to Get Help</h2>
          <div className="grid gap-5">

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <HelpCircle size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Browse the FAQ</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Our frequently asked questions cover most common questions about how the app works, including adding properties, using match scoring, managing photos, and more.
                </p>
                <Link href="/faq" className="text-sm text-primary font-medium hover:underline">
                  Visit the FAQ &rarr;
                </Link>
              </div>
            </div>

            <div className="border-t border-border"></div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Email Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  If you can't find an answer in the FAQ, or if you're experiencing a technical issue, please email us directly. We typically respond within 1–2 business days.
                </p>
                <a
                  href="mailto:propertycheckr.support@gmail.com"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  propertycheckr.support@gmail.com
                </a>
              </div>
            </div>

            <div className="border-t border-border"></div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Privacy &amp; Data Questions</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  If you have questions about how your data is handled, stored, or deleted, please review our Privacy Policy.
                </p>
                <Link href="/privacy" className="text-sm text-primary font-medium hover:underline">
                  Read the Privacy Policy &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Common Issues</h2>
          <div className="space-y-4">
            {[
              {
                q: "The app isn't loading or is crashing on launch",
                a: "Try closing the app completely and reopening it. If the issue persists, check that your iOS version is up to date and that the app has the latest update installed from the App Store.",
              },
              {
                q: "My photos aren't saving",
                a: "Property Checkr requires access to your Photos library to save images. Go to Settings > Privacy & Security > Photos > Property Checkr and ensure access is set to \"Add Photos Only\" or \"Full Access\".",
              },
              {
                q: "I accidentally deleted a property",
                a: "Unfortunately, deleted properties cannot be recovered. We recommend exporting or reviewing your shortlist before removing entries. We're working on an undo feature for a future update.",
              },
              {
                q: "The match score doesn't seem right",
                a: "Match scores are calculated based on the priorities and weightings you've set. Visit the Settings or Preferences section in the app to review and adjust your criteria weightings.",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="font-medium text-foreground text-sm mb-1.5">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <MessageSquare size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Still need help?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We read every message and do our best to respond promptly. When contacting us, it helps to include your iOS version, app version (found in Settings within the app), and a description of what happened.
              </p>
              <a
                href="mailto:propertycheckr.support@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Mail size={16} />
                Email Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
