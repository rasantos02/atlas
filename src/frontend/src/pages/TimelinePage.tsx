import { TravelStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { COUNTRIES, COUNTRY_BY_CODE } from "@/data/countries";
import {
  useAddTrip,
  useDeleteTrip,
  useGetStats,
  useListCountries,
  useListTrips,
  useUpdateTrip,
} from "@/hooks/use-travel";
import type { TripPublic } from "@/types/travel";
import { format } from "date-fns";
import {
  ArrowDownUp,
  CalendarDays,
  Clock,
  Globe,
  type LucideIcon,
  Pencil,
  Plane,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Date utils ──────────────────────────────────────────────────────────────

function msToDateStr(ms: bigint) {
  return format(new Date(Number(ms / 1_000_000n)), "yyyy-MM-dd");
}
function dateStrToMs(str: string): bigint {
  return BigInt(new Date(str).getTime());
}
function displayDate(ms: bigint) {
  return format(new Date(Number(ms / 1_000_000n)), "MMM d, yyyy");
}
function getYear(ms: bigint) {
  return new Date(Number(ms / 1_000_000n)).getFullYear();
}
function tripDays(trip: TripPublic) {
  const startMs = Number(trip.startDate / 1_000_000n);
  const endMs = Number(trip.endDate / 1_000_000n);
  return Math.max(1, Math.ceil((endMs - startMs) / 86400000));
}

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_LABELS: Record<TravelStatus, string> = {
  [TravelStatus.visited]: "Visited",
  [TravelStatus.lived_in]: "Lived In",
  [TravelStatus.wishlisted]: "Wishlisted",
};

const STATUS_CLASSES: Record<TravelStatus, string> = {
  [TravelStatus.visited]: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  [TravelStatus.lived_in]: "border-teal-500/40 bg-teal-500/10 text-teal-400",
  [TravelStatus.wishlisted]:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
};

const DOT_CLASSES: Record<TravelStatus, string> = {
  [TravelStatus.visited]: "bg-amber-400",
  [TravelStatus.lived_in]: "bg-teal-400",
  [TravelStatus.wishlisted]: "bg-yellow-400",
};

// ─── Form state ───────────────────────────────────────────────────────────────

interface TripFormState {
  countryCode: string;
  startDate: string;
  endDate: string;
  notes: string;
}

const EMPTY_FORM: TripFormState = {
  countryCode: "",
  startDate: "",
  endDate: "",
  notes: "",
};

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
      <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
      <div className="leading-none">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </p>
        <p className="text-sm font-display font-bold text-foreground mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Trip card ────────────────────────────────────────────────────────────────

function TripCard({
  trip,
  index,
  countryStatus,
  onEdit,
  onDelete,
  isDeleting,
}: {
  trip: TripPublic;
  index: number;
  countryStatus: TravelStatus | null;
  onEdit: (t: TripPublic) => void;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}) {
  const meta = COUNTRY_BY_CODE.get(trip.countryCode);
  const days = tripDays(trip);
  const status = countryStatus;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className="relative pl-14 group"
      data-ocid={`timeline.item.${index + 1}`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-[14px] top-5 w-3 h-3 rounded-full border-2 border-background z-10 transition-smooth ${
          status ? DOT_CLASSES[status] : "bg-primary"
        }`}
        aria-hidden="true"
      />

      <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-smooth">
        <div className="flex items-start justify-between gap-3">
          {/* Country info */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0 leading-none" aria-hidden="true">
              {meta?.flag ?? "🌍"}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-semibold text-foreground">
                  {meta?.name ?? trip.countryCode}
                </h3>
                {status && (
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0.5 border font-medium ${STATUS_CLASSES[status]}`}
                  >
                    {STATUS_LABELS[status]}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="w-3 h-3" aria-hidden="true" />
                  {displayDate(trip.startDate)} – {displayDate(trip.endDate)}
                </span>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <span className="text-xs text-muted-foreground">
                  {days} day{days !== 1 ? "s" : ""}
                </span>
              </div>
              {trip.notes && (
                <p className="text-xs text-muted-foreground mt-1.5 italic leading-relaxed line-clamp-2">
                  “{trip.notes}”
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onEdit(trip)}
              data-ocid={`timeline.edit_button.${index + 1}`}
              aria-label="Edit trip"
              className="h-7 w-7"
            >
              <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onDelete(trip.id)}
              data-ocid={`timeline.delete_button.${index + 1}`}
              aria-label="Delete trip"
              disabled={isDeleting}
              className="h-7 w-7 hover:text-destructive-foreground hover:bg-destructive/20"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Year separator ───────────────────────────────────────────────────────────

function YearSeparator({ year }: { year: number }) {
  return (
    <div
      className="relative pl-14 flex items-center gap-3 my-2"
      aria-hidden="true"
    >
      <div className="absolute left-[14px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-border flex items-center justify-center z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
      </div>
      <span className="font-display text-xs font-bold text-muted-foreground tracking-widest uppercase">
        {year}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

type SortOrder = "desc" | "asc";
type StatusFilter = "all" | TravelStatus;

function FilterBar({
  years,
  yearFilter,
  statusFilter,
  sortOrder,
  onYear,
  onStatus,
  onSort,
}: {
  years: number[];
  yearFilter: string;
  statusFilter: StatusFilter;
  sortOrder: SortOrder;
  onYear: (v: string) => void;
  onStatus: (v: StatusFilter) => void;
  onSort: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-8 py-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-[65px] z-10">
      <Select value={yearFilter} onValueChange={onYear}>
        <SelectTrigger
          className="h-8 w-32 text-xs"
          data-ocid="timeline.year.select"
        >
          <SelectValue placeholder="All years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All years</SelectItem>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-1">
        {(
          [
            ["all", "All"],
            [TravelStatus.visited, "Visited"],
            [TravelStatus.lived_in, "Lived In"],
            [TravelStatus.wishlisted, "Wishlisted"],
          ] as [StatusFilter, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => onStatus(value)}
            data-ocid={`timeline.status_filter.${value}`}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-smooth ${
              statusFilter === value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onSort}
        data-ocid="timeline.sort.toggle"
        className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
      >
        <ArrowDownUp className="w-3 h-3" aria-hidden="true" />
        {sortOrder === "desc" ? "Newest first" : "Oldest first"}
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TimelinePage() {
  const { data: trips, isLoading: tripsLoading } = useListTrips();
  const { data: countries } = useListCountries();
  const { data: stats } = useGetStats();
  const addTrip = useAddTrip();
  const updateTrip = useUpdateTrip();
  const deleteTrip = useDeleteTrip();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TripPublic | null>(null);
  const [form, setForm] = useState<TripFormState>(EMPTY_FORM);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const countryStatusMap = useMemo(() => {
    const map = new Map<string, TravelStatus>();
    for (const c of countries ?? []) map.set(c.code, c.status);
    return map;
  }, [countries]);

  const allYears = useMemo(() => {
    const ySet = new Set<number>();
    for (const t of trips ?? []) ySet.add(getYear(t.startDate));
    return [...ySet].sort((a, b) => b - a);
  }, [trips]);

  const filteredTrips = useMemo(() => {
    let list = [...(trips ?? [])];
    if (yearFilter !== "all")
      list = list.filter((t) => getYear(t.startDate) === Number(yearFilter));
    if (statusFilter !== "all")
      list = list.filter(
        (t) => countryStatusMap.get(t.countryCode) === statusFilter,
      );
    list.sort((a, b) =>
      sortOrder === "desc"
        ? Number(b.startDate) - Number(a.startDate)
        : Number(a.startDate) - Number(b.startDate),
    );
    return list;
  }, [trips, yearFilter, statusFilter, sortOrder, countryStatusMap]);

  type TimelineItem =
    | { type: "year"; year: number }
    | { type: "trip"; trip: TripPublic; displayIndex: number };

  const timelineItems = useMemo<TimelineItem[]>(() => {
    const items: TimelineItem[] = [];
    let lastYear: number | null = null;
    let idx = 0;
    for (const trip of filteredTrips) {
      const y = getYear(trip.startDate);
      if (y !== lastYear) {
        items.push({ type: "year", year: y });
        lastYear = y;
      }
      items.push({ type: "trip", trip, displayIndex: idx++ });
    }
    return items;
  }, [filteredTrips]);

  const totalDays = useMemo(
    () => (trips ?? []).reduce((acc, t) => acc + tripDays(t), 0),
    [trips],
  );

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(trip: TripPublic) {
    setEditing(trip);
    setForm({
      countryCode: trip.countryCode,
      startDate: msToDateStr(trip.startDate),
      endDate: msToDateStr(trip.endDate),
      notes: trip.notes ?? "",
    });
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.countryCode || !form.startDate || !form.endDate) return;
    const start = dateStrToMs(form.startDate);
    const end = dateStrToMs(form.endDate);
    const notes = form.notes.trim() || null;
    if (editing) {
      await updateTrip.mutateAsync({
        id: editing.id,
        startDate: start,
        endDate: end,
        notes,
      });
    } else {
      await addTrip.mutateAsync({
        countryCode: form.countryCode,
        startDate: start,
        endDate: end,
        notes,
      });
    }
    setOpen(false);
  }

  async function handleDelete(id: bigint) {
    await deleteTrip.mutateAsync(id);
  }

  const isSubmitting = addTrip.isPending || updateTrip.isPending;
  const totalTrips = stats ? Number(stats.totalTrips) : (trips?.length ?? 0);
  const daysAbroad = stats ? Number(stats.totalDaysAbroad) : totalDays;
  const uniqueCountries = new Set((trips ?? []).map((t) => t.countryCode)).size;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header
        className="sticky top-0 z-20 bg-card border-b border-border px-8 py-4 flex items-center justify-between gap-4"
        data-ocid="timeline.page"
      >
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold text-foreground leading-none">
            Timeline
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your travel history
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatPill
            icon={Plane}
            label="Total Trips"
            value={tripsLoading ? "…" : totalTrips}
          />
          <StatPill
            icon={Clock}
            label="Days Abroad"
            value={tripsLoading ? "…" : daysAbroad}
          />
          <StatPill
            icon={Globe}
            label="Countries"
            value={tripsLoading ? "…" : uniqueCountries}
          />
          <Button
            type="button"
            onClick={openAdd}
            data-ocid="timeline.add_trip.open_modal_button"
            className="gap-2 h-9"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Trip
          </Button>
        </div>
      </header>

      {/* Filter bar */}
      <FilterBar
        years={allYears}
        yearFilter={yearFilter}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        onYear={setYearFilter}
        onStatus={setStatusFilter}
        onSort={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}
      />

      {/* Timeline content */}
      <div className="px-8 py-8">
        {tripsLoading ? (
          <div data-ocid="timeline.loading_state" className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list, order never changes
              <div key={i} className="pl-14">
                <Skeleton className="h-20 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredTrips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            data-ocid="timeline.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plane
                className="w-8 h-8 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-1">
              {trips?.length === 0
                ? "No trips yet"
                : "No trips match your filters"}
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs">
              {trips?.length === 0
                ? "Start logging your adventures to build your Atlas."
                : "Try adjusting the year or status filters above."}
            </p>
            {trips?.length === 0 && (
              <Button
                type="button"
                onClick={openAdd}
                data-ocid="timeline.empty.add_button"
              >
                Add your first trip
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="relative" data-ocid="timeline.list">
            <div
              className="absolute left-[19px] top-0 bottom-0 w-px bg-border"
              aria-hidden="true"
            />
            <div className="space-y-2">
              {timelineItems.map((item) =>
                item.type === "year" ? (
                  <YearSeparator key={`year-${item.year}`} year={item.year} />
                ) : (
                  <TripCard
                    key={String(item.trip.id)}
                    trip={item.trip}
                    index={item.displayIndex}
                    countryStatus={
                      countryStatusMap.get(item.trip.countryCode) ?? null
                    }
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    isDeleting={deleteTrip.isPending}
                  />
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="timeline.trip.dialog" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing ? "Edit Trip" : "Log a Trip"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="trip-country">Country</Label>
              <Select
                value={form.countryCode}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, countryCode: v }))
                }
                disabled={!!editing}
              >
                <SelectTrigger
                  id="trip-country"
                  data-ocid="timeline.country.select"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.iso2} value={c.iso2}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="trip-start">Start Date</Label>
                <Input
                  id="trip-start"
                  type="date"
                  data-ocid="timeline.start_date.input"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="trip-end">End Date</Label>
                <Input
                  id="trip-end"
                  type="date"
                  data-ocid="timeline.end_date.input"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endDate: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="trip-notes">
                Notes{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="trip-notes"
                data-ocid="timeline.notes.textarea"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                rows={3}
                placeholder="Trip highlights, memories, things to remember…"
                className="resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="timeline.trip.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !form.countryCode ||
                  !form.startDate ||
                  !form.endDate
                }
                data-ocid="timeline.trip.submit_button"
              >
                {isSubmitting
                  ? "Saving…"
                  : editing
                    ? "Save Changes"
                    : "Log Trip"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
