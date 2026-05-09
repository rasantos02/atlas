import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  COUNTRIES,
  COUNTRIES_PER_CONTINENT,
  COUNTRY_BY_CODE,
} from "@/data/countries";
import {
  TravelStatus,
  useAddTrip,
  useGetStats,
  useListCountries,
  useListTrips,
  useSetCountry,
} from "@/hooks/use-travel";
import { cn } from "@/lib/utils";
import type { Continent, CountryMeta } from "@/types/travel";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock,
  Globe,
  Heart,
  Home,
  MapPin,
  Plane,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const DISPLAY_CONTINENTS: Continent[] = [
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Africa",
  "Oceania",
];

const STATUS_CONFIG = {
  [TravelStatus.visited]: {
    label: "Visited",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    bar: "bg-amber-400",
    icon: MapPin,
  },
  [TravelStatus.lived_in]: {
    label: "Lived In",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    bar: "bg-teal-400",
    icon: Home,
  },
  [TravelStatus.wishlisted]: {
    label: "Wishlisted",
    color: "text-yellow-300",
    bg: "bg-yellow-300/10",
    border: "border-yellow-300/30",
    bar: "bg-yellow-300",
    icon: Heart,
  },
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function bigintToDate(ts: bigint): Date {
  return new Date(Number(ts / 1_000_000n));
}

function dateToBigint(d: Date): bigint {
  return BigInt(d.getTime()) * 1_000_000n;
}

function formatDate(ts: bigint): string {
  try {
    return format(bigintToDate(ts), "MMM d, yyyy");
  } catch {
    return "";
  }
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  loading,
}: {
  label: string;
  value: string | number;
  icon: React.FC<{ className?: string }>;
  colorClass: string;
  loading?: boolean;
}) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <p className="text-2xl font-display font-bold text-foreground">
                {value}
              </p>
            )}
          </div>
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
              colorClass,
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Continent Progress Card ──────────────────────────────────────────────────

function ContinentCard({
  continent,
  visited,
  total,
}: {
  continent: Continent;
  visited: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((visited / total) * 100) : 0;
  return (
    <div className="bg-muted/30 rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground font-display">
          {continent}
        </span>
        <span className="text-xs font-bold text-amber-400">{pct}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {visited} / {total} countries
      </p>
    </div>
  );
}

// ─── Recent Trip Row ──────────────────────────────────────────────────────────

function TripRow({
  countryCode,
  startDate,
  endDate,
  notes,
  index,
}: {
  countryCode: string;
  startDate: bigint;
  endDate: bigint;
  notes?: string;
  index: number;
}) {
  const country = COUNTRY_BY_CODE.get(countryCode);
  const name = country?.name ?? countryCode;
  const flag = country?.flag ?? "🌍";
  return (
    <div
      data-ocid={`recent_trips.item.${index}`}
      className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
    >
      <span className="text-2xl leading-none shrink-0">{flag}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDate(startDate)} → {formatDate(endDate)}
        </p>
        {notes && (
          <p className="text-xs text-muted-foreground/70 truncate mt-0.5">
            {notes}
          </p>
        )}
      </div>
      <Badge
        variant="outline"
        className="shrink-0 text-[10px] border-amber-400/30 text-amber-400 bg-amber-400/5"
      >
        <Plane className="w-3 h-3 mr-1" />
        Trip
      </Badge>
    </div>
  );
}

// ─── Add Country Dialog ───────────────────────────────────────────────────────

function AddCountryDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryMeta | null>(
    null,
  );
  const [status, setStatus] = useState<TravelStatus>(TravelStatus.visited);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"country" | "details">("country");

  const setCountry = useSetCountry();
  const addTrip = useAddTrip();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return COUNTRIES.slice(0, 60);
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.iso2.toLowerCase().includes(q),
    ).slice(0, 40);
  }, [search]);

  function handleSelectCountry(c: CountryMeta) {
    setSelectedCountry(c);
    setStep("details");
  }

  function handleBack() {
    setStep("country");
    setSelectedCountry(null);
  }

  function handleReset() {
    setSearch("");
    setSelectedCountry(null);
    setStatus(TravelStatus.visited);
    setStartDate("");
    setEndDate("");
    setNotes("");
    setStep("country");
  }

  async function handleSubmit() {
    if (!selectedCountry) return;
    try {
      await setCountry.mutateAsync({ code: selectedCountry.iso2, status });
      if (startDate && endDate) {
        await addTrip.mutateAsync({
          countryCode: selectedCountry.iso2,
          startDate: dateToBigint(new Date(startDate)),
          endDate: dateToBigint(new Date(endDate)),
          notes: notes.trim() || null,
        });
      }
      toast.success(`${selectedCountry.flag} ${selectedCountry.name} added!`);
      setOpen(false);
      handleReset();
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  }

  const isPending = setCountry.isPending || addTrip.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) handleReset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          data-ocid="add_country.open_modal_button"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Country
        </Button>
      </DialogTrigger>

      <DialogContent
        data-ocid="add_country.dialog"
        className="sm:max-w-md bg-card border-border"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {step === "country"
              ? "Choose a Country"
              : `Add ${selectedCountry?.flag} ${selectedCountry?.name}`}
          </DialogTitle>
        </DialogHeader>

        {step === "country" && (
          <div className="space-y-3 mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="add_country.search_input"
                className="pl-9"
                placeholder="Search countries…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="max-h-72 overflow-y-auto space-y-0.5 pr-1">
              {filtered.map((c) => (
                <button
                  key={c.iso2}
                  type="button"
                  data-ocid={`add_country.country_option.${c.iso2.toLowerCase()}`}
                  onClick={() => handleSelectCountry(c)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="text-xl leading-none">{c.flag}</span>
                  <span className="text-sm font-medium text-foreground">
                    {c.name}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {c.continent}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "details" && selectedCountry && (
          <div className="space-y-4 mt-2">
            {/* Status selector */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    TravelStatus.visited,
                    TravelStatus.lived_in,
                    TravelStatus.wishlisted,
                  ] as TravelStatus[]
                ).map((s) => {
                  const cfg = STATUS_CONFIG[s];
                  return (
                    <button
                      key={s}
                      type="button"
                      data-ocid={`add_country.status.${s}`}
                      onClick={() => setStatus(s)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg border text-xs font-medium transition-all",
                        status === s
                          ? cn(cfg.bg, cfg.border, cfg.color)
                          : "border-border text-muted-foreground hover:border-border hover:bg-muted/30",
                      )}
                    >
                      <cfg.icon className="w-4 h-4" />
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Start Date (optional)
                </Label>
                <Input
                  data-ocid="add_country.start_date_input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  End Date (optional)
                </Label>
                <Input
                  data-ocid="add_country.end_date_input"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Notes (optional)
              </Label>
              <Textarea
                data-ocid="add_country.notes_textarea"
                placeholder="What was memorable about this trip?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                data-ocid="add_country.back_button"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="button"
                data-ocid="add_country.confirm_button"
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: countries = [], isLoading: countriesLoading } =
    useListCountries();
  const { data: trips = [], isLoading: tripsLoading } = useListTrips();

  const isLoading = statsLoading || countriesLoading;

  // Build per-continent visited counts from countries data
  const continentVisitedCounts = useMemo(() => {
    const map: Partial<Record<Continent, number>> = {};
    for (const entry of countries) {
      if (
        entry.status !== TravelStatus.visited &&
        entry.status !== TravelStatus.lived_in
      )
        continue;
      const meta = COUNTRY_BY_CODE.get(entry.code);
      if (!meta) continue;
      map[meta.continent] = (map[meta.continent] ?? 0) + 1;
    }
    return map;
  }, [countries]);

  const visitedCount = countries.filter(
    (c) => c.status === TravelStatus.visited,
  ).length;
  const livedCount = countries.filter(
    (c) => c.status === TravelStatus.lived_in,
  ).length;
  const wishlistedCount = countries.filter(
    (c) => c.status === TravelStatus.wishlisted,
  ).length;

  // Recent trips sorted by most recent start date
  const recentTrips = useMemo(() => {
    return [...trips]
      .sort((a, b) => Number(b.startDate - a.startDate))
      .slice(0, 5);
  }, [trips]);

  return (
    <div className="p-6 space-y-7 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your world at a glance
          </p>
        </div>
        <AddCountryDialog />
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <section aria-label="Travel statistics">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          <StatCard
            label="Countries Visited"
            value={
              isLoading
                ? "—"
                : stats
                  ? Number(stats.totalVisited)
                  : visitedCount
            }
            icon={MapPin}
            colorClass="bg-amber-400/15 text-amber-400"
            loading={isLoading}
          />
          <StatCard
            label="Lived In"
            value={
              isLoading ? "—" : stats ? Number(stats.totalLivedIn) : livedCount
            }
            icon={Home}
            colorClass="bg-teal-400/15 text-teal-400"
            loading={isLoading}
          />
          <StatCard
            label="Wishlisted"
            value={
              isLoading
                ? "—"
                : stats
                  ? Number(stats.totalWishlisted)
                  : wishlistedCount
            }
            icon={Heart}
            colorClass="bg-yellow-300/15 text-yellow-300"
            loading={isLoading}
          />
          <StatCard
            label="Total Trips"
            value={
              isLoading ? "—" : stats ? Number(stats.totalTrips) : trips.length
            }
            icon={Plane}
            colorClass="bg-primary/15 text-primary"
            loading={isLoading}
          />
          <StatCard
            label="Days Abroad"
            value={isLoading ? "—" : stats ? Number(stats.totalDaysAbroad) : 0}
            icon={CalendarDays}
            colorClass="bg-accent/15 text-accent-foreground"
            loading={isLoading}
          />
        </div>
      </section>

      {/* ── Two-column lower section ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Continents — 3 cols */}
        <section aria-label="Continents explored" className="lg:col-span-3">
          <Card className="border-border bg-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Continents Explored
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 6 }, (_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                    <Skeleton key={i} className="h-20 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {DISPLAY_CONTINENTS.map((continent) => (
                    <ContinentCard
                      key={continent}
                      continent={continent}
                      visited={continentVisitedCounts[continent] ?? 0}
                      total={COUNTRIES_PER_CONTINENT[continent]}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Recent Trips — 2 cols */}
        <section
          aria-label="Recent trips"
          data-ocid="recent_trips.section"
          className="lg:col-span-2"
        >
          <Card className="border-border bg-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Recent Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tripsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }, (_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                    <Skeleton key={i} className="h-14 rounded-lg" />
                  ))}
                </div>
              ) : recentTrips.length === 0 ? (
                <div
                  data-ocid="recent_trips.empty_state"
                  className="flex flex-col items-center justify-center py-10 text-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      No trips yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Add a country to log your first trip
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {recentTrips.map((trip, i) => (
                    <TripRow
                      key={String(trip.id)}
                      countryCode={trip.countryCode}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      notes={trip.notes}
                      index={i + 1}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* ── Country Status Summary ─────────────────────────────────────────── */}
      {countries.length > 0 && (
        <section aria-label="Countries by status">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                My Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(
                  [
                    TravelStatus.visited,
                    TravelStatus.lived_in,
                    TravelStatus.wishlisted,
                  ] as TravelStatus[]
                ).map((s) => {
                  const list = countries.filter((c) => c.status === s);
                  if (list.length === 0) return null;
                  const cfg = STATUS_CONFIG[s];
                  return (
                    <div key={s}>
                      <div className="flex items-center gap-2 mb-2">
                        <cfg.icon className={cn("w-3.5 h-3.5", cfg.color)} />
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider",
                            cfg.color,
                          )}
                        >
                          {cfg.label}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-1.5 py-0 ml-1",
                            cfg.border,
                            cfg.color,
                            cfg.bg,
                          )}
                        >
                          {list.length}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {list.map((entry) => {
                          const meta = COUNTRY_BY_CODE.get(entry.code);
                          return (
                            <span
                              key={entry.code}
                              title={meta?.name ?? entry.code}
                              className={cn(
                                "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border",
                                cfg.bg,
                                cfg.border,
                                cfg.color,
                              )}
                            >
                              <span>{meta?.flag ?? "🌍"}</span>
                              <span className="font-medium">
                                {meta?.name ?? entry.code}
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Empty state when no data */}
      {!isLoading && countries.length === 0 && (
        <section
          data-ocid="home.empty_state"
          className="bg-card border border-border rounded-2xl p-10 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Globe className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Start your atlas
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                Track every country you've visited, lived in, or dream of
                exploring.
              </p>
            </div>
            <AddCountryDialog />
          </div>
        </section>
      )}
    </div>
  );
}
