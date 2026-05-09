import Map "mo:core/Map";
import Types "../types/travel";

module {
  // ── Conversion helpers ───────────────────────────────────────────

  /// Convert an internal (code, status) map entry to the public API type.
  public func toPublicCountry(code : Types.CountryCode, status : Types.TravelStatus) : Types.CountryEntryPublic {
    { code; status };
  };

  /// Convert an internal (code, status) map entry to the public API type.
  public func toPublicState(code : Types.StateCode, status : Types.TravelStatus) : Types.StateEntryPublic {
    { code; status };
  };

  /// Convert an internal Trip record to the public (immutable) API type.
  public func toPublicTrip(t : Types.Trip) : Types.TripPublic {
    {
      id          = t.id;
      countryCode = t.countryCode;
      startDate   = t.startDate;
      endDate     = t.endDate;
      notes       = t.notes;
    };
  };

  /// Duration of a trip in whole days (minimum 1 for same-day trips).
  public func tripDays(trip : Types.Trip) : Nat {
    let diffMs : Int = trip.endDate - trip.startDate;
    if (diffMs <= 0) { 1 }
    else {
      let days = diffMs / (24 * 60 * 60 * 1000);
      if (days < 1) { 1 } else { days.toNat() };
    };
  };

  /// Compute aggregate travel statistics.
  public func computeStats(
    countries : Map.Map<Types.CountryCode, Types.TravelStatus>,
    trips     : Map.Map<Types.TripId, Types.Trip>,
  ) : Types.Stats {
    var totalVisited    : Nat = 0;
    var totalLivedIn    : Nat = 0;
    var totalWishlisted : Nat = 0;

    countries.forEach(func(_code, status) {
      switch (status) {
        case (#visited)    { totalVisited    += 1 };
        case (#lived_in)   { totalLivedIn    += 1 };
        case (#wishlisted) { totalWishlisted += 1 };
      };
    });

    let totalTrips = trips.size();

    let totalDaysAbroad = trips.foldLeft(
      0,
      func(acc : Nat, _id : Types.TripId, trip : Types.Trip) : Nat {
        acc + tripDays(trip);
      },
    );

    {
      totalVisited;
      totalLivedIn;
      totalWishlisted;
      totalTrips;
      totalDaysAbroad;
    };
  };
};
