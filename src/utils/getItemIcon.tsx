import type { Country } from "../interfaces/Country";
import type { City } from "../interfaces/City";
import type { Hotel } from "../interfaces/Hotel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTreeCity, faBed } from "@fortawesome/free-solid-svg-icons";

export const getItemIcon = (item: Country | City | Hotel) => {
  switch (item.type) {
    case "city":
      return <FontAwesomeIcon icon={faTreeCity} />;
    case "hotel":
      return <FontAwesomeIcon icon={faBed} />;
    default:
      return <img src={item.flag} alt="flag" />;
  }
};
