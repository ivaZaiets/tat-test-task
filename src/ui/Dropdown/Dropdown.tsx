import { useEffect, useState, useRef } from "react";

import Cookies from "js-cookie";

import {
  getCountries,
  searchGeo,
  startSearchPrices,
  getSearchPrices,
} from "../../api/api";
import { getItemIcon } from "../../utils/getItemIcon";
import { getPricesMap } from "../../utils/getPricesMap";

import type { Country } from "../../interfaces/Country";
import type { City } from "../../interfaces/City";
import type { Hotel } from "../../interfaces/Hotel";
import type { PriceMap } from "../../interfaces/PriceMap";

import Button from "../Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import s from "./Dropdown.module.scss";

const Dropdown = ({
  setItems,
  loading,
  setLoading,
  setError,
  scrollIntoView,
}: {
  setItems: React.Dispatch<React.SetStateAction<PriceMap[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  scrollIntoView: () => void;
}) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [list, setList] = useState<(Country | City | Hotel)[]>([]);
  const [currentItem, setCurrentItem] = useState<Country | City | Hotel | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCountries()
      .then((res) => res.json())
      .then((data) => setCountries(Object.values(data)));
  }, []);

  useEffect(() => {
    searchGeo(value)
      .then((res) => res.json())
      .then((data) => setList(Object.values(data)));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownSubmit = async () => {
    setLoading(true);
    scrollIntoView();

    const token = Cookies.get("token");
    const countryId =
      currentItem?.type === "hotel"
        ? (currentItem as Hotel).countryId
        : currentItem?.id;

    try {
      if (token) return;
      const res = await startSearchPrices(countryId);
      const tokenInfo: string[] = Object.values(await res.json());

      Cookies.set("token", tokenInfo[0], { expires: new Date(tokenInfo[1]) });

      const polling = async (token: string, retries = 0) => {
        try {
          const res = await getSearchPrices(tokenInfo[0]);
          const prices = await getPricesMap(
            Object.values(await res.json()),
            currentItem,
          );

          setItems(prices);
        } catch (err: any) {
          if (err.status === 425) {
            return new Promise((resolve) =>
              setTimeout(() => resolve(polling(token)), 4000),
            );
          } else if (err.status === 404) {
            if (retries < 2) {
              return new Promise((resolve) =>
                setTimeout(() => resolve(polling(token, retries + 1)), 4000),
              );
            } else {
              console.error("Error:", err);
              setError("Attempt limit reached. Please try again later");
            }
          }
        }
      };

      return polling(tokenInfo[0]).finally(() => setLoading(false));
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.dropdown} ref={dropdownRef}>
        <div className={s["input-block"]}>
          <FontAwesomeIcon className={s.icon} icon={faLocationDot} />

          <input
            type="text"
            placeholder="Find your next tour..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setSelected(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleDropdownSubmit();
              }
            }}
          />
        </div>

        {selected && (
          <div className={s.list}>
            {value && list.length === 0 ? (
              <p className={s["not-found"]}>Not Found</p>
            ) : (
              (!value ||
              list.find((item) => item.name === value)?.type === "country"
                ? countries
                : list
              ).map((item) => (
                <div
                  key={item.id}
                  className={`${s.item} ${item.name === value && s["item--active"]}`}
                  onClick={() => {
                    setValue(item.name);
                    setCurrentItem(item);
                    setSelected(false);
                  }}
                >
                  {getItemIcon(item)}
                  <p>{item.name}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Button
        width={165}
        height={60}
        variant="cover"
        text="Find Tour"
        disabled={!value || loading}
        onClick={handleDropdownSubmit}
      />
    </div>
  );
};

export default Dropdown;
