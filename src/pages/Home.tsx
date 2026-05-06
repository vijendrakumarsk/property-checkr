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
    description: "Sort by recent, score, or suburb or pin every inspected property on Standard or Hybrid maps.",
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

export const HomePage = () => {
  return (
    <div>
      <section className="relative overflow-hidden px-4 pt-12 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-accent/60 via-accent/20 to-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-[#2196a6]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-[0.07]">
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-28 sm:h-36">
            <path d="M0,160 L0,110 L40,110 L40,70 L55,70 L55,50 L65,50 L65,70 L80,70 L80,110
              L120,110 L120,80 L135,65 L150,80 L150,110
              L190,110 L190,60 L200,60 L200,40 L210,40 L210,60 L220,60 L220,110
              L260,110 L260,85 L275,85 L275,110
              L310,110 L310,50 L320,40 L330,50 L330,110
              L370,110 L370,75 L380,75 L380,55 L390,55 L390,75 L400,75 L400,110
              L440,110 L440,90 L460,90 L460,110
              L500,110 L500,45 L512,30 L524,45 L524,110
              L560,110 L560,70 L575,70 L575,110
              L610,110 L610,60 L620,50 L625,40 L630,50 L640,60 L640,110
              L680,110 L680,80 L695,80 L695,110
              L730,110 L730,55 L740,55 L740,35 L750,35 L750,55 L760,55 L760,110
              L800,110 L800,85 L820,85 L820,110
              L860,110 L860,65 L870,50 L880,65 L880,110
              L920,110 L920,75 L935,75 L935,110
              L970,110 L970,45 L980,45 L980,25 L990,25 L990,45 L1000,45 L1000,110
              L1040,110 L1040,80 L1060,80 L1060,110
              L1100,110 L1100,60 L1112,45 L1124,60 L1124,110
              L1160,110 L1160,80 L1175,80 L1175,110
              L1210,110 L1210,50 L1220,50 L1220,30 L1230,30 L1230,50 L1240,50 L1240,110
              L1280,110 L1280,90 L1300,90 L1300,110
              L1340,110 L1340,65 L1350,50 L1360,65 L1360,110
              L1440,110 L1440,160 Z"
              fill="#194a5c"
            />
          </svg>
        </div>
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
              Capture every detail at open homes — features, amenities, photos, and notes, then compare suburbs and shortlist your favourites in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5">
              <a
                href="https://apps.apple.com/us/app/property-checkr/id6762545485"
                aria-label="Download on the App Store"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  height={44}
                  className="h-11"
                />
              </a>
              <div style={{ position: "relative", opacity: 0.6, cursor: "not-allowed" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Coming Soon"
                  style={{ height: "60px" }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "black",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "12px",
                    borderRadius: "6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Coming Soon
                </span>
              </div>
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
              From the first inspection to the final shortlist, <strong>Property Checkr</strong> gives you the structure to decide with confidence.
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
