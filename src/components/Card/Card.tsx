import { Link } from "react-router-dom";

import { getFormattedDate } from "../../utils/getFormattedDate";
import { getFormattedAmount } from "../../utils/getFormattedAmount";

import type { PriceMap } from "../../interfaces/PriceMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import s from "./Card.module.scss";

const Card = ({ item }: { item: PriceMap }) => {
  return (
    <Link to="/" className={s.card}>
      <img src={item.image} alt="hotel" />

      <div className={s.content}>
        <h2>{item.name}</h2>

        <div className={s["geo-block"]}>
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{`${item.countryName}, ${item.cityName}`}</p>
        </div>

        <p className={s.date}>{getFormattedDate(item.startDate, "uk-UA")}</p>

        <p className={s.amount}>
          {getFormattedAmount(
            "en-US",
            { style: "currency", currency: "USD" },
            item.amount,
          )}
        </p>

        <p className={s.link}>Open price</p>
      </div>
    </Link>
  );
};

export default Card;
