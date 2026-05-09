const COUNTRIES = [
  {
    iso2: "AF",
    name: "Afghanistan",
    flag: "🇦🇫",
    capital: "Kabul",
    currency: "AFN",
    language: "Dari/Pashto",
    population: 41128771,
    continent: "Asia"
  },
  {
    iso2: "AL",
    name: "Albania",
    flag: "🇦🇱",
    capital: "Tirana",
    currency: "ALL",
    language: "Albanian",
    population: 2877800,
    continent: "Europe"
  },
  {
    iso2: "DZ",
    name: "Algeria",
    flag: "🇩🇿",
    capital: "Algiers",
    currency: "DZD",
    language: "Arabic",
    population: 447e5,
    continent: "Africa"
  },
  {
    iso2: "AD",
    name: "Andorra",
    flag: "🇦🇩",
    capital: "Andorra la Vella",
    currency: "EUR",
    language: "Catalan",
    population: 77543,
    continent: "Europe"
  },
  {
    iso2: "AO",
    name: "Angola",
    flag: "🇦🇴",
    capital: "Luanda",
    currency: "AOA",
    language: "Portuguese",
    population: 34503774,
    continent: "Africa"
  },
  {
    iso2: "AG",
    name: "Antigua & Barbuda",
    flag: "🇦🇬",
    capital: "St. John's",
    currency: "XCD",
    language: "English",
    population: 97929,
    continent: "North America"
  },
  {
    iso2: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    capital: "Buenos Aires",
    currency: "ARS",
    language: "Spanish",
    population: 45376763,
    continent: "South America"
  },
  {
    iso2: "AM",
    name: "Armenia",
    flag: "🇦🇲",
    capital: "Yerevan",
    currency: "AMD",
    language: "Armenian",
    population: 2963243,
    continent: "Asia"
  },
  {
    iso2: "AU",
    name: "Australia",
    flag: "🇦🇺",
    capital: "Canberra",
    currency: "AUD",
    language: "English",
    population: 25921e3,
    continent: "Oceania"
  },
  {
    iso2: "AT",
    name: "Austria",
    flag: "🇦🇹",
    capital: "Vienna",
    currency: "EUR",
    language: "German",
    population: 9006398,
    continent: "Europe"
  },
  {
    iso2: "AZ",
    name: "Azerbaijan",
    flag: "🇦🇿",
    capital: "Baku",
    currency: "AZN",
    language: "Azerbaijani",
    population: 10139177,
    continent: "Asia"
  },
  {
    iso2: "BS",
    name: "Bahamas",
    flag: "🇧🇸",
    capital: "Nassau",
    currency: "BSD",
    language: "English",
    population: 393244,
    continent: "North America"
  },
  {
    iso2: "BH",
    name: "Bahrain",
    flag: "🇧🇭",
    capital: "Manama",
    currency: "BHD",
    language: "Arabic",
    population: 1463265,
    continent: "Asia"
  },
  {
    iso2: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    capital: "Dhaka",
    currency: "BDT",
    language: "Bengali",
    population: 166303498,
    continent: "Asia"
  },
  {
    iso2: "BB",
    name: "Barbados",
    flag: "🇧🇧",
    capital: "Bridgetown",
    currency: "BBD",
    language: "English",
    population: 287375,
    continent: "North America"
  },
  {
    iso2: "BY",
    name: "Belarus",
    flag: "🇧🇾",
    capital: "Minsk",
    currency: "BYR",
    language: "Belarusian",
    population: 9398861,
    continent: "Europe"
  },
  {
    iso2: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    capital: "Brussels",
    currency: "EUR",
    language: "Dutch/French",
    population: 11555997,
    continent: "Europe"
  },
  {
    iso2: "BZ",
    name: "Belize",
    flag: "🇧🇿",
    capital: "Belmopan",
    currency: "BZD",
    language: "English",
    population: 397628,
    continent: "North America"
  },
  {
    iso2: "BJ",
    name: "Benin",
    flag: "🇧🇯",
    capital: "Porto-Novo",
    currency: "XOF",
    language: "French",
    population: 12123200,
    continent: "Africa"
  },
  {
    iso2: "BT",
    name: "Bhutan",
    flag: "🇧🇹",
    capital: "Thimphu",
    currency: "BTN",
    language: "Dzongkha",
    population: 771608,
    continent: "Asia"
  },
  {
    iso2: "BO",
    name: "Bolivia",
    flag: "🇧🇴",
    capital: "Sucre",
    currency: "BOB",
    language: "Spanish",
    population: 11673029,
    continent: "South America"
  },
  {
    iso2: "BA",
    name: "Bosnia & Herzegovina",
    flag: "🇧🇦",
    capital: "Sarajevo",
    currency: "BAM",
    language: "Bosnian",
    population: 3280819,
    continent: "Europe"
  },
  {
    iso2: "BW",
    name: "Botswana",
    flag: "🇧🇼",
    capital: "Gaborone",
    currency: "BWP",
    language: "English",
    population: 2630296,
    continent: "Africa"
  },
  {
    iso2: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    capital: "Brasília",
    currency: "BRL",
    language: "Portuguese",
    population: 215313498,
    continent: "South America"
  },
  {
    iso2: "BN",
    name: "Brunei",
    flag: "🇧🇳",
    capital: "Bandar Seri Begawan",
    currency: "BND",
    language: "Malay",
    population: 441600,
    continent: "Asia"
  },
  {
    iso2: "BG",
    name: "Bulgaria",
    flag: "🇧🇬",
    capital: "Sofia",
    currency: "BGN",
    language: "Bulgarian",
    population: 6520314,
    continent: "Europe"
  },
  {
    iso2: "BF",
    name: "Burkina Faso",
    flag: "🇧🇫",
    capital: "Ouagadougou",
    currency: "XOF",
    language: "French",
    population: 21510181,
    continent: "Africa"
  },
  {
    iso2: "BI",
    name: "Burundi",
    flag: "🇧🇮",
    capital: "Gitega",
    currency: "BIF",
    language: "Kirundi",
    population: 12574571,
    continent: "Africa"
  },
  {
    iso2: "CV",
    name: "Cabo Verde",
    flag: "🇨🇻",
    capital: "Praia",
    currency: "CVE",
    language: "Portuguese",
    population: 555988,
    continent: "Africa"
  },
  {
    iso2: "KH",
    name: "Cambodia",
    flag: "🇰🇭",
    capital: "Phnom Penh",
    currency: "KHR",
    language: "Khmer",
    population: 16713015,
    continent: "Asia"
  },
  {
    iso2: "CM",
    name: "Cameroon",
    flag: "🇨🇲",
    capital: "Yaoundé",
    currency: "XAF",
    language: "French/English",
    population: 27914536,
    continent: "Africa"
  },
  {
    iso2: "CA",
    name: "Canada",
    flag: "🇨🇦",
    capital: "Ottawa",
    currency: "CAD",
    language: "English/French",
    population: 38781292,
    continent: "North America"
  },
  {
    iso2: "CF",
    name: "Central African Republic",
    flag: "🇨🇫",
    capital: "Bangui",
    currency: "XAF",
    language: "French",
    population: 4829767,
    continent: "Africa"
  },
  {
    iso2: "TD",
    name: "Chad",
    flag: "🇹🇩",
    capital: "N'Djamena",
    currency: "XAF",
    language: "French/Arabic",
    population: 17413580,
    continent: "Africa"
  },
  {
    iso2: "CL",
    name: "Chile",
    flag: "🇨🇱",
    capital: "Santiago",
    currency: "CLP",
    language: "Spanish",
    population: 19116201,
    continent: "South America"
  },
  {
    iso2: "CN",
    name: "China",
    flag: "🇨🇳",
    capital: "Beijing",
    currency: "CNY",
    language: "Mandarin",
    population: 14126e5,
    continent: "Asia"
  },
  {
    iso2: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    capital: "Bogotá",
    currency: "COP",
    language: "Spanish",
    population: 51874024,
    continent: "South America"
  },
  {
    iso2: "KM",
    name: "Comoros",
    flag: "🇰🇲",
    capital: "Moroni",
    currency: "KMF",
    language: "Comorian",
    population: 888451,
    continent: "Africa"
  },
  {
    iso2: "CG",
    name: "Congo",
    flag: "🇨🇬",
    capital: "Brazzaville",
    currency: "XAF",
    language: "French",
    population: 5835806,
    continent: "Africa"
  },
  {
    iso2: "CD",
    name: "DR Congo",
    flag: "🇨🇩",
    capital: "Kinshasa",
    currency: "CDF",
    language: "French",
    population: 99010212,
    continent: "Africa"
  },
  {
    iso2: "CR",
    name: "Costa Rica",
    flag: "🇨🇷",
    capital: "San José",
    currency: "CRC",
    language: "Spanish",
    population: 5213374,
    continent: "North America"
  },
  {
    iso2: "CI",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    capital: "Yamoussoukro",
    currency: "XOF",
    language: "French",
    population: 27478249,
    continent: "Africa"
  },
  {
    iso2: "HR",
    name: "Croatia",
    flag: "🇭🇷",
    capital: "Zagreb",
    currency: "EUR",
    language: "Croatian",
    population: 3888529,
    continent: "Europe"
  },
  {
    iso2: "CU",
    name: "Cuba",
    flag: "🇨🇺",
    capital: "Havana",
    currency: "CUP",
    language: "Spanish",
    population: 11256372,
    continent: "North America"
  },
  {
    iso2: "CY",
    name: "Cyprus",
    flag: "🇨🇾",
    capital: "Nicosia",
    currency: "EUR",
    language: "Greek",
    population: 1244188,
    continent: "Europe"
  },
  {
    iso2: "CZ",
    name: "Czech Republic",
    flag: "🇨🇿",
    capital: "Prague",
    currency: "CZK",
    language: "Czech",
    population: 10900555,
    continent: "Europe"
  },
  {
    iso2: "DK",
    name: "Denmark",
    flag: "🇩🇰",
    capital: "Copenhagen",
    currency: "DKK",
    language: "Danish",
    population: 5910913,
    continent: "Europe"
  },
  {
    iso2: "DJ",
    name: "Djibouti",
    flag: "🇩🇯",
    capital: "Djibouti",
    currency: "DJF",
    language: "French/Arabic",
    population: 1105557,
    continent: "Africa"
  },
  {
    iso2: "DM",
    name: "Dominica",
    flag: "🇩🇲",
    capital: "Roseau",
    currency: "XCD",
    language: "English",
    population: 72737,
    continent: "North America"
  },
  {
    iso2: "DO",
    name: "Dominican Republic",
    flag: "🇩🇴",
    capital: "Santo Domingo",
    currency: "DOP",
    language: "Spanish",
    population: 10953703,
    continent: "North America"
  },
  {
    iso2: "EC",
    name: "Ecuador",
    flag: "🇪🇨",
    capital: "Quito",
    currency: "USD",
    language: "Spanish",
    population: 18001e3,
    continent: "South America"
  },
  {
    iso2: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    capital: "Cairo",
    currency: "EGP",
    language: "Arabic",
    population: 104258327,
    continent: "Africa"
  },
  {
    iso2: "SV",
    name: "El Salvador",
    flag: "🇸🇻",
    capital: "San Salvador",
    currency: "USD",
    language: "Spanish",
    population: 6314167,
    continent: "North America"
  },
  {
    iso2: "GQ",
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    capital: "Malabo",
    currency: "XAF",
    language: "Spanish",
    population: 1468777,
    continent: "Africa"
  },
  {
    iso2: "ER",
    name: "Eritrea",
    flag: "🇪🇷",
    capital: "Asmara",
    currency: "ERN",
    language: "Tigrinya",
    population: 3228180,
    continent: "Africa"
  },
  {
    iso2: "EE",
    name: "Estonia",
    flag: "🇪🇪",
    capital: "Tallinn",
    currency: "EUR",
    language: "Estonian",
    population: 1331057,
    continent: "Europe"
  },
  {
    iso2: "SZ",
    name: "Eswatini",
    flag: "🇸🇿",
    capital: "Mbabane",
    currency: "SZL",
    language: "Swati",
    population: 1172e3,
    continent: "Africa"
  },
  {
    iso2: "ET",
    name: "Ethiopia",
    flag: "🇪🇹",
    capital: "Addis Ababa",
    currency: "ETB",
    language: "Amharic",
    population: 120812698,
    continent: "Africa"
  },
  {
    iso2: "FJ",
    name: "Fiji",
    flag: "🇫🇯",
    capital: "Suva",
    currency: "FJD",
    language: "English",
    population: 930478,
    continent: "Oceania"
  },
  {
    iso2: "FI",
    name: "Finland",
    flag: "🇫🇮",
    capital: "Helsinki",
    currency: "EUR",
    language: "Finnish",
    population: 5548241,
    continent: "Europe"
  },
  {
    iso2: "FR",
    name: "France",
    flag: "🇫🇷",
    capital: "Paris",
    currency: "EUR",
    language: "French",
    population: 68042591,
    continent: "Europe"
  },
  {
    iso2: "GA",
    name: "Gabon",
    flag: "🇬🇦",
    capital: "Libreville",
    currency: "XAF",
    language: "French",
    population: 2278825,
    continent: "Africa"
  },
  {
    iso2: "GM",
    name: "Gambia",
    flag: "🇬🇲",
    capital: "Banjul",
    currency: "GMD",
    language: "English",
    population: 2705992,
    continent: "Africa"
  },
  {
    iso2: "GE",
    name: "Georgia",
    flag: "🇬🇪",
    capital: "Tbilisi",
    currency: "GEL",
    language: "Georgian",
    population: 3728573,
    continent: "Asia"
  },
  {
    iso2: "DE",
    name: "Germany",
    flag: "🇩🇪",
    capital: "Berlin",
    currency: "EUR",
    language: "German",
    population: 84607016,
    continent: "Europe"
  },
  {
    iso2: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    capital: "Accra",
    currency: "GHS",
    language: "English",
    population: 33475870,
    continent: "Africa"
  },
  {
    iso2: "GR",
    name: "Greece",
    flag: "🇬🇷",
    capital: "Athens",
    currency: "EUR",
    language: "Greek",
    population: 10482487,
    continent: "Europe"
  },
  {
    iso2: "GD",
    name: "Grenada",
    flag: "🇬🇩",
    capital: "St. George's",
    currency: "XCD",
    language: "English",
    population: 124610,
    continent: "North America"
  },
  {
    iso2: "GT",
    name: "Guatemala",
    flag: "🇬🇹",
    capital: "Guatemala City",
    currency: "GTQ",
    language: "Spanish",
    population: 17357886,
    continent: "North America"
  },
  {
    iso2: "GN",
    name: "Guinea",
    flag: "🇬🇳",
    capital: "Conakry",
    currency: "GNF",
    language: "French",
    population: 13531906,
    continent: "Africa"
  },
  {
    iso2: "GW",
    name: "Guinea-Bissau",
    flag: "🇬🇼",
    capital: "Bissau",
    currency: "XOF",
    language: "Portuguese",
    population: 2026778,
    continent: "Africa"
  },
  {
    iso2: "GY",
    name: "Guyana",
    flag: "🇬🇾",
    capital: "Georgetown",
    currency: "GYD",
    language: "English",
    population: 786559,
    continent: "South America"
  },
  {
    iso2: "HT",
    name: "Haiti",
    flag: "🇭🇹",
    capital: "Port-au-Prince",
    currency: "HTG",
    language: "French/Haitian Creole",
    population: 11447569,
    continent: "North America"
  },
  {
    iso2: "HN",
    name: "Honduras",
    flag: "🇭🇳",
    capital: "Tegucigalpa",
    currency: "HNL",
    language: "Spanish",
    population: 10278345,
    continent: "North America"
  },
  {
    iso2: "HU",
    name: "Hungary",
    flag: "🇭🇺",
    capital: "Budapest",
    currency: "HUF",
    language: "Hungarian",
    population: 9689010,
    continent: "Europe"
  },
  {
    iso2: "IS",
    name: "Iceland",
    flag: "🇮🇸",
    capital: "Reykjavík",
    currency: "ISK",
    language: "Icelandic",
    population: 376248,
    continent: "Europe"
  },
  {
    iso2: "IN",
    name: "India",
    flag: "🇮🇳",
    capital: "New Delhi",
    currency: "INR",
    language: "Hindi/English",
    population: 1417173173,
    continent: "Asia"
  },
  {
    iso2: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    capital: "Jakarta",
    currency: "IDR",
    language: "Indonesian",
    population: 275501339,
    continent: "Asia"
  },
  {
    iso2: "IR",
    name: "Iran",
    flag: "🇮🇷",
    capital: "Tehran",
    currency: "IRR",
    language: "Persian",
    population: 87590873,
    continent: "Asia"
  },
  {
    iso2: "IQ",
    name: "Iraq",
    flag: "🇮🇶",
    capital: "Baghdad",
    currency: "IQD",
    language: "Arabic",
    population: 42164965,
    continent: "Asia"
  },
  {
    iso2: "IE",
    name: "Ireland",
    flag: "🇮🇪",
    capital: "Dublin",
    currency: "EUR",
    language: "Irish/English",
    population: 5123536,
    continent: "Europe"
  },
  {
    iso2: "IL",
    name: "Israel",
    flag: "🇮🇱",
    capital: "Jerusalem",
    currency: "ILS",
    language: "Hebrew",
    population: 9449e3,
    continent: "Asia"
  },
  {
    iso2: "IT",
    name: "Italy",
    flag: "🇮🇹",
    capital: "Rome",
    currency: "EUR",
    language: "Italian",
    population: 59030133,
    continent: "Europe"
  },
  {
    iso2: "JM",
    name: "Jamaica",
    flag: "🇯🇲",
    capital: "Kingston",
    currency: "JMD",
    language: "English",
    population: 2827695,
    continent: "North America"
  },
  {
    iso2: "JP",
    name: "Japan",
    flag: "🇯🇵",
    capital: "Tokyo",
    currency: "JPY",
    language: "Japanese",
    population: 1257e5,
    continent: "Asia"
  },
  {
    iso2: "JO",
    name: "Jordan",
    flag: "🇯🇴",
    capital: "Amman",
    currency: "JOD",
    language: "Arabic",
    population: 10203140,
    continent: "Asia"
  },
  {
    iso2: "KZ",
    name: "Kazakhstan",
    flag: "🇰🇿",
    capital: "Nur-Sultan",
    currency: "KZT",
    language: "Kazakh",
    population: 19e6,
    continent: "Asia"
  },
  {
    iso2: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    capital: "Nairobi",
    currency: "KES",
    language: "Swahili/English",
    population: 54027487,
    continent: "Africa"
  },
  {
    iso2: "KI",
    name: "Kiribati",
    flag: "🇰🇮",
    capital: "South Tarawa",
    currency: "AUD",
    language: "English",
    population: 119446,
    continent: "Oceania"
  },
  {
    iso2: "KW",
    name: "Kuwait",
    flag: "🇰🇼",
    capital: "Kuwait City",
    currency: "KWD",
    language: "Arabic",
    population: 4294621,
    continent: "Asia"
  },
  {
    iso2: "KG",
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    capital: "Bishkek",
    currency: "KGS",
    language: "Kyrgyz",
    population: 6697e3,
    continent: "Asia"
  },
  {
    iso2: "LA",
    name: "Laos",
    flag: "🇱🇦",
    capital: "Vientiane",
    currency: "LAK",
    language: "Lao",
    population: 7379358,
    continent: "Asia"
  },
  {
    iso2: "LV",
    name: "Latvia",
    flag: "🇱🇻",
    capital: "Riga",
    currency: "EUR",
    language: "Latvian",
    population: 1830211,
    continent: "Europe"
  },
  {
    iso2: "LB",
    name: "Lebanon",
    flag: "🇱🇧",
    capital: "Beirut",
    currency: "LBP",
    language: "Arabic",
    population: 5489739,
    continent: "Asia"
  },
  {
    iso2: "LS",
    name: "Lesotho",
    flag: "🇱🇸",
    capital: "Maseru",
    currency: "LSL",
    language: "Sesotho",
    population: 2142249,
    continent: "Africa"
  },
  {
    iso2: "LR",
    name: "Liberia",
    flag: "🇱🇷",
    capital: "Monrovia",
    currency: "LRD",
    language: "English",
    population: 5302681,
    continent: "Africa"
  },
  {
    iso2: "LY",
    name: "Libya",
    flag: "🇱🇾",
    capital: "Tripoli",
    currency: "LYD",
    language: "Arabic",
    population: 6959e3,
    continent: "Africa"
  },
  {
    iso2: "LI",
    name: "Liechtenstein",
    flag: "🇱🇮",
    capital: "Vaduz",
    currency: "CHF",
    language: "German",
    population: 38896,
    continent: "Europe"
  },
  {
    iso2: "LT",
    name: "Lithuania",
    flag: "🇱🇹",
    capital: "Vilnius",
    currency: "EUR",
    language: "Lithuanian",
    population: 2794090,
    continent: "Europe"
  },
  {
    iso2: "LU",
    name: "Luxembourg",
    flag: "🇱🇺",
    capital: "Luxembourg City",
    currency: "EUR",
    language: "Luxembourgish",
    population: 660809,
    continent: "Europe"
  },
  {
    iso2: "MG",
    name: "Madagascar",
    flag: "🇲🇬",
    capital: "Antananarivo",
    currency: "MGA",
    language: "Malagasy/French",
    population: 28915653,
    continent: "Africa"
  },
  {
    iso2: "MW",
    name: "Malawi",
    flag: "🇲🇼",
    capital: "Lilongwe",
    currency: "MWK",
    language: "English",
    population: 19889742,
    continent: "Africa"
  },
  {
    iso2: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    capital: "Kuala Lumpur",
    currency: "MYR",
    language: "Malay",
    population: 332e5,
    continent: "Asia"
  },
  {
    iso2: "MV",
    name: "Maldives",
    flag: "🇲🇻",
    capital: "Malé",
    currency: "MVR",
    language: "Dhivehi",
    population: 540544,
    continent: "Asia"
  },
  {
    iso2: "ML",
    name: "Mali",
    flag: "🇲🇱",
    capital: "Bamako",
    currency: "XOF",
    language: "French",
    population: 22395489,
    continent: "Africa"
  },
  {
    iso2: "MT",
    name: "Malta",
    flag: "🇲🇹",
    capital: "Valletta",
    currency: "EUR",
    language: "Maltese/English",
    population: 519562,
    continent: "Europe"
  },
  {
    iso2: "MH",
    name: "Marshall Islands",
    flag: "🇲🇭",
    capital: "Majuro",
    currency: "USD",
    language: "Marshallese",
    population: 42050,
    continent: "Oceania"
  },
  {
    iso2: "MR",
    name: "Mauritania",
    flag: "🇲🇷",
    capital: "Nouakchott",
    currency: "MRU",
    language: "Arabic",
    population: 4614974,
    continent: "Africa"
  },
  {
    iso2: "MU",
    name: "Mauritius",
    flag: "🇲🇺",
    capital: "Port Louis",
    currency: "MUR",
    language: "English",
    population: 1266303,
    continent: "Africa"
  },
  {
    iso2: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    capital: "Mexico City",
    currency: "MXN",
    language: "Spanish",
    population: 130262216,
    continent: "North America"
  },
  {
    iso2: "FM",
    name: "Micronesia",
    flag: "🇫🇲",
    capital: "Palikir",
    currency: "USD",
    language: "English",
    population: 115023,
    continent: "Oceania"
  },
  {
    iso2: "MD",
    name: "Moldova",
    flag: "🇲🇩",
    capital: "Chișinău",
    currency: "MDL",
    language: "Romanian",
    population: 2597100,
    continent: "Europe"
  },
  {
    iso2: "MC",
    name: "Monaco",
    flag: "🇲🇨",
    capital: "Monaco",
    currency: "EUR",
    language: "French",
    population: 39244,
    continent: "Europe"
  },
  {
    iso2: "MN",
    name: "Mongolia",
    flag: "🇲🇳",
    capital: "Ulaanbaatar",
    currency: "MNT",
    language: "Mongolian",
    population: 3278292,
    continent: "Asia"
  },
  {
    iso2: "ME",
    name: "Montenegro",
    flag: "🇲🇪",
    capital: "Podgorica",
    currency: "EUR",
    language: "Montenegrin",
    population: 621306,
    continent: "Europe"
  },
  {
    iso2: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    capital: "Rabat",
    currency: "MAD",
    language: "Arabic",
    population: 37840044,
    continent: "Africa"
  },
  {
    iso2: "MZ",
    name: "Mozambique",
    flag: "🇲🇿",
    capital: "Maputo",
    currency: "MZN",
    language: "Portuguese",
    population: 32790338,
    continent: "Africa"
  },
  {
    iso2: "MM",
    name: "Myanmar",
    flag: "🇲🇲",
    capital: "Naypyidaw",
    currency: "MMK",
    language: "Burmese",
    population: 54409800,
    continent: "Asia"
  },
  {
    iso2: "NA",
    name: "Namibia",
    flag: "🇳🇦",
    capital: "Windhoek",
    currency: "NAD",
    language: "English",
    population: 2550226,
    continent: "Africa"
  },
  {
    iso2: "NR",
    name: "Nauru",
    flag: "🇳🇷",
    capital: "Yaren",
    currency: "AUD",
    language: "Nauruan",
    population: 10824,
    continent: "Oceania"
  },
  {
    iso2: "NP",
    name: "Nepal",
    flag: "🇳🇵",
    capital: "Kathmandu",
    currency: "NPR",
    language: "Nepali",
    population: 29136808,
    continent: "Asia"
  },
  {
    iso2: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    capital: "Amsterdam",
    currency: "EUR",
    language: "Dutch",
    population: 17590672,
    continent: "Europe"
  },
  {
    iso2: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    capital: "Wellington",
    currency: "NZD",
    language: "English",
    population: 5123e3,
    continent: "Oceania"
  },
  {
    iso2: "NI",
    name: "Nicaragua",
    flag: "🇳🇮",
    capital: "Managua",
    currency: "NIO",
    language: "Spanish",
    population: 6850540,
    continent: "North America"
  },
  {
    iso2: "NE",
    name: "Niger",
    flag: "🇳🇪",
    capital: "Niamey",
    currency: "XOF",
    language: "French",
    population: 25252722,
    continent: "Africa"
  },
  {
    iso2: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    capital: "Abuja",
    currency: "NGN",
    language: "English",
    population: 218541212,
    continent: "Africa"
  },
  {
    iso2: "KP",
    name: "North Korea",
    flag: "🇰🇵",
    capital: "Pyongyang",
    currency: "KPW",
    language: "Korean",
    population: 25971909,
    continent: "Asia"
  },
  {
    iso2: "MK",
    name: "North Macedonia",
    flag: "🇲🇰",
    capital: "Skopje",
    currency: "MKD",
    language: "Macedonian",
    population: 2077132,
    continent: "Europe"
  },
  {
    iso2: "NO",
    name: "Norway",
    flag: "🇳🇴",
    capital: "Oslo",
    currency: "NOK",
    language: "Norwegian",
    population: 5425270,
    continent: "Europe"
  },
  {
    iso2: "OM",
    name: "Oman",
    flag: "🇴🇲",
    capital: "Muscat",
    currency: "OMR",
    language: "Arabic",
    population: 4520471,
    continent: "Asia"
  },
  {
    iso2: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    capital: "Islamabad",
    currency: "PKR",
    language: "Urdu",
    population: 231402117,
    continent: "Asia"
  },
  {
    iso2: "PW",
    name: "Palau",
    flag: "🇵🇼",
    capital: "Ngerulmud",
    currency: "USD",
    language: "Palauan",
    population: 17972,
    continent: "Oceania"
  },
  {
    iso2: "PA",
    name: "Panama",
    flag: "🇵🇦",
    capital: "Panama City",
    currency: "PAB",
    language: "Spanish",
    population: 4351267,
    continent: "North America"
  },
  {
    iso2: "PG",
    name: "Papua New Guinea",
    flag: "🇵🇬",
    capital: "Port Moresby",
    currency: "PGK",
    language: "English",
    population: 10142619,
    continent: "Oceania"
  },
  {
    iso2: "PY",
    name: "Paraguay",
    flag: "🇵🇾",
    capital: "Asunción",
    currency: "PYG",
    language: "Spanish",
    population: 7356e3,
    continent: "South America"
  },
  {
    iso2: "PE",
    name: "Peru",
    flag: "🇵🇪",
    capital: "Lima",
    currency: "PEN",
    language: "Spanish",
    population: 33359418,
    continent: "South America"
  },
  {
    iso2: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    capital: "Manila",
    currency: "PHP",
    language: "Filipino/English",
    population: 113880328,
    continent: "Asia"
  },
  {
    iso2: "PL",
    name: "Poland",
    flag: "🇵🇱",
    capital: "Warsaw",
    currency: "PLN",
    language: "Polish",
    population: 37654247,
    continent: "Europe"
  },
  {
    iso2: "PT",
    name: "Portugal",
    flag: "🇵🇹",
    capital: "Lisbon",
    currency: "EUR",
    language: "Portuguese",
    population: 10343066,
    continent: "Europe"
  },
  {
    iso2: "QA",
    name: "Qatar",
    flag: "🇶🇦",
    capital: "Doha",
    currency: "QAR",
    language: "Arabic",
    population: 2688235,
    continent: "Asia"
  },
  {
    iso2: "RO",
    name: "Romania",
    flag: "🇷🇴",
    capital: "Bucharest",
    currency: "RON",
    language: "Romanian",
    population: 19038e3,
    continent: "Europe"
  },
  {
    iso2: "RU",
    name: "Russia",
    flag: "🇷🇺",
    capital: "Moscow",
    currency: "RUB",
    language: "Russian",
    population: 143826130,
    continent: "Europe"
  },
  {
    iso2: "RW",
    name: "Rwanda",
    flag: "🇷🇼",
    capital: "Kigali",
    currency: "RWF",
    language: "Kinyarwanda",
    population: 13461888,
    continent: "Africa"
  },
  {
    iso2: "KN",
    name: "Saint Kitts & Nevis",
    flag: "🇰🇳",
    capital: "Basseterre",
    currency: "XCD",
    language: "English",
    population: 53544,
    continent: "North America"
  },
  {
    iso2: "LC",
    name: "Saint Lucia",
    flag: "🇱🇨",
    capital: "Castries",
    currency: "XCD",
    language: "English",
    population: 179857,
    continent: "North America"
  },
  {
    iso2: "VC",
    name: "Saint Vincent & Grenadines",
    flag: "🇻🇨",
    capital: "Kingstown",
    currency: "XCD",
    language: "English",
    population: 110940,
    continent: "North America"
  },
  {
    iso2: "WS",
    name: "Samoa",
    flag: "🇼🇸",
    capital: "Apia",
    currency: "WST",
    language: "Samoan",
    population: 222382,
    continent: "Oceania"
  },
  {
    iso2: "SM",
    name: "San Marino",
    flag: "🇸🇲",
    capital: "San Marino",
    currency: "EUR",
    language: "Italian",
    population: 34010,
    continent: "Europe"
  },
  {
    iso2: "ST",
    name: "São Tomé & Príncipe",
    flag: "🇸🇹",
    capital: "São Tomé",
    currency: "STN",
    language: "Portuguese",
    population: 223107,
    continent: "Africa"
  },
  {
    iso2: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    capital: "Riyadh",
    currency: "SAR",
    language: "Arabic",
    population: 35013414,
    continent: "Asia"
  },
  {
    iso2: "SN",
    name: "Senegal",
    flag: "🇸🇳",
    capital: "Dakar",
    currency: "XOF",
    language: "French",
    population: 17763163,
    continent: "Africa"
  },
  {
    iso2: "RS",
    name: "Serbia",
    flag: "🇷🇸",
    capital: "Belgrade",
    currency: "RSD",
    language: "Serbian",
    population: 6871547,
    continent: "Europe"
  },
  {
    iso2: "SC",
    name: "Seychelles",
    flag: "🇸🇨",
    capital: "Victoria",
    currency: "SCR",
    language: "Seychellois Creole",
    population: 98908,
    continent: "Africa"
  },
  {
    iso2: "SL",
    name: "Sierra Leone",
    flag: "🇸🇱",
    capital: "Freetown",
    currency: "SLL",
    language: "English",
    population: 8420661,
    continent: "Africa"
  },
  {
    iso2: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    capital: "Singapore",
    currency: "SGD",
    language: "English/Malay",
    population: 5637022,
    continent: "Asia"
  },
  {
    iso2: "SK",
    name: "Slovakia",
    flag: "🇸🇰",
    capital: "Bratislava",
    currency: "EUR",
    language: "Slovak",
    population: 5460185,
    continent: "Europe"
  },
  {
    iso2: "SI",
    name: "Slovenia",
    flag: "🇸🇮",
    capital: "Ljubljana",
    currency: "EUR",
    language: "Slovenian",
    population: 2108977,
    continent: "Europe"
  },
  {
    iso2: "SB",
    name: "Solomon Islands",
    flag: "🇸🇧",
    capital: "Honiara",
    currency: "SBD",
    language: "English",
    population: 720474,
    continent: "Oceania"
  },
  {
    iso2: "SO",
    name: "Somalia",
    flag: "🇸🇴",
    capital: "Mogadishu",
    currency: "SOS",
    language: "Somali",
    population: 17065581,
    continent: "Africa"
  },
  {
    iso2: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    capital: "Pretoria",
    currency: "ZAR",
    language: "Zulu/Xhosa/Afrikaans",
    population: 60142978,
    continent: "Africa"
  },
  {
    iso2: "SS",
    name: "South Sudan",
    flag: "🇸🇸",
    capital: "Juba",
    currency: "SSP",
    language: "English",
    population: 10913164,
    continent: "Africa"
  },
  {
    iso2: "ES",
    name: "Spain",
    flag: "🇪🇸",
    capital: "Madrid",
    currency: "EUR",
    language: "Spanish",
    population: 47415750,
    continent: "Europe"
  },
  {
    iso2: "LK",
    name: "Sri Lanka",
    flag: "🇱🇰",
    capital: "Colombo",
    currency: "LKR",
    language: "Sinhala/Tamil",
    population: 22156e3,
    continent: "Asia"
  },
  {
    iso2: "SD",
    name: "Sudan",
    flag: "🇸🇩",
    capital: "Khartoum",
    currency: "SDG",
    language: "Arabic",
    population: 46874204,
    continent: "Africa"
  },
  {
    iso2: "SR",
    name: "Suriname",
    flag: "🇸🇷",
    capital: "Paramaribo",
    currency: "SRD",
    language: "Dutch",
    population: 618040,
    continent: "South America"
  },
  {
    iso2: "SE",
    name: "Sweden",
    flag: "🇸🇪",
    capital: "Stockholm",
    currency: "SEK",
    language: "Swedish",
    population: 10551707,
    continent: "Europe"
  },
  {
    iso2: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    capital: "Bern",
    currency: "CHF",
    language: "German/French",
    population: 8738791,
    continent: "Europe"
  },
  {
    iso2: "SY",
    name: "Syria",
    flag: "🇸🇾",
    capital: "Damascus",
    currency: "SYP",
    language: "Arabic",
    population: 21324e3,
    continent: "Asia"
  },
  {
    iso2: "TW",
    name: "Taiwan",
    flag: "🇹🇼",
    capital: "Taipei",
    currency: "TWD",
    language: "Mandarin",
    population: 2357e4,
    continent: "Asia"
  },
  {
    iso2: "TJ",
    name: "Tajikistan",
    flag: "🇹🇯",
    capital: "Dushanbe",
    currency: "TJS",
    language: "Tajik",
    population: 99e5,
    continent: "Asia"
  },
  {
    iso2: "TZ",
    name: "Tanzania",
    flag: "🇹🇿",
    capital: "Dodoma",
    currency: "TZS",
    language: "Swahili",
    population: 63298550,
    continent: "Africa"
  },
  {
    iso2: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    capital: "Bangkok",
    currency: "THB",
    language: "Thai",
    population: 71697030,
    continent: "Asia"
  },
  {
    iso2: "TL",
    name: "Timor-Leste",
    flag: "🇹🇱",
    capital: "Dili",
    currency: "USD",
    language: "Tetum/Portuguese",
    population: 1321929,
    continent: "Asia"
  },
  {
    iso2: "TG",
    name: "Togo",
    flag: "🇹🇬",
    capital: "Lomé",
    currency: "XOF",
    language: "French",
    population: 8848699,
    continent: "Africa"
  },
  {
    iso2: "TO",
    name: "Tonga",
    flag: "🇹🇴",
    capital: "Nukuʻalofa",
    currency: "TOP",
    language: "Tongan",
    population: 99532,
    continent: "Oceania"
  },
  {
    iso2: "TT",
    name: "Trinidad & Tobago",
    flag: "🇹🇹",
    capital: "Port of Spain",
    currency: "TTD",
    language: "English",
    population: 1403375,
    continent: "North America"
  },
  {
    iso2: "TN",
    name: "Tunisia",
    flag: "🇹🇳",
    capital: "Tunis",
    currency: "TND",
    language: "Arabic",
    population: 11935766,
    continent: "Africa"
  },
  {
    iso2: "TR",
    name: "Turkey",
    flag: "🇹🇷",
    capital: "Ankara",
    currency: "TRY",
    language: "Turkish",
    population: 85279553,
    continent: "Asia"
  },
  {
    iso2: "TM",
    name: "Turkmenistan",
    flag: "🇹🇲",
    capital: "Ashgabat",
    currency: "TMT",
    language: "Turkmen",
    population: 6117924,
    continent: "Asia"
  },
  {
    iso2: "TV",
    name: "Tuvalu",
    flag: "🇹🇻",
    capital: "Funafuti",
    currency: "AUD",
    language: "Tuvalu",
    population: 11792,
    continent: "Oceania"
  },
  {
    iso2: "UG",
    name: "Uganda",
    flag: "🇺🇬",
    capital: "Kampala",
    currency: "UGX",
    language: "English",
    population: 47123531,
    continent: "Africa"
  },
  {
    iso2: "UA",
    name: "Ukraine",
    flag: "🇺🇦",
    capital: "Kyiv",
    currency: "UAH",
    language: "Ukrainian",
    population: 41167336,
    continent: "Europe"
  },
  {
    iso2: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    capital: "Abu Dhabi",
    currency: "AED",
    language: "Arabic",
    population: 9890402,
    continent: "Asia"
  },
  {
    iso2: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    capital: "London",
    currency: "GBP",
    language: "English",
    population: 68497907,
    continent: "Europe"
  },
  {
    iso2: "US",
    name: "United States",
    flag: "🇺🇸",
    capital: "Washington D.C.",
    currency: "USD",
    language: "English",
    population: 334914895,
    continent: "North America"
  },
  {
    iso2: "UY",
    name: "Uruguay",
    flag: "🇺🇾",
    capital: "Montevideo",
    currency: "UYU",
    language: "Spanish",
    population: 3544143,
    continent: "South America"
  },
  {
    iso2: "UZ",
    name: "Uzbekistan",
    flag: "🇺🇿",
    capital: "Tashkent",
    currency: "UZS",
    language: "Uzbek",
    population: 353e5,
    continent: "Asia"
  },
  {
    iso2: "VU",
    name: "Vanuatu",
    flag: "🇻🇺",
    capital: "Port Vila",
    currency: "VUV",
    language: "Bislama",
    population: 326740,
    continent: "Oceania"
  },
  {
    iso2: "VE",
    name: "Venezuela",
    flag: "🇻🇪",
    capital: "Caracas",
    currency: "VES",
    language: "Spanish",
    population: 28301696,
    continent: "South America"
  },
  {
    iso2: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    capital: "Hanoi",
    currency: "VND",
    language: "Vietnamese",
    population: 98186989,
    continent: "Asia"
  },
  {
    iso2: "YE",
    name: "Yemen",
    flag: "🇾🇪",
    capital: "Sana'a",
    currency: "YER",
    language: "Arabic",
    population: 33696614,
    continent: "Asia"
  },
  {
    iso2: "ZM",
    name: "Zambia",
    flag: "🇿🇲",
    capital: "Lusaka",
    currency: "ZMW",
    language: "English",
    population: 19473125,
    continent: "Africa"
  },
  {
    iso2: "ZW",
    name: "Zimbabwe",
    flag: "🇿🇼",
    capital: "Harare",
    currency: "ZWL",
    language: "English",
    population: 15092171,
    continent: "Africa"
  }
];
const COUNTRY_BY_CODE = new Map(
  COUNTRIES.map((c) => [c.iso2, c])
);
const CONTINENTS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Antarctica"
];
const COUNTRIES_PER_CONTINENT = {
  Africa: COUNTRIES.filter((c) => c.continent === "Africa").length,
  Asia: COUNTRIES.filter((c) => c.continent === "Asia").length,
  Europe: COUNTRIES.filter((c) => c.continent === "Europe").length,
  "North America": COUNTRIES.filter((c) => c.continent === "North America").length,
  "South America": COUNTRIES.filter((c) => c.continent === "South America").length,
  Oceania: COUNTRIES.filter((c) => c.continent === "Oceania").length,
  Antarctica: 0
};
export {
  COUNTRY_BY_CODE as C,
  COUNTRIES_PER_CONTINENT as a,
  COUNTRIES as b,
  CONTINENTS as c
};
