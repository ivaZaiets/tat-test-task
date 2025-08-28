import type { Service } from "./Service";

export interface Hotel {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  type: "hotel";
  description?: string;
  services?: Service | null;
}
