export class WoosmapService {
  private static apiKey: string;

  public static baseApiUrl: string;

  /* Service setup */
  public init(woosmapApiKey: string, woosmapBaseApiUrl: string) {
    WoosmapService.apiKey = woosmapApiKey;
    WoosmapService.baseApiUrl = woosmapBaseApiUrl;
  }
}
