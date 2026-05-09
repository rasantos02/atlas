import { TravelStatus, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEYS = {
  countries: ["countries"],
  states: ["states"],
  trips: ["trips"],
  stats: ["stats"],
} as const;

// ─── Read Hooks ─────────────────────────────────────────────────────────────

export function useListCountries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QUERY_KEYS.countries,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCountries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListStates() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QUERY_KEYS.states,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listStates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListTrips() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QUERY_KEYS.trips,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTrips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QUERY_KEYS.stats,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mutation Hooks ──────────────────────────────────────────────────────────

export function useSetCountry() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      code,
      status,
    }: { code: string; status: TravelStatus }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.setCountry(code, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.countries });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.stats });
    },
  });
}

export function useRemoveCountry() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeCountry(code);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.countries });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.stats });
    },
  });
}

export function useSetState() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      code,
      status,
    }: { code: string; status: TravelStatus }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.setState(code, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.states });
    },
  });
}

export function useRemoveState() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeState(code);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.states });
    },
  });
}

export function useAddTrip() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      countryCode,
      startDate,
      endDate,
      notes,
    }: {
      countryCode: string;
      startDate: bigint;
      endDate: bigint;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addTrip(countryCode, startDate, endDate, notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.trips });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.stats });
    },
  });
}

export function useUpdateTrip() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      startDate,
      endDate,
      notes,
    }: {
      id: bigint;
      startDate: bigint;
      endDate: bigint;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateTrip(id, startDate, endDate, notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.trips });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.stats });
    },
  });
}

export function useDeleteTrip() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteTrip(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.trips });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.stats });
    },
  });
}

export { TravelStatus };
