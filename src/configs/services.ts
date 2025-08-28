import {
  faWifi,
  faUtensils,
  faSquareParking,
  faWater,
  faTableTennisPaddleBall,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import type { Service } from "../interfaces/Service";

export const services: {
  key: keyof Service;
  icon: IconDefinition;
  label: string;
}[] = [
  { key: "wifi", icon: faWifi, label: "Wi-Fi" },
  { key: "laundr", icon: faUtensils, label: "Free meals" },
  { key: "parking", icon: faSquareParking, label: "Parking" },
  { key: "aquapark", icon: faWater, label: "Water park" },
  {
    key: "tennis_court",
    icon: faTableTennisPaddleBall,
    label: "Tennis Court",
  },
];
