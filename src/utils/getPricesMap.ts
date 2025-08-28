import Cookies from "js-cookie";

import type { Country } from "../interfaces/Country";
import type { City } from "../interfaces/City";
import type { Hotel } from "../interfaces/Hotel";
import type { Price } from "../interfaces/Price";

import { getHotels } from "../api/api";

export const getPricesMap = async (
  items: Price[],
  currentItem: Country | City | Hotel | null,
) => {
  const prices = Object.values(items[0]);
  const countryId =
    currentItem?.type === "hotel"
      ? (currentItem as Hotel).countryId
      : currentItem?.type === "city"
        ? null
        : currentItem?.id;

  try {
    if (!countryId) return [];

    const cookies = Cookies.get(`hotels-${countryId}`);
    const cachedHotels: { countryId: number; hotels: Hotel[] } = cookies
      ? JSON.parse(cookies)
      : {};

    let hotels: Hotel[] = [];

    if (String(cachedHotels.countryId) !== countryId) {
      const res = await getHotels(countryId);
      hotels = await res.json();

      Cookies.set(`hotels-${countryId}`, JSON.stringify({ countryId, hotels }));
    } else {
      hotels = cachedHotels.hotels;
    }

    return prices.map((price) => {
      const hotel = Object.values(hotels).find(
        (hotel) => String(hotel.id) === price.hotelID,
      );

      return {
        id: price.id,
        name: hotel?.name || "",
        countryName: hotel?.countryName || "",
        cityName: hotel?.cityName || "",
        startDate: price.startDate,
        amount: price.amount,
        image: hotel?.img || "",
      };
    });
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};
