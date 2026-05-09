import { TravelStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTINENTS, COUNTRIES } from "@/data/countries";
import {
  useListCountries,
  useRemoveCountry,
  useSetCountry,
} from "@/hooks/use-travel";
import type { Continent, CountryMeta } from "@/types/travel";
import { Check, Globe, Heart, Home, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

// ── Status color config ───────────────────────────────────────────────────────
const STATUS_CONFIG = {
  [TravelStatus.visited]: {
    label: "Visited",
    badgeClass: "border-amber-500/50 text-amber-400 bg-amber-500/10",
    btnClass: "border-amber-500/60 text-amber-400 hover:bg-amber-500/15",
    activeBtnClass: "bg-amber-500/20 border-amber-500 text-amber-300",
  },
  [TravelStatus.lived_in]: {
    label: "Lived In",
    badgeClass: "border-teal-500/50 text-teal-400 bg-teal-500/10",
    btnClass: "border-teal-500/60 text-teal-400 hover:bg-teal-500/15",
    activeBtnClass: "bg-teal-500/20 border-teal-500 text-teal-300",
  },
  [TravelStatus.wishlisted]: {
    label: "Wishlist",
    badgeClass: "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
    btnClass: "border-yellow-500/60 text-yellow-400 hover:bg-yellow-500/15",
    activeBtnClass: "bg-yellow-500/20 border-yellow-500 text-yellow-300",
  },
} as const;

const CONTINENT_COLOR: Record<Continent, string> = {
  Africa: "border-orange-500/40 text-orange-400 bg-orange-500/10",
  Asia: "border-red-500/40 text-red-400 bg-red-500/10",
  Europe: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  "North America": "border-purple-500/40 text-purple-400 bg-purple-500/10",
  "South America": "border-green-500/40 text-green-400 bg-green-500/10",
  Oceania: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
  Antarctica: "border-slate-500/40 text-slate-400 bg-slate-500/10",
};

type StatusFilter = "all" | "visited" | "lived_in" | "wishlisted" | "not_yet";
type SortKey = "alpha" | "population" | "continent";

function fmt(n: number): string {
  return n.toLocaleString();
}

// ── CountryCard ───────────────────────────────────────────────────────────────
function CountryCard({
  country,
  status,
  onSet,
  onRemove,
  index,
}: {
  country: CountryMeta;
  status: TravelStatus | undefined;
  onSet: (code: string, s: TravelStatus) => void;
  onRemove: (code: string) => void;
  index: number;
}) {
  const statusEntry = status != null ? STATUS_CONFIG[status] : null;

  const handleToggle = (s: TravelStatus) => {
    if (status === s) {
      onRemove(country.iso2);
    } else {
      onSet(country.iso2, s);
    }
  };

  return (
    <article
      data-ocid={`explore.item.${index}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-smooth hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0 leading-none" aria-hidden="true">
            {country.flag}
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-sm leading-tight truncate">
              {country.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {country.capital}
            </p>
          </div>
        </div>
        {/* Status badge */}
        {statusEntry && (
          <Badge
            variant="outline"
            className={`shrink-0 text-[10px] px-1.5 py-0 h-5 ${statusEntry.badgeClass}`}
          >
            {statusEntry.label}
          </Badge>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-1 text-center">
        <div className="rounded-lg bg-muted/40 px-1.5 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5">
            Currency
          </p>
          <p className="text-xs font-medium text-foreground truncate">
            {country.currency}
          </p>
        </div>
        <div className="rounded-lg bg-muted/40 px-1.5 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5">
            Language
          </p>
          <p className="text-xs font-medium text-foreground truncate">
            {country.language}
          </p>
        </div>
        <div className="rounded-lg bg-muted/40 px-1.5 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5">
            Pop.
          </p>
          <p className="text-xs font-medium text-foreground truncate">
            {fmt(country.population)}
          </p>
        </div>
      </div>

      {/* Continent badge */}
      <div className="flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={`text-[10px] px-1.5 py-0 h-4.5 ${CONTINENT_COLOR[country.continent]}`}
        >
          {country.continent}
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex gap-1 mt-auto">
        <button
          type="button"
          data-ocid={`explore.visited_toggle.${index}`}
          aria-label={`Mark ${country.name} as visited`}
          aria-pressed={status === TravelStatus.visited}
          onClick={() => handleToggle(TravelStatus.visited)}
          className={`flex-1 flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-smooth ${
            status === TravelStatus.visited
              ? STATUS_CONFIG[TravelStatus.visited].activeBtnClass
              : STATUS_CONFIG[TravelStatus.visited].btnClass
          }`}
        >
          {status === TravelStatus.visited ? (
            <Check className="w-3 h-3" aria-hidden="true" />
          ) : (
            <Globe className="w-3 h-3" aria-hidden="true" />
          )}
          Visited
        </button>
        <button
          type="button"
          data-ocid={`explore.lived_toggle.${index}`}
          aria-label={`Mark ${country.name} as lived in`}
          aria-pressed={status === TravelStatus.lived_in}
          onClick={() => handleToggle(TravelStatus.lived_in)}
          className={`flex-1 flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-smooth ${
            status === TravelStatus.lived_in
              ? STATUS_CONFIG[TravelStatus.lived_in].activeBtnClass
              : STATUS_CONFIG[TravelStatus.lived_in].btnClass
          }`}
        >
          {status === TravelStatus.lived_in ? (
            <Check className="w-3 h-3" aria-hidden="true" />
          ) : (
            <Home className="w-3 h-3" aria-hidden="true" />
          )}
          Lived
        </button>
        <button
          type="button"
          data-ocid={`explore.wish_toggle.${index}`}
          aria-label={`Add ${country.name} to wishlist`}
          aria-pressed={status === TravelStatus.wishlisted}
          onClick={() => handleToggle(TravelStatus.wishlisted)}
          className={`flex-1 flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-smooth ${
            status === TravelStatus.wishlisted
              ? STATUS_CONFIG[TravelStatus.wishlisted].activeBtnClass
              : STATUS_CONFIG[TravelStatus.wishlisted].btnClass
          }`}
        >
          {status === TravelStatus.wishlisted ? (
            <Check className="w-3 h-3" aria-hidden="true" />
          ) : (
            <Heart className="w-3 h-3" aria-hidden="true" />
          )}
          Wish
        </button>
      </div>
    </article>
  );
}

// ── ExplorePage ───────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const { data: travelData, isLoading } = useListCountries();
  const setCountry = useSetCountry();
  const removeCountry = useRemoveCountry();

  const [search, setSearch] = useState("");
  const [continentFilter, setContinentFilter] = useState<Continent | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("alpha");

  // Build a map of code → status from backend data
  const statusMap = useMemo(() => {
    const m = new Map<string, TravelStatus>();
    for (const entry of travelData ?? []) {
      m.set(entry.code, entry.status);
    }
    return m;
  }, [travelData]);

  const filtered = useMemo(() => {
    let list: CountryMeta[] = COUNTRIES;

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }

    // Continent filter
    if (continentFilter !== "all") {
      list = list.filter((c) => c.continent === continentFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "not_yet") {
        list = list.filter((c) => !statusMap.has(c.iso2));
      } else {
        const ts =
          statusFilter === "visited"
            ? TravelStatus.visited
            : statusFilter === "lived_in"
              ? TravelStatus.lived_in
              : TravelStatus.wishlisted;
        list = list.filter((c) => statusMap.get(c.iso2) === ts);
      }
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sort === "alpha") return a.name.localeCompare(b.name);
      if (sort === "population") return b.population - a.population;
      if (sort === "continent") {
        const cmp = a.continent.localeCompare(b.continent);
        return cmp !== 0 ? cmp : a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [search, continentFilter, statusFilter, sort, statusMap]);

  const handleSet = (code: string, status: TravelStatus) => {
    setCountry.mutate({ code, status });
  };

  const handleRemove = (code: string) => {
    removeCountry.mutate(code);
  };

  const handleClearFilters = () => {
    setSearch("");
    setContinentFilter("all");
    setStatusFilter("all");
    setSort("alpha");
  };

  const hasFilters =
    search.trim() !== "" ||
    continentFilter !== "all" ||
    statusFilter !== "all" ||
    sort !== "alpha";

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Explore
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} of {COUNTRIES.length} countries
            </p>
          </div>
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              data-ocid="explore.clear_filters_button"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground gap-1.5 shrink-0"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              Clear filters
            </Button>
          )}
        </div>
      </header>

      {/* Filter toolbar */}
      <div className="sticky top-[73px] z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              data-ocid="explore.search_input"
              type="search"
              placeholder="Search countries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border h-9 text-sm"
              aria-label="Search countries"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Continent filter */}
            <Select
              value={continentFilter}
              onValueChange={(v) => setContinentFilter(v as Continent | "all")}
            >
              <SelectTrigger
                data-ocid="explore.continent_select"
                className="w-40 h-9 text-sm bg-card border-border"
                aria-label="Filter by continent"
              >
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All continents</SelectItem>
                {CONTINENTS.filter((c) => c !== "Antarctica").map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status filter */}
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as StatusFilter)}
            >
              <SelectTrigger
                data-ocid="explore.status_select"
                className="w-36 h-9 text-sm bg-card border-border"
                aria-label="Filter by status"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="visited">Visited</SelectItem>
                <SelectItem value="lived_in">Lived In</SelectItem>
                <SelectItem value="wishlisted">Wishlisted</SelectItem>
                <SelectItem value="not_yet">Not Yet</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger
                data-ocid="explore.sort_select"
                className="w-36 h-9 text-sm bg-card border-border"
                aria-label="Sort countries"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alpha">A → Z</SelectItem>
                <SelectItem value="population">Population</SelectItem>
                <SelectItem value="continent">Continent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="p-6">
        {isLoading ? (
          <div
            data-ocid="explore.loading_state"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {Array.from({ length: 20 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="explore.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Globe
              className="w-12 h-12 text-muted-foreground mb-4"
              aria-hidden="true"
            />
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">
              No countries found
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="explore.empty_clear_button"
              onClick={handleClearFilters}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((country, i) => (
              <CountryCard
                key={country.iso2}
                country={country}
                status={statusMap.get(country.iso2)}
                onSet={handleSet}
                onRemove={handleRemove}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
