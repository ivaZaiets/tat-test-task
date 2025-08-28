import { Link } from "react-router-dom";

import { getFormattedDate } from "../../utils/getFormattedDate";
import { getFormattedAmount } from "../../utils/getFormattedAmount";

import type { PriceMap } from "../../interfaces/PriceMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";

import { services } from "../../configs/services";

import s from "./Card.module.scss";

const Card = ({
  item,
  isLink = true,
  maxWidth,
}: {
  item: PriceMap;
  isLink?: boolean;
  maxWidth: number;
}) => {
  return (
    <Link
      to={`tours/${item.priceId}/${item.id}`}
      className={s.card}
      style={{ maxWidth, pointerEvents: !isLink ? "none" : "auto" }}
    >
      {item.image && <img src={item.image} alt="hotel" />}

      <div className={s.content}>
        <h2>{item.name}</h2>

        <div className={s["geo-block"]}>
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{`${item.countryName}, ${item.cityName}`}</p>
        </div>

        <div className={s["date-amount-block"]}>
          <div className={s["date-block"]}>
            <FontAwesomeIcon icon={faCalendar} />

            <p className={s.date}>
              {getFormattedDate(item.startDate, "uk-UA")}
            </p>
          </div>

          <p className={s.amount}>
            {getFormattedAmount(
              "en-US",
              { style: "currency", currency: "USD" },
              item.amount,
            )}
          </p>
        </div>

        <hr className={s.line} />

        {item.description && (
          <p className={s.description}>{item.description}</p>
        )}

        {item.services && (
          <div className={s.services}>
            {services.map(
              ({ key, icon, label }) =>
                item.services?.[key] === "yes" && (
                  <div key={key} className={s["service-block"]}>
                    <FontAwesomeIcon icon={icon} />
                    <p>{label}</p>
                  </div>
                ),
            )}
          </div>
        )}

        <p className={s.link}>Open price</p>
      </div>
    </Link>
  );
};

export default Card;
