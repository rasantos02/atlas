import { TravelStatus } from "@/backend";
import { COUNTRY_BY_CODE } from "@/data/countries";
import { useListCountries } from "@/hooks/use-travel";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Eye, Globe, Heart, Home, type LucideIcon, MapPin } from "lucide-react";
import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ── Country centroids (iso2 → [lat, lng]) ────────────────────────────────────
const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  AF: [33.93, 67.71],
  AL: [41.15, 20.17],
  DZ: [28.03, 1.66],
  AD: [42.55, 1.6],
  AO: [-11.2, 17.87],
  AG: [17.06, -61.8],
  AR: [-38.42, -63.62],
  AM: [40.07, 45.04],
  AU: [-25.27, 133.78],
  AT: [47.52, 14.55],
  AZ: [40.14, 47.58],
  BS: [25.03, -77.4],
  BH: [26.0, 50.55],
  BD: [23.68, 90.36],
  BB: [13.19, -59.54],
  BY: [53.71, 28.05],
  BE: [50.5, 4.47],
  BZ: [17.19, -88.5],
  BJ: [9.31, 2.32],
  BT: [27.51, 90.43],
  BO: [-16.29, -63.59],
  BA: [43.92, 17.68],
  BW: [-22.33, 24.68],
  BR: [-14.24, -51.93],
  BN: [4.54, 114.73],
  BG: [42.73, 25.49],
  BF: [12.36, -1.54],
  BI: [-3.37, 29.92],
  CV: [16.0, -24.01],
  KH: [12.57, 104.99],
  CM: [3.85, 11.5],
  CA: [56.13, -106.35],
  CF: [6.61, 20.94],
  TD: [15.45, 18.73],
  CL: [-35.68, -71.54],
  CN: [35.86, 104.2],
  CO: [4.57, -74.3],
  KM: [-11.88, 43.87],
  CG: [-0.23, 15.83],
  CD: [-4.04, 21.76],
  CR: [9.75, -83.75],
  CI: [7.54, -5.55],
  HR: [45.1, 15.2],
  CU: [21.52, -77.78],
  CY: [35.13, 33.43],
  CZ: [49.82, 15.47],
  DK: [56.26, 9.5],
  DJ: [11.83, 42.59],
  DM: [15.41, -61.37],
  DO: [18.74, -70.16],
  EC: [-1.83, -78.18],
  EG: [26.82, 30.8],
  SV: [13.79, -88.9],
  GQ: [1.65, 10.27],
  ER: [15.18, 39.78],
  EE: [58.6, 25.01],
  SZ: [-26.52, 31.47],
  ET: [9.15, 40.49],
  FJ: [-17.71, 178.06],
  FI: [61.92, 25.75],
  FR: [46.23, 2.21],
  GA: [-0.8, 11.61],
  GM: [13.44, -15.31],
  GE: [42.32, 43.36],
  DE: [51.17, 10.45],
  GH: [7.95, -1.02],
  GR: [39.07, 21.82],
  GD: [12.12, -61.68],
  GT: [15.78, -90.23],
  GN: [9.95, -11.61],
  GW: [11.8, -15.18],
  GY: [4.86, -58.93],
  HT: [18.97, -72.29],
  HN: [15.2, -86.24],
  HU: [47.16, 19.5],
  IS: [64.96, -19.02],
  IN: [20.59, 78.96],
  ID: [-0.79, 113.92],
  IR: [32.43, 53.69],
  IQ: [33.22, 43.68],
  IE: [53.41, -8.24],
  IL: [31.05, 34.85],
  IT: [41.87, 12.57],
  JM: [18.11, -77.3],
  JP: [36.2, 138.25],
  JO: [30.59, 36.24],
  KZ: [48.02, 66.92],
  KE: [-0.02, 37.91],
  KW: [29.31, 47.48],
  KG: [41.2, 74.77],
  LA: [19.86, 102.5],
  LV: [56.88, 24.6],
  LB: [33.85, 35.86],
  LS: [-29.61, 28.23],
  LR: [6.43, -9.43],
  LY: [26.34, 17.23],
  LI: [47.14, 9.55],
  LT: [55.17, 23.88],
  LU: [49.82, 6.13],
  MG: [-18.77, 46.87],
  MW: [-13.25, 34.3],
  MY: [4.21, 108.96],
  MV: [3.2, 73.22],
  ML: [17.57, -3.99],
  MT: [35.94, 14.37],
  MR: [21.01, -10.94],
  MU: [-20.35, 57.55],
  MX: [23.63, -102.55],
  MD: [47.41, 28.37],
  MC: [43.75, 7.4],
  MN: [46.86, 103.85],
  ME: [42.71, 19.37],
  MA: [31.79, -7.09],
  MZ: [-18.67, 35.53],
  MM: [21.92, 95.96],
  NA: [-22.96, 18.49],
  NP: [28.39, 84.12],
  NL: [52.13, 5.29],
  NZ: [-40.9, 174.89],
  NI: [12.87, -85.21],
  NE: [17.61, 8.08],
  NG: [9.08, 8.68],
  NO: [60.47, 8.47],
  OM: [21.51, 55.92],
  PK: [30.38, 69.35],
  PA: [8.54, -80.78],
  PG: [-6.31, 143.96],
  PY: [-23.44, -58.44],
  PE: [-9.19, -75.02],
  PH: [12.88, 121.77],
  PL: [51.92, 19.15],
  PT: [39.4, -8.22],
  QA: [25.35, 51.18],
  RO: [45.94, 24.97],
  RU: [61.52, 105.32],
  RW: [-1.94, 29.87],
  SA: [23.89, 45.08],
  SN: [14.5, -14.45],
  RS: [44.02, 21.01],
  SG: [1.35, 103.82],
  SK: [48.67, 19.7],
  SI: [46.15, 14.99],
  SO: [5.15, 46.2],
  ZA: [-30.56, 22.94],
  SS: [6.88, 31.31],
  ES: [40.46, -3.75],
  LK: [7.87, 80.77],
  SD: [12.86, 30.22],
  SR: [3.92, -56.03],
  SE: [60.13, 18.64],
  CH: [46.82, 8.23],
  SY: [34.8, 38.99],
  TW: [23.7, 120.96],
  TJ: [38.86, 71.28],
  TZ: [-6.37, 34.89],
  TH: [15.87, 100.99],
  TG: [8.62, 0.82],
  TN: [33.89, 9.54],
  TR: [38.96, 35.24],
  TM: [38.97, 59.56],
  UG: [1.37, 32.29],
  UA: [48.38, 31.17],
  AE: [23.42, 53.85],
  GB: [55.38, -3.44],
  US: [37.09, -95.71],
  UY: [-32.52, -55.77],
  UZ: [41.38, 64.59],
  VE: [6.42, -66.59],
  VN: [14.06, 108.28],
  YE: [15.55, 48.52],
  ZM: [-13.13, 27.85],
  ZW: [-19.02, 29.15],
  KR: [35.91, 127.77],
  KP: [40.34, 127.51],
  PS: [31.95, 35.23],
  XK: [42.6, 20.9],
  NR: [-0.52, 166.93],
  KI: [-3.37, -168.73],
  MH: [7.13, 171.18],
  FM: [7.43, 150.55],
  PW: [7.51, 134.58],
  SB: [-9.64, 160.16],
  VU: [-15.38, 166.96],
  TO: [-21.18, -175.2],
  WS: [-13.76, -172.1],
  TV: [-7.11, 177.65],
  KN: [17.36, -62.78],
  LC: [13.91, -60.98],
  VC: [12.98, -61.29],
  TT: [10.69, -61.22],
  SM: [43.94, 12.46],
  SC: [-4.68, 55.49],
  ST: [0.19, 6.61],
};

// ── Design colours ───────────────────────────────────────────────────────────
const C_GLOBE = new THREE.Color(0x1a1512);
const C_WIRE = new THREE.Color(0x3a2e20);
const C_ATMO = new THREE.Color(0x201a10);
const C_VISITED = new THREE.Color(0xe8a830); // warm amber
const C_LIVED = new THREE.Color(0x38c5b0); // teal
const C_WISH = new THREE.Color(0xd4b44a); // gold
const C_HOVER = new THREE.Color(0xffd060);

const STATUS_LABEL: Record<string, string> = {
  visited: "Visited",
  lived_in: "Lived In",
  wishlisted: "Wishlisted",
};

function resolveStatus(raw: TravelStatus): string {
  if (raw === TravelStatus.lived_in) return "lived_in";
  if (raw === TravelStatus.wishlisted) return "wishlisted";
  return "visited";
}

// ── helpers ──────────────────────────────────────────────────────────────────
function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function markerColor(status: string): THREE.Color {
  if (status === "lived_in") return C_LIVED;
  if (status === "wishlisted") return C_WISH;
  return C_VISITED;
}

// ── Sub-components ───────────────────────────────────────────────────────────
function GlobeMesh() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1.025, 48, 48]} />
        <meshBasicMaterial
          color={C_ATMO}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshPhongMaterial
          color={C_GLOBE}
          shininess={10}
          specular={new THREE.Color(0x2a2010)}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.001, 32, 32]} />
        <meshBasicMaterial
          color={C_WIRE}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
    </>
  );
}

interface MarkerProps {
  lat: number;
  lng: number;
  status: string;
  name: string;
  onHover: (info: MarkerInfo | null) => void;
  onSelect: (info: MarkerInfo) => void;
}

interface MarkerInfo {
  name: string;
  status: string;
}

function CountryMarker({
  lat,
  lng,
  status,
  name,
  onHover,
  onSelect,
}: MarkerProps) {
  const [hov, setHov] = useState(false);
  const pos = useMemo(() => latLngToVec3(lat, lng, 1.014), [lat, lng]);
  const col = hov ? C_HOVER : markerColor(status);

  return (
    <mesh
      position={pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHov(true);
        onHover({ name, status });
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHov(false);
        onHover(null);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect({ name, status });
      }}
    >
      <sphereGeometry args={[hov ? 0.024 : 0.017, 8, 8]} />
      <meshBasicMaterial color={col} />
    </mesh>
  );
}

interface SceneProps {
  entries: Array<{ code: string; status: string }>;
  onHover: (info: MarkerInfo | null) => void;
  onSelect: (info: MarkerInfo) => void;
  paused: boolean;
}

function Scene({ entries, onHover, onSelect, paused }: SceneProps) {
  const grp = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (grp.current && !paused) grp.current.rotation.y += dt * 0.07;
  });

  return (
    <group ref={grp}>
      <GlobeMesh />
      {entries.map(({ code, status }) => {
        const c = COUNTRY_CENTROIDS[code];
        if (!c) return null;
        const name = COUNTRY_BY_CODE.get(code)?.name ?? code;
        return (
          <CountryMarker
            key={code}
            lat={c[0]}
            lng={c[1]}
            status={status}
            name={name}
            onHover={onHover}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}

function Controls({
  onStart,
  onEnd,
}: { onStart: () => void; onEnd: () => void }) {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI * 0.1}
      maxPolarAngle={Math.PI * 0.9}
      rotateSpeed={0.45}
      dampingFactor={0.08}
      enableDamping
      onStart={onStart}
      onEnd={onEnd}
    />
  );
}

// ── Overlay UI ───────────────────────────────────────────────────────────────
function CountryTooltip({ info }: { info: MarkerInfo | null }) {
  if (!info) return null;
  const clr =
    info.status === "lived_in"
      ? "#38c5b0"
      : info.status === "wishlisted"
        ? "#d4b44a"
        : "#e8a830";
  return (
    <div
      data-ocid="globe.country_tooltip"
      className="absolute top-6 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 flex items-center gap-2 pointer-events-none z-20"
    >
      <MapPin className="w-4 h-4 shrink-0" style={{ color: clr }} />
      <span className="font-display text-sm text-foreground">{info.name}</span>
      <span
        className="text-[11px] px-2 py-0.5 rounded-full"
        style={{ background: `${clr}22`, color: clr }}
      >
        {STATUS_LABEL[info.status] ?? info.status}
      </span>
    </div>
  );
}

function SelectedPanel({
  info,
  onClose,
}: { info: MarkerInfo | null; onClose: () => void }) {
  if (!info) return null;
  const clr =
    info.status === "lived_in"
      ? "#38c5b0"
      : info.status === "wishlisted"
        ? "#d4b44a"
        : "#e8a830";
  return (
    <div
      data-ocid="globe.selected_panel"
      className="absolute bottom-24 right-6 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 min-w-[180px] z-20"
    >
      <button
        type="button"
        data-ocid="globe.close_button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2.5 right-3 text-muted-foreground hover:text-foreground transition-smooth text-base leading-none"
      >
        ✕
      </button>
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 shrink-0" style={{ color: clr }} />
        <span className="font-display text-sm font-semibold text-foreground">
          {info.name}
        </span>
      </div>
      <span
        className="text-[11px] px-2 py-0.5 rounded-full"
        style={{ background: `${clr}22`, color: clr }}
      >
        {STATUS_LABEL[info.status] ?? info.status}
      </span>
    </div>
  );
}

function LegendRow({
  color,
  icon: Icon,
  label,
  count,
}: {
  color: string;
  icon: LucideIcon;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <Icon className="w-3 h-3 text-muted-foreground shrink-0" />
      <span className="text-foreground text-xs flex-1">{label}</span>
      <span className="text-muted-foreground text-xs tabular-nums">
        {count}
      </span>
    </div>
  );
}

function LegendPanel({
  visited,
  livedIn,
  wishlisted,
}: { visited: number; livedIn: number; wishlisted: number }) {
  return (
    <div
      data-ocid="globe.legend_panel"
      className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 space-y-2 min-w-[165px] z-20"
    >
      <p className="text-muted-foreground uppercase tracking-widest text-[9px] font-display mb-3">
        Legend
      </p>
      <LegendRow color="#e8a830" icon={Eye} label="Visited" count={visited} />
      <LegendRow color="#38c5b0" icon={Home} label="Lived In" count={livedIn} />
      <LegendRow
        color="#d4b44a"
        icon={Heart}
        label="Wishlisted"
        count={wishlisted}
      />
      <p className="text-muted-foreground text-[9px] pt-1 border-t border-border mt-2">
        Drag to rotate · Click marker
      </p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function GlobePage() {
  const { data: countries = [], isLoading } = useListCountries();
  const [hovered, setHovered] = useState<MarkerInfo | null>(null);
  const [selected, setSelected] = useState<MarkerInfo | null>(null);
  const [paused, setPaused] = useState(false);

  const entries = useMemo(
    () =>
      countries.map((c) => ({ code: c.code, status: resolveStatus(c.status) })),
    [countries],
  );

  const counts = useMemo(
    () => ({
      visited: entries.filter((e) => e.status === "visited").length,
      livedIn: entries.filter((e) => e.status === "lived_in").length,
      wishlisted: entries.filter((e) => e.status === "wishlisted").length,
    }),
    [entries],
  );

  const handleHover = useCallback((i: MarkerInfo | null) => setHovered(i), []);
  const handleSelect = useCallback((i: MarkerInfo) => setSelected(i), []);

  return (
    <div
      data-ocid="globe.page"
      className="relative w-full bg-background overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-6 pt-5 pointer-events-none">
        <Globe className="w-5 h-5 text-primary" />
        <h1 className="font-display text-lg font-semibold text-foreground">
          Globe
        </h1>
        <span className="text-muted-foreground text-sm ml-1">
          — {entries.length} countr{entries.length === 1 ? "y" : "ies"} tracked
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="globe.loading_state"
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div className="text-muted-foreground font-display text-sm animate-pulse">
            Loading your travels…
          </div>
        </div>
      )}

      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2.65], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 3]} intensity={0.9} />
        <directionalLight position={[-3, -2, -3]} intensity={0.12} />
        <Suspense fallback={null}>
          <Scene
            entries={entries}
            onHover={handleHover}
            onSelect={handleSelect}
            paused={paused}
          />
        </Suspense>
        <Controls
          onStart={() => setPaused(true)}
          onEnd={() => setPaused(false)}
        />
      </Canvas>

      {/* Overlays */}
      <CountryTooltip info={hovered} />
      <LegendPanel
        visited={counts.visited}
        livedIn={counts.livedIn}
        wishlisted={counts.wishlisted}
      />
      {selected && (
        <SelectedPanel info={selected} onClose={() => setSelected(null)} />
      )}

      {/* Empty state */}
      {!isLoading && entries.length === 0 && (
        <div
          data-ocid="globe.empty_state"
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        >
          <Globe className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="font-display text-foreground text-base font-semibold">
            No countries added yet
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Visit the Home page to start tracking your travels.
          </p>
        </div>
      )}
    </div>
  );
}
