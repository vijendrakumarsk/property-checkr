import { Home as HomeIcon, Star, BarChart2, MapPin, FileText, CheckCircle, ListChecks, Bell } from "lucide-react";

const showcases = [
  {
    icon: <FileText size={14} />,
    label: "Inspection Checklist",
    title: "A structured checklist for every open home",
    description: "Capture pricing, room counts, features and amenities in a guided flow with live progress tracking.",
    image: "inspection-checklist.png",
    alt: "Property Checkr inspection checklist screen",
  },
  {
    icon: <BarChart2 size={14} />,
    label: "Suburb Insights",
    title: "Compare suburbs across every property you've visited",
    description: "Match scores by suburb, top-performing areas, and Rent / Buy filters all in one Insights view.",
    image: "suburb-comparison.png",
    alt: "Property Checkr suburb comparison insights screen",
  },
  {
    icon: <ListChecks size={14} />,
    label: "List & Map View",
    title: "Browse every inspection, by list or on a map",
    description: "Sort by recent, score, or suburb — or pin every inspected property on Standard or Hybrid maps.",
    image: "map-view.png",
    alt: "Property Checkr map view of inspected properties",
  },
  {
    icon: <Bell size={14} />,
    label: "Daily Alerts",
    title: "Set preferences once. Get matching listings every day.",
    description: "Tell us your ideal home and we'll push notify you the moment new properties match your criteria.",
    image: "preferences.png",
    alt: "Property Checkr My Preferences screen",
  },
];

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 pt-12 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-accent/60 via-accent/20 to-background">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><path d='M40 14c-8 0-14 6-14 14 0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14zm0 19a5 5 0 110-10 5 5 0 010 10z' fill='%23194a5c'/></svg>")`,
            backgroundSize: "120px 120px",
          }}
        />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-white/80 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full mb-5 shadow-sm">
              <HomeIcon size={14} />
              For renters &amp; buyers inspecting open homes
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-4">
              Inspect smarter.<br />
              <span className="text-primary">Decide with confidence.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed">
              Capture every detail at open homes — features, amenities, photos, and notes — then compare suburbs and shortlist your favourites in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  height={44}
                  className="h-11"
                />
              </a>
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  height={44}
                  className="h-[52px]"
                />
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-primary" />
                Private &amp; secure
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/25 via-accent to-transparent rounded-[2.5rem] blur-3xl opacity-70" />
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl border border-border px-3 py-2 flex items-center gap-2.5 z-10">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Star size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none mb-1">Avg match</p>
                  <p className="text-xs font-semibold text-foreground leading-none">87%</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-2 bg-white rounded-2xl shadow-xl border border-border px-3 py-2 flex items-center gap-2.5 z-10">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none mb-1">Suburbs</p>
                  <p className="text-xs font-semibold text-foreground leading-none">3 tracked</p>
                </div>
              </div>
              <img
                src={`${import.meta.env.BASE_URL}dashboard.png`}
                alt="Property Checkr dashboard preview"
                className="relative w-56 sm:w-64 rounded-[2rem] shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 bg-white border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              Everything you need at an open home
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              From the first inspection to the final shortlist — Property Checkr gives you the structure to decide with confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {showcases.map((s, i) => (
              <div
                key={i}
                className="group flex gap-5 bg-gradient-to-br from-white to-accent/30 rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary/15 to-accent rounded-2xl blur-xl opacity-70" />
                  <img
                    src={`${import.meta.env.BASE_URL}${s.image}`}
                    alt={s.alt}
                    className="relative w-24 sm:w-28 rounded-xl shadow-md border border-border"
                  />
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary bg-accent px-2 py-0.5 rounded-full mb-2">
                    {s.icon}
                    {s.label}
                  </div>
                  <h3 className="font-semibold text-foreground text-base leading-snug mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
