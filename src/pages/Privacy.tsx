import { Link } from "wouter";

const LAST_UPDATED = "April 20, 2026";
const CONTACT_EMAIL = "propertycheckr.support@gmail.com";

const Section = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-3">{number}. {title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export const PrivacyPage = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 sm:p-8">

          <Section number="1" title="Introduction">
            <p>
              Property Checkr ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
            </p>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="2" title="Information We Collect">
            <ul className="space-y-2">
              <li><strong className="text-foreground">Account Information:</strong> Email address and password when you create an account.</li>
              <li><strong className="text-foreground">Inspection Data:</strong> Property details, notes, photos, ratings, and checklist responses you create.</li>
              <li><strong className="text-foreground">Preferences:</strong> Your property search preferences and saved filters.</li>
              <li><strong className="text-foreground">Usage Data:</strong> How you interact with the App, including features used and time spent.</li>
              <li><strong className="text-foreground">Device Information:</strong> Device type, operating system, and unique identifiers.</li>
              <li><strong className="text-foreground">Location Data:</strong> Approximate location when you use map features (with your permission).</li>
            </ul>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="3" title="How We Use Your Information">
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Provide, maintain, and improve the App's features and services.</li>
              <li>Store and sync your inspection data across devices.</li>
              <li>Send you notifications about matched listings and inspection reminders.</li>
              <li>Analyze usage patterns to improve user experience.</li>
              <li>Communicate important updates about the App or your account.</li>
              <li>Ensure security and prevent fraud.</li>
            </ul>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="4" title="Data Storage & Security">
            <p>
              Your data is stored securely using industry-standard encryption and security practices. We use Supabase for authentication and data storage, which employs encryption at rest and in transit. While no system is 100% secure, we take reasonable measures to protect your information.
            </p>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="5" title="Data Sharing">
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-foreground">Service Providers:</strong> Third-party services that help us operate the App (e.g., cloud hosting, analytics).</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
              <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="6" title="Third-Party Services">
            <p>
              The App uses third-party services including Google Maps for location features and property data providers for listings. These services have their own privacy policies, and we encourage you to review them.
            </p>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="7" title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Access and review your personal data.</li>
              <li>Update or correct inaccurate information.</li>
              <li>Delete your account and associated data.</li>
              <li>Opt out of non-essential notifications.</li>
              <li>Request a copy of your data in a portable format.</li>
            </ul>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="8" title="Data Retention">
            <p>
              We retain your data for as long as your account is active or as needed to provide services. If you delete your account, we will remove your personal data within 30 days, except where retention is required by law.
            </p>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="9" title="Children's Privacy">
            <p>
              The App is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we learn we have collected information from a child under 13, we will delete it promptly.
            </p>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="10" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. We will notify you of material changes through the App or via email. Your continued use of the App after changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <div className="border-t border-border mb-8"></div>

          <Section number="11" title="Contact Us">
            <p>
              If you have questions or concerns about this Privacy Policy or your data, please contact us through the App's support channels.
            </p>
            <div className="mt-3 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="font-medium text-foreground mb-1">Property Checkr Support</p>
              <p>
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
              </p>
            </div>
          </Section>

        </div>

        <div className="mt-8 p-5 rounded-xl border border-border bg-white text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Have questions about your data? We're happy to help.
          </p>
          <Link href="/support" className="text-sm text-primary font-medium hover:underline">
            Visit Support &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
