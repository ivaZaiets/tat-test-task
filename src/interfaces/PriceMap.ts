import type { Service } from "./Service";

export interface PriceMap {
  id: string | number;
  priceId: string;
  name: string;
  countryName: string;
  cityName: string;
  startDate: string;
  amount: number;
  image: string;
  description?: string;
  services?: Service | null;
}
