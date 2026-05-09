import type {
  CountryEntryPublic,
  StateEntryPublic,
  Stats,
  TripPublic,
} from "@/backend";
import { TravelStatus } from "@/backend";

export type { CountryEntryPublic, StateEntryPublic, TripPublic, Stats };
export { TravelStatus };

export interface CountryMeta {
  iso2: string;
  name: string;
  flag: string;
  capital: string;
  currency: string;
  language: string;
  population: number;
  continent: Continent;
}

export type Continent =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";

export interface ContinentStats {
  continent: Continent;
  total: number;
  visited: number;
  lived: number;
  wishlisted: number;
  percentage: number;
}
