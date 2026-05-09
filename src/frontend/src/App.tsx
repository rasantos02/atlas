import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const GlobePage = lazy(() => import("@/pages/GlobePage"));
const StatesPage = lazy(() => import("@/pages/StatesPage"));
const TimelinePage = lazy(() => import("@/pages/TimelinePage"));
const ExplorePage = lazy(() => import("@/pages/ExplorePage"));

function PageFallback() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-48" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list, order never changes
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});
const globeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/globe",
  component: () => <GlobePage />,
});
const statesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/states",
  component: () => <StatesPage />,
});
const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline",
  component: () => <TimelinePage />,
});
const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: () => <ExplorePage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  globeRoute,
  statesRoute,
  timelineRoute,
  exploreRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
