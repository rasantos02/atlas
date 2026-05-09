import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TripPublic {
    id: TripId;
    endDate: bigint;
    countryCode: CountryCode;
    notes?: string;
    startDate: bigint;
}
export interface StateEntryPublic {
    status: TravelStatus;
    code: StateCode;
}
export type CountryCode = string;
export type TripId = bigint;
export interface Stats {
    totalTrips: bigint;
    totalWishlisted: bigint;
    totalDaysAbroad: bigint;
    totalVisited: bigint;
    totalLivedIn: bigint;
}
export type StateCode = string;
export interface CountryEntryPublic {
    status: TravelStatus;
    code: CountryCode;
}
export enum TravelStatus {
    wishlisted = "wishlisted",
    visited = "visited",
    lived_in = "lived_in"
}
export interface backendInterface {
    addTrip(countryCode: CountryCode, startDate: bigint, endDate: bigint, notes: string | null): Promise<TripId>;
    deleteTrip(id: TripId): Promise<boolean>;
    getStats(): Promise<Stats>;
    listCountries(): Promise<Array<CountryEntryPublic>>;
    listStates(): Promise<Array<StateEntryPublic>>;
    listTrips(): Promise<Array<TripPublic>>;
    removeCountry(code: CountryCode): Promise<void>;
    removeState(code: StateCode): Promise<void>;
    setCountry(code: CountryCode, status: TravelStatus): Promise<void>;
    setState(code: StateCode, status: TravelStatus): Promise<void>;
    updateTrip(id: TripId, startDate: bigint, endDate: bigint, notes: string | null): Promise<boolean>;
}
