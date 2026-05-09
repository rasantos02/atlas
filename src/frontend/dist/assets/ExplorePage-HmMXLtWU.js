import { r as reactExports, j as jsxRuntimeExports, X, S as Skeleton, G as Globe } from "./index-BiNIKcBE.js";
import { a as useListCountries, c as useSetCountry, j as useRemoveCountry, T as TravelStatus } from "./use-travel-CZZKui9J.js";
import { B as Badge } from "./index-8fijkRIb.js";
import { B as Button, I as Input } from "./input-S0QbCADB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Check } from "./select-Bv3iV3dN.js";
import { b as COUNTRIES, c as CONTINENTS } from "./countries-Cpa9FtoK.js";
import { S as Search } from "./search-CmjZJibV.js";
import { H as House } from "./house-D4MLZOvp.js";
import { H as Heart } from "./heart-wnkGbYEE.js";
import "./index-BtIPAA8J.js";
const STATUS_CONFIG = {
  [TravelStatus.visited]: {
    label: "Visited",
    badgeClass: "border-amber-500/50 text-amber-400 bg-amber-500/10",
    btnClass: "border-amber-500/60 text-amber-400 hover:bg-amber-500/15",
    activeBtnClass: "bg-amber-500/20 border-amber-500 text-amber-300"
  },
  [TravelStatus.lived_in]: {
    label: "Lived In",
    badgeClass: "border-teal-500/50 text-teal-400 bg-teal-500/10",
    btnClass: "border-teal-500/60 text-teal-400 hover:bg-teal-500/15",
    activeBtnClass: "bg-teal-500/20 border-teal-500 text-teal-300"
  },
  [TravelStatus.wishlisted]: {
    label: "Wishlist",
    badgeClass: "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
    btnClass: "border-yellow-500/60 text-yellow-400 hover:bg-yellow-500/15",
    activeBtnClass: "bg-yellow-500/20 border-yellow-500 text-yellow-300"
  }
};
const CONTINENT_COLOR = {
  Africa: "border-orange-500/40 text-orange-400 bg-orange-500/10",
  Asia: "border-red-500/40 text-red-400 bg-red-500/10",
  Europe: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  "North America": "border-purple-500/40 text-purple-400 bg-purple-500/10",
  "South America": "border-green-500/40 text-green-400 bg-green-500/10",
  Oceania: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
  Antarctica: "border-slate-500/40 text-slate-400 bg-slate-500/10"
};
function fmt(n) {
  return n.toLocaleString();
}
function CountryCard({
  country,
  status,
  onSet,
  onRemove,
  index
}) {
  const statusEntry = status != null ? STATUS_CONFIG[status] : null;
  const handleToggle = (s) => {
    if (status === s) {
      onRemove(country.iso2);
    } else {
      onSet(country.iso2, s);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `explore.item.${index}`,
      className: "group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-smooth hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl shrink-0 leading-none", "aria-hidden": "true", children: country.flag }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight truncate", children: country.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: country.capital })
            ] })
          ] }),
          statusEntry && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `shrink-0 text-[10px] px-1.5 py-0 h-5 ${statusEntry.badgeClass}`,
              children: statusEntry.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 px-1.5 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5", children: "Currency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: country.currency })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 px-1.5 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5", children: "Language" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: country.language })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 px-1.5 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5", children: "Pop." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: fmt(country.population) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: `text-[10px] px-1.5 py-0 h-4.5 ${CONTINENT_COLOR[country.continent]}`,
            children: country.continent
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `explore.visited_toggle.${index}`,
              "aria-label": `Mark ${country.name} as visited`,
              "aria-pressed": status === TravelStatus.visited,
              onClick: () => handleToggle(TravelStatus.visited),
              className: `flex-1 flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-smooth ${status === TravelStatus.visited ? STATUS_CONFIG[TravelStatus.visited].activeBtnClass : STATUS_CONFIG[TravelStatus.visited].btnClass}`,
              children: [
                status === TravelStatus.visited ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3", "aria-hidden": "true" }),
                "Visited"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `explore.lived_toggle.${index}`,
              "aria-label": `Mark ${country.name} as lived in`,
              "aria-pressed": status === TravelStatus.lived_in,
              onClick: () => handleToggle(TravelStatus.lived_in),
              className: `flex-1 flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-smooth ${status === TravelStatus.lived_in ? STATUS_CONFIG[TravelStatus.lived_in].activeBtnClass : STATUS_CONFIG[TravelStatus.lived_in].btnClass}`,
              children: [
                status === TravelStatus.lived_in ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3", "aria-hidden": "true" }),
                "Lived"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `explore.wish_toggle.${index}`,
              "aria-label": `Add ${country.name} to wishlist`,
              "aria-pressed": status === TravelStatus.wishlisted,
              onClick: () => handleToggle(TravelStatus.wishlisted),
              className: `flex-1 flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-smooth ${status === TravelStatus.wishlisted ? STATUS_CONFIG[TravelStatus.wishlisted].activeBtnClass : STATUS_CONFIG[TravelStatus.wishlisted].btnClass}`,
              children: [
                status === TravelStatus.wishlisted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3", "aria-hidden": "true" }),
                "Wish"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ExplorePage() {
  const { data: travelData, isLoading } = useListCountries();
  const setCountry = useSetCountry();
  const removeCountry = useRemoveCountry();
  const [search, setSearch] = reactExports.useState("");
  const [continentFilter, setContinentFilter] = reactExports.useState(
    "all"
  );
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("alpha");
  const statusMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const entry of travelData ?? []) {
      m.set(entry.code, entry.status);
    }
    return m;
  }, [travelData]);
  const filtered = reactExports.useMemo(() => {
    let list = COUNTRIES;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (continentFilter !== "all") {
      list = list.filter((c) => c.continent === continentFilter);
    }
    if (statusFilter !== "all") {
      if (statusFilter === "not_yet") {
        list = list.filter((c) => !statusMap.has(c.iso2));
      } else {
        const ts = statusFilter === "visited" ? TravelStatus.visited : statusFilter === "lived_in" ? TravelStatus.lived_in : TravelStatus.wishlisted;
        list = list.filter((c) => statusMap.get(c.iso2) === ts);
      }
    }
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
  const handleSet = (code, status) => {
    setCountry.mutate({ code, status });
  };
  const handleRemove = (code) => {
    removeCountry.mutate(code);
  };
  const handleClearFilters = () => {
    setSearch("");
    setContinentFilter("all");
    setStatusFilter("all");
    setSort("alpha");
  };
  const hasFilters = search.trim() !== "" || continentFilter !== "all" || statusFilter !== "all" || sort !== "alpha";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-10 bg-card border-b border-border px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " of ",
          COUNTRIES.length,
          " countries"
        ] })
      ] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          "data-ocid": "explore.clear_filters_button",
          onClick: handleClearFilters,
          className: "text-muted-foreground hover:text-foreground gap-1.5 shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
            "Clear filters"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[73px] z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "explore.search_input",
            type: "search",
            placeholder: "Search countries…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 bg-card border-border h-9 text-sm",
            "aria-label": "Search countries"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: continentFilter,
            onValueChange: (v) => setContinentFilter(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "explore.continent_select",
                  className: "w-40 h-9 text-sm bg-card border-border",
                  "aria-label": "Filter by continent",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Continent" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All continents" }),
                CONTINENTS.filter((c) => c !== "Antarctica").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: statusFilter,
            onValueChange: (v) => setStatusFilter(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "explore.status_select",
                  className: "w-36 h-9 text-sm bg-card border-border",
                  "aria-label": "Filter by status",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "visited", children: "Visited" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lived_in", children: "Lived In" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "wishlisted", children: "Wishlisted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "not_yet", children: "Not Yet" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              "data-ocid": "explore.sort_select",
              className: "w-36 h-9 text-sm bg-card border-border",
              "aria-label": "Sort countries",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alpha", children: "A → Z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "population", children: "Population" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "continent", children: "Continent" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "explore.loading_state",
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
        children: Array.from({ length: 20 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl" }, i)
        ))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "explore.empty_state",
        className: "flex flex-col items-center justify-center py-24 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Globe,
            {
              className: "w-12 h-12 text-muted-foreground mb-4",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "No countries found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Try adjusting your search or filters." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              "data-ocid": "explore.empty_clear_button",
              onClick: handleClearFilters,
              children: "Clear all filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: filtered.map((country, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CountryCard,
      {
        country,
        status: statusMap.get(country.iso2),
        onSet: handleSet,
        onRemove: handleRemove,
        index: i + 1
      },
      country.iso2
    )) }) })
  ] });
}
export {
  ExplorePage as default
};
