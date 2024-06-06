/* Interface for woosmap service */
export type TWoosmapService = {
  getLocalitySuggestions: (
    input: string,
    countries?: string[]
  ) => Promise<woosmap.map.localities.LocalitiesAutocompleteResponse>;
};

/* Error from woosmap service */
export class WoosmapError extends Error {
  public constructor(message: string) {
    super();
    this.message = message;
  }
}

export class WoosmapService implements TWoosmapService {
  private apiKey: string;

  public baseApiUrl: string;

  /* Service setup */
  public constructor(woosmapApiKey: string, woosmapBaseApiUrl: string) {
    this.apiKey = woosmapApiKey;
    this.baseApiUrl = woosmapBaseApiUrl;
  }

  /* Locality based autocomplete suggestions */
  async getLocalitySuggestions(
    input: string,
    countries: string[] = ["nl"]
  ): Promise<woosmap.map.localities.LocalitiesAutocompleteResponse> {

    const woosmapComponents = countries
      .map((countryCode) => `country:${countryCode}`)
      .join("|");

    const suggestionQuery = {
      key: this.apiKey,
      input,
      types: "locality|postal_code",
      components: woosmapComponents,
    };

    return $fetch(
      `${this.baseApiUrl}/localities/autocomplete/?${constructQueryString(
        suggestionQuery
      )}`
    );
  }
}


/* To be replaced by QS */
function constructQueryString<T>(params: Record<string, T>): string {
  const queryStringParts: string[] = [];

  for (const key in params) {
    if (params[key]) {
      const value = params[key];
      queryStringParts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  }
  return queryStringParts.join("&");
}

