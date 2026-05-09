module {
  public type CountryCode = Text; // ISO 3166-1 alpha-2, e.g. "US", "FR"
  public type StateCode = Text;   // US state abbreviation, e.g. "CA", "NY"

  public type TravelStatus = {
    #visited;
    #lived_in;
    #wishlisted;
  };

  public type CountryEntry = {
    code : CountryCode;
    var status : TravelStatus;
  };

  public type StateEntry = {
    code : StateCode;
    var status : TravelStatus;
  };

  public type TripId = Nat;

  public type Trip = {
    id : TripId;
    countryCode : CountryCode;
    var startDate : Int; // Unix epoch milliseconds
    var endDate : Int;   // Unix epoch milliseconds
    var notes : ?Text;
  };

  // Shared (API boundary) versions — no var fields
  public type CountryEntryPublic = {
    code : CountryCode;
    status : TravelStatus;
  };

  public type StateEntryPublic = {
    code : StateCode;
    status : TravelStatus;
  };

  public type TripPublic = {
    id : TripId;
    countryCode : CountryCode;
    startDate : Int;
    endDate : Int;
    notes : ?Text;
  };

  public type Stats = {
    totalVisited : Nat;
    totalLivedIn : Nat;
    totalWishlisted : Nat;
    totalTrips : Nat;
    totalDaysAbroad : Nat;
  };
};
