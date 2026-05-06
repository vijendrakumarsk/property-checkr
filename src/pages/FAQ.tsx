import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

const faqs = [
  {
    question: "What is Property Checkr and who is it for?",
    answer: "Property Checkr is a mobile app designed for anyone searching for a new home — whether you're renting or buying. It helps you record detailed inspection notes, photos, ratings, and amenity information for each property you visit, so you can compare them objectively when it's time to decide.",
  },
  {
    question: "How do I add a property to the app?",
    answer: "Tap the '+' button on the main screen to create a new property entry. You can enter the address manually or search for it using the built-in address lookup. Once added, you'll be able to fill in property details, add photos, rate it, and record inspection notes — all from the property detail screen.",
  },
  {
    question: "Can I add photos during an inspection?",
    answer: "Yes. Each property has a dedicated Photos section where you can capture new photos directly from your camera or import existing images from your photo library. Property Checkr will ask for permission to access your camera and photos the first time you try to add an image.",
  },
  {
    question: "What is the match score and how is it calculated?",
    answer: "The match score is a percentage that reflects how well a property aligns with your personal priorities. You can define what matters most to you — such as number of bedrooms, proximity to public transport, parking, outdoor space, and so on — and assign weightings to each. The app then scores each property against those criteria, making it easy to compare properties side by side.",
  },
  {
    question: "How do I shortlist properties I'm interested in?",
    answer: "On any property's detail screen, tap the heart or star icon to add it to your shortlist. You can view all shortlisted properties from the Shortlist tab at the bottom of the app. Shortlisting is a great way to narrow down your favourites before doing a formal comparison.",
  },
  {
    question: "Can I compare multiple properties at once?",
    answer: "Yes. The Compare feature lets you select two or more properties and view their details, ratings, and match scores side by side. This is particularly useful when you're deciding between a small number of finalists and want a clear, objective overview.",
  },
  {
    question: "How do I record nearby amenities for a property?",
    answer: "Inside each property, navigate to the Amenities section. You can log nearby schools, public transport, supermarkets, parks, cafes, gyms, hospitals, and other points of interest. You can also note estimated walking or driving times for each amenity to keep things practical.",
  },
  {
    question: "Does the app work offline?",
    answer: "Yes. All your property data — notes, photos, ratings, and amenity records — is stored locally on your device. You can add and edit properties without an internet connection. The address search feature does require an internet connection to look up location data, but you can always enter an address manually if you're offline.",
  },
  {
    question: "Is my data backed up?",
    answer: "Property Checkr stores data locally on your device. If you have iCloud backup enabled for your iPhone, the app's data may be included in your device backup. We recommend regularly backing up your iPhone via iCloud or your Mac to protect your inspection records.",
  },
  {
    question: "How do I rate a property?",
    answer: "Each property has a Rating section where you can score it across various criteria such as overall impression, condition, size, natural light, neighbourhood feel, and more. Ratings are reflected in the match score calculation and appear in the comparison view so you can quickly identify standout properties.",
  },
  {
    question: "Can I share my property notes with someone else?",
    answer: "You can share individual property details by using the Share button on the property detail screen. This exports a summary of the property including notes, ratings, and key details in a readable format that you can send via message, email, or any other app on your phone.",
  },
  {
    question: "What happens if I delete the app? Will I lose my data?",
    answer: "Yes — if you delete the app, locally stored data will be removed from your device. If your device is backed up to iCloud, restoring your device from a backup may recover your data. We strongly recommend reviewing and noting key information before uninstalling the app.",
  },
  {
    question: "How do I delete a property I no longer need?",
    answer: "Open the property you want to remove, then tap the three-dot menu (or swipe left on the property in the list view) and select Delete. You'll be asked to confirm before the property is permanently removed. Please note that deleted properties cannot currently be recovered.",
  },
  {
    question: "Does Property Checkr collect or share my personal information?",
    answer: "Property Checkr does not sell or share your personal information with third parties for advertising or marketing purposes. The app uses standard analytics tools to understand how features are used, and address search is powered by a mapping service. For full details, please read our Privacy Policy.",
  },
  {
    question: "How do I contact support if I have a problem?",
    answer: "If you experience an issue or have a question not covered here, please email us at support@propertycheckr.app. Include your iOS version, app version (visible in the app's Settings screen), and a description of the problem. We typically respond within 1–2 business days.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-sm sm:text-base leading-snug">{question}</span>
        <ChevronDown
          size={18}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 bg-white">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export const FAQPage = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Answers to the most common questions about how Property Checkr works.
          </p>
        </div>

        <div className="space-y-3 mb-12">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="bg-white rounded-xl border border-border p-6 sm:p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">Didn't find what you were looking for?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is happy to help with anything not covered here.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Visit Support
          </Link>
        </div>
      </div>
    </div>
  );
}
