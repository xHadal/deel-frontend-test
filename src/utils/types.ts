export interface Country {
    altSpellings: string[];
    area: number;
    capital: string[];
    capitalInfo: {
      latlng: number[];
    };
    car: {
      signs: string[];
      side: string;
    };
    cca2: string;
    cca3: string;
    ccn3: string;
    cioc: string;
    coatOfArms: {
      png: string;
      svg: string;
    };
    continents: string[];
    currencies: {
      [key: string]: unknown;
    };
    demonyms: {
      eng: unknown;
      fra: unknown;
    };
    fifa: string;
    flag: string;
    flags: {
      png: string;
      svg: string;
      alt: string;
    };
    gini: {
      [key: string]: number;
    };
    idd: {
      root: string;
      suffixes: string[];
    };
    independent: boolean;
    landlocked: boolean;
    languages: {
      [key: string]: string;
    };
    latlng: number[];
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
    name: {
      common: string;
      official: string;
      nativeName: unknown;
    };
    population: number;
    postalCode: {
      format: string;
      regex: string;
    };
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: {
      [key: string]: unknown;
    };
    unMember: boolean;
  }