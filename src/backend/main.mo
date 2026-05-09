import Map "mo:core/Map";
import Types "types/travel";
import TravelApi "mixins/travel-api";

actor {
  let countries = Map.empty<Types.CountryCode, Types.TravelStatus>();
  let states    = Map.empty<Types.StateCode, Types.TravelStatus>();
  let trips     = Map.empty<Types.TripId, Types.Trip>();
  let state     = { var nextTripId : Nat = 0 };

  include TravelApi(countries, states, trips, state);
};
