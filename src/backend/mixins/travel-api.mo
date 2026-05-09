import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/travel";
import TravelLib "../lib/travel";
import Int "mo:core/Int";

mixin (
  countries : Map.Map<Types.CountryCode, Types.TravelStatus>,
  states    : Map.Map<Types.StateCode, Types.TravelStatus>,
  trips     : Map.Map<Types.TripId, Types.Trip>,
  state     : { var nextTripId : Nat },
) {
  // ── Countries ────────────────────────────────────────────────────

  /// Upsert a country entry (add or update status).
  public shared func setCountry(code : Types.CountryCode, status : Types.TravelStatus) : async () {
    countries.add(code, status);
  };

  /// Remove a country entry entirely.
  public shared func removeCountry(code : Types.CountryCode) : async () {
    countries.remove(code);
  };

  /// List all tracked countries.
  public query func listCountries() : async [Types.CountryEntryPublic] {
    countries.entries().map<(Types.CountryCode, Types.TravelStatus), Types.CountryEntryPublic>(
      func((code, status)) { TravelLib.toPublicCountry(code, status) }
    ).toArray();
  };

  // ── US States ────────────────────────────────────────────────────

  /// Upsert a US state entry (add or update status).
  public shared func setState(code : Types.StateCode, status : Types.TravelStatus) : async () {
    states.add(code, status);
  };

  /// Remove a US state entry entirely.
  public shared func removeState(code : Types.StateCode) : async () {
    states.remove(code);
  };

  /// List all tracked US states.
  public query func listStates() : async [Types.StateEntryPublic] {
    states.entries().map<(Types.StateCode, Types.TravelStatus), Types.StateEntryPublic>(
      func((code, status)) { TravelLib.toPublicState(code, status) }
    ).toArray();
  };

  // ── Trips ────────────────────────────────────────────────────────

  /// Add a new trip and return the assigned trip ID.
  public shared func addTrip(
    countryCode : Types.CountryCode,
    startDate   : Int,
    endDate     : Int,
    notes       : ?Text,
  ) : async Types.TripId {
    let id = state.nextTripId;
    state.nextTripId += 1;
    let trip : Types.Trip = { id; countryCode; var startDate; var endDate; var notes };
    trips.add(id, trip);
    id;
  };

  /// Update an existing trip's fields.
  public shared func updateTrip(
    id        : Types.TripId,
    startDate : Int,
    endDate   : Int,
    notes     : ?Text,
  ) : async Bool {
    switch (trips.get(id)) {
      case null { false };
      case (?trip) {
        trip.startDate := startDate;
        trip.endDate   := endDate;
        trip.notes     := notes;
        true;
      };
    };
  };

  /// Delete a trip by ID.
  public shared func deleteTrip(id : Types.TripId) : async Bool {
    switch (trips.get(id)) {
      case null { false };
      case (?_) {
        trips.remove(id);
        true;
      };
    };
  };

  /// List all trips, sorted by start date descending.
  public query func listTrips() : async [Types.TripPublic] {
    let arr = trips.values().map(func(t) { TravelLib.toPublicTrip(t) }).toArray(
      
    );
    arr.sort<Types.TripPublic>(func(a, b) { Int.compare(b.startDate, a.startDate) });
  };

  // ── Stats ────────────────────────────────────────────────────────

  /// Aggregate travel statistics.
  public query func getStats() : async Types.Stats {
    TravelLib.computeStats(countries, trips);
  };
};
