import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useListStates, useRemoveState, useSetState } from "@/hooks/use-travel";
import { TravelStatus } from "@/types/travel";
import { Home, MapPin, Star, X } from "lucide-react";
import { useMemo, useState } from "react";

// ─── US States Data ───────────────────────────────────────────────────────────

type StateCode = string;

interface StateMeta {
  code: StateCode;
  name: string;
}

export const US_STATES: StateMeta[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

// Simplified SVG paths in a 960x600 viewBox (Albers USA-ish projection)
const STATE_PATHS: Record<string, string> = {
  AL: "M 520 370 L 540 370 L 543 430 L 535 440 L 520 430 Z",
  AK: "M 120 460 L 185 460 L 195 490 L 180 510 L 155 515 L 130 505 L 110 490 Z",
  AZ: "M 195 330 L 250 330 L 255 400 L 200 400 Z",
  AR: "M 490 360 L 520 360 L 520 395 L 490 395 Z",
  CA: "M 130 260 L 175 250 L 185 290 L 190 340 L 175 380 L 155 380 L 140 340 L 130 300 Z",
  CO: "M 255 295 L 330 295 L 330 340 L 255 340 Z",
  CT: "M 660 225 L 675 225 L 675 245 L 660 245 Z",
  DE: "M 653 255 L 663 255 L 663 278 L 653 278 Z",
  FL: "M 535 435 L 580 435 L 600 455 L 610 490 L 580 510 L 555 500 L 540 480 L 530 460 Z",
  GA: "M 540 375 L 570 375 L 575 430 L 555 440 L 535 435 L 535 400 Z",
  HI: "M 230 510 L 310 510 L 310 535 L 230 535 Z",
  ID: "M 195 195 L 235 195 L 240 250 L 230 265 L 210 270 L 200 250 Z",
  IL: "M 505 285 L 525 285 L 525 360 L 505 360 Z",
  IN: "M 530 280 L 550 280 L 550 340 L 530 340 Z",
  IA: "M 450 255 L 505 255 L 505 285 L 450 285 Z",
  KS: "M 360 315 L 450 315 L 450 350 L 360 350 Z",
  KY: "M 520 335 L 590 330 L 595 355 L 520 360 Z",
  LA: "M 470 415 L 510 415 L 515 445 L 495 455 L 470 450 Z",
  ME: "M 690 155 L 715 155 L 720 195 L 700 200 L 685 190 Z",
  MD: "M 618 268 L 655 263 L 658 278 L 630 285 L 618 278 Z",
  MA: "M 660 210 L 710 208 L 715 225 L 675 225 L 660 225 Z",
  MI: "M 530 215 L 570 215 L 575 255 L 560 265 L 545 260 L 530 250 Z",
  MN: "M 430 185 L 490 185 L 495 250 L 450 255 L 430 245 Z",
  MS: "M 500 370 L 520 370 L 520 435 L 500 435 Z",
  MO: "M 455 310 L 510 305 L 515 360 L 455 360 Z",
  MT: "M 215 175 L 335 175 L 335 220 L 250 225 L 215 215 Z",
  NE: "M 355 265 L 450 265 L 450 300 L 355 305 Z",
  NV: "M 170 255 L 210 250 L 215 325 L 195 335 L 165 320 Z",
  NH: "M 668 185 L 682 185 L 685 220 L 668 222 Z",
  NJ: "M 648 248 L 662 245 L 665 272 L 650 275 Z",
  NM: "M 255 340 L 310 340 L 315 405 L 255 405 Z",
  NY: "M 605 215 L 660 208 L 665 240 L 648 250 L 605 245 Z",
  NC: "M 565 340 L 640 335 L 645 360 L 565 365 Z",
  ND: "M 350 185 L 430 185 L 430 220 L 350 220 Z",
  OH: "M 555 270 L 595 268 L 598 315 L 555 318 Z",
  OK: "M 360 350 L 475 348 L 478 385 L 360 385 Z",
  OR: "M 135 210 L 200 205 L 205 255 L 170 260 L 135 255 Z",
  PA: "M 595 238 L 650 235 L 653 265 L 598 268 Z",
  RI: "M 678 228 L 688 228 L 688 243 L 678 243 Z",
  SC: "M 568 368 L 605 362 L 612 390 L 580 400 L 562 390 Z",
  SD: "M 350 220 L 430 218 L 432 262 L 355 265 Z",
  TN: "M 510 355 L 590 348 L 592 368 L 510 372 Z",
  TX: "M 315 355 L 465 350 L 470 445 L 410 480 L 360 475 L 315 440 Z",
  UT: "M 215 295 L 258 295 L 260 355 L 215 358 Z",
  VT: "M 656 182 L 668 182 L 668 222 L 656 222 Z",
  VA: "M 580 290 L 645 283 L 648 310 L 595 318 L 575 308 Z",
  WA: "M 140 170 L 210 165 L 213 205 L 145 208 Z",
  WV: "M 580 280 L 615 275 L 620 305 L 598 318 L 578 308 Z",
  WI: "M 480 200 L 520 200 L 525 255 L 490 260 L 478 245 Z",
  WY: "M 250 235 L 335 230 L 337 285 L 253 290 Z",
};

// Label positions (cx, cy) for abbreviations
const STATE_LABEL_POS: Record<string, [number, number]> = {
  AL: [531, 402],
  AK: [153, 488],
  AZ: [225, 367],
  AR: [505, 379],
  CA: [158, 315],
  CO: [292, 318],
  CT: [667, 235],
  DE: [658, 267],
  FL: [565, 472],
  GA: [553, 405],
  HI: [268, 523],
  ID: [217, 233],
  IL: [515, 322],
  IN: [540, 310],
  IA: [477, 270],
  KS: [405, 333],
  KY: [557, 345],
  LA: [490, 435],
  ME: [700, 178],
  MD: [636, 274],
  MA: [687, 217],
  MI: [552, 240],
  MN: [462, 218],
  MS: [510, 403],
  MO: [483, 333],
  MT: [275, 198],
  NE: [402, 283],
  NV: [188, 292],
  NH: [675, 203],
  NJ: [656, 260],
  NM: [283, 373],
  NY: [632, 228],
  NC: [605, 350],
  ND: [390, 203],
  OH: [576, 293],
  OK: [418, 367],
  OR: [168, 233],
  PA: [622, 252],
  RI: [683, 236],
  SC: [585, 382],
  SD: [391, 243],
  TN: [550, 362],
  TX: [390, 415],
  UT: [237, 327],
  VT: [662, 202],
  VA: [612, 300],
  WA: [175, 188],
  WV: [598, 295],
  WI: [500, 228],
  WY: [293, 262],
};

// ─── Color helpers ────────────────────────────────────────────────────────────

function statusFill(status: TravelStatus | undefined): string {
  switch (status) {
    case TravelStatus.visited:
      return "oklch(0.72 0.17 70)";
    case TravelStatus.lived_in:
      return "oklch(0.58 0.14 190)";
    case TravelStatus.wishlisted:
      return "oklch(0.75 0.16 85)";
    default:
      return "oklch(0.22 0.02 50)";
  }
}

function statusStroke(status: TravelStatus | undefined): string {
  return status ? "oklch(0.14 0.015 50)" : "oklch(0.30 0.02 50)";
}

// ─── State Popover ────────────────────────────────────────────────────────────

interface StatePopoverProps {
  stateCode: StateCode;
  stateName: string;
  currentStatus: TravelStatus | undefined;
  onSet: (status: TravelStatus) => void;
  onRemove: () => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
}

const STATUS_ACTIONS = [
  {
    label: "Visited",
    status: TravelStatus.visited,
    Icon: MapPin,
    color: "text-amber-400",
  },
  {
    label: "Lived In",
    status: TravelStatus.lived_in,
    Icon: Home,
    color: "text-teal-400",
  },
  {
    label: "Wishlist",
    status: TravelStatus.wishlisted,
    Icon: Star,
    color: "text-yellow-400",
  },
] as const;

function StatePopover({
  stateName,
  currentStatus,
  onSet,
  onRemove,
  open,
  onOpenChange,
  children,
}: StatePopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-52 p-3 bg-card border-border"
        data-ocid="state.popover"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="font-display font-semibold text-sm text-foreground">
            {stateName}
          </p>
          {currentStatus && (
            <Badge
              variant="outline"
              className="text-xs px-1.5 py-0"
              style={{
                borderColor: statusFill(currentStatus),
                color: statusFill(currentStatus),
              }}
            >
              {currentStatus === TravelStatus.lived_in
                ? "Lived In"
                : currentStatus.charAt(0).toUpperCase() +
                  currentStatus.slice(1)}
            </Badge>
          )}
        </div>
        <div className="space-y-1">
          {STATUS_ACTIONS.map((a) => (
            <button
              key={a.status}
              type="button"
              onClick={() => {
                onSet(a.status);
                onOpenChange(false);
              }}
              className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium transition-smooth hover:bg-muted ${currentStatus === a.status ? "bg-muted" : ""} ${a.color}`}
              data-ocid="state.status_button"
            >
              <a.Icon className="h-3.5 w-3.5" />
              {a.label}
            </button>
          ))}
          {currentStatus && (
            <button
              type="button"
              onClick={() => {
                onRemove();
                onOpenChange(false);
              }}
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/20 transition-smooth"
              data-ocid="state.remove_button"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ─── Summary Chip ───────────────────────────────────────────────────────────

interface SummaryChipProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  total: number;
  color: string;
  bg: string;
  border: string;
}

function SummaryChip({
  icon,
  label,
  count,
  total,
  color,
  bg,
  border,
}: SummaryChipProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${bg} ${border}`}
    >
      <span className={color}>{icon}</span>
      <div>
        <p className={`font-display text-lg font-bold leading-none ${color}`}>
          {count}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {label} / {total}
        </p>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block w-3 h-3 rounded-sm"
        style={{ background: color, border: "1px solid oklch(0.30 0.02 50)" }}
      />
      <span>{label}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StatesPage() {
  const { data: stateEntries = [] } = useListStates();
  const setStateMut = useSetState();
  const removeStateMut = useRemoveState();
  const [openState, setOpenState] = useState<string | null>(null);

  const statusMap = useMemo(() => {
    const map: Record<string, TravelStatus> = {};
    for (const e of stateEntries) map[e.code] = e.status;
    return map;
  }, [stateEntries]);

  const visited = stateEntries.filter(
    (e) => e.status === TravelStatus.visited,
  ).length;
  const livedIn = stateEntries.filter(
    (e) => e.status === TravelStatus.lived_in,
  ).length;
  const wishlisted = stateEntries.filter(
    (e) => e.status === TravelStatus.wishlisted,
  ).length;

  return (
    <div className="flex flex-col gap-6 p-6" data-ocid="states.page">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">
          US States
        </h1>
        <p className="text-sm text-muted-foreground">
          Click any state to mark it as visited, lived in, or wishlisted
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3" data-ocid="states.summary">
        <SummaryChip
          icon={<MapPin className="h-4 w-4" />}
          label="Visited"
          count={visited}
          total={50}
          color="text-amber-400"
          bg="bg-amber-400/10"
          border="border-amber-400/20"
        />
        <SummaryChip
          icon={<Home className="h-4 w-4" />}
          label="Lived In"
          count={livedIn}
          total={50}
          color="text-teal-400"
          bg="bg-teal-400/10"
          border="border-teal-400/20"
        />
        <SummaryChip
          icon={<Star className="h-4 w-4" />}
          label="Wishlist"
          count={wishlisted}
          total={50}
          color="text-yellow-400"
          bg="bg-yellow-400/10"
          border="border-yellow-400/20"
        />
        <SummaryChip
          icon={<span className="text-base leading-none">🗺️</span>}
          label="Tracked"
          count={visited + livedIn + wishlisted}
          total={50}
          color="text-foreground"
          bg="bg-muted"
          border="border-border"
        />
      </div>

      {/* SVG Map */}
      <div
        className="bg-card rounded-2xl border border-border p-4 overflow-hidden"
        data-ocid="states.map"
      >
        <svg
          viewBox="80 150 900 420"
          className="w-full"
          style={{ maxHeight: 520 }}
          aria-label="Map of US states"
          role="img"
        >
          <title>Map of US states</title>
          {US_STATES.map((state) => {
            const path = STATE_PATHS[state.code];
            if (!path) return null;
            const status = statusMap[state.code];
            const fill = statusFill(status);
            const stroke = statusStroke(status);
            const labelPos = STATE_LABEL_POS[state.code];
            const isOpen = openState === state.code;

            return (
              <StatePopover
                key={state.code}
                stateCode={state.code}
                stateName={state.name}
                currentStatus={status}
                onSet={(s) =>
                  setStateMut.mutate({ code: state.code, status: s })
                }
                onRemove={() => removeStateMut.mutate(state.code)}
                open={isOpen}
                onOpenChange={(v) => setOpenState(v ? state.code : null)}
              >
                <g
                  // biome-ignore lint/a11y/useSemanticElements: SVG <g> cannot be a <button> in a map context
                  tabIndex={0}
                  role="button"
                  aria-label={`${state.name}${status ? ` — ${status}` : ""}`}
                  className="cursor-pointer focus:outline-none"
                  data-ocid={`states.state.${state.code.toLowerCase()}`}
                  style={{ outline: "none" }}
                >
                  <path
                    d={path}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isOpen ? 2 : 1}
                    style={{
                      filter: isOpen
                        ? `drop-shadow(0 0 6px ${fill})`
                        : undefined,
                      transition: "fill 0.2s ease, stroke-width 0.15s ease",
                    }}
                  />
                  {labelPos && (
                    <text
                      x={labelPos[0]}
                      y={labelPos[1]}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9}
                      fontFamily="var(--font-body)"
                      fontWeight={600}
                      fill={
                        status ? "oklch(0.14 0.015 50)" : "oklch(0.55 0.012 55)"
                      }
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {state.code}
                    </text>
                  )}
                </g>
              </StatePopover>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground"
        data-ocid="states.legend"
      >
        <span className="font-display font-semibold text-foreground/50 uppercase tracking-widest text-[10px]">
          Legend
        </span>
        <LegendItem color="oklch(0.72 0.17 70)" label="Visited" />
        <LegendItem color="oklch(0.58 0.14 190)" label="Lived In" />
        <LegendItem color="oklch(0.75 0.16 85)" label="Wishlist" />
        <LegendItem color="oklch(0.22 0.02 50)" label="Not tracked" />
      </div>
    </div>
  );
}
