import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPrice, getHotel } from "../../api/api";

import type { Price } from "../../interfaces/Price";
import type { Hotel } from "../../interfaces/Hotel";

import Card from "../../components/Card/Card";

import s from "./Tour.module.scss";

const Tour = () => {
  const { priceId, hotelId } = useParams();

  const [price, setPrice] = useState<Price | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    if (priceId) {
      getPrice(priceId)
        .then((res) => res.json())
        .then(setPrice)
        .catch((err) => console.error("Error:", err));
    }

    if (hotelId) {
      getHotel(Number(hotelId))
        .then((res) => res.json())
        .then(setHotel)
        .catch((err) => console.error("Error:", err));
    }
  }, [priceId, hotelId]);

  const item = {
    id: hotel?.id || "",
    priceId: price?.id || "",
    name: hotel?.name || "",
    countryName: hotel?.countryName || "",
    cityName: hotel?.cityName || "",
    startDate: price?.startDate || "",
    amount: price?.amount || 0,
    image: hotel?.img || "",
    description: hotel?.description || "",
    services: hotel?.services || null,
  };

  return (
    <div className={s.container}>
      <Card item={item} isLink={false} maxWidth={500} />
    </div>
  );
};

export default Tour;
