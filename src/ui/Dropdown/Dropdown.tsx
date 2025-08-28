import { useState, useRef, useEffect } from "react";

import Cookies from "js-cookie";

import {
  getCountries,
  searchGeo,
  startSearchPrices,
  getSearchPrices,
  stopSearchPrices,
} from "../../api/api";
import { getItemIcon } from "../../utils/getItemIcon";
import { getPricesMap } from "../../utils/getPricesMap";
import { delay } from "../../utils/delay";

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
  setLoading,
  setError,
}: {
  setItems: React.Dispatch<React.SetStateAction<PriceMap[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [list, setList] = useState<(Country | City | Hotel)[]>([]);
  const [currentItem, setCurrentItem] = useState<Country | City | Hotel | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTokenRef = useRef<string>("");

  useEffect(() => {
    getCountries()
      .then((res) => res.json())
      .then((data) => setCountries(Object.values(data)))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    searchGeo(value)
      .then((res) => res.json())
      .then((data) => setList(Object.values(data)))
      .catch((err) => console.error("Error:", err));
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
    setError("");

    const activeToken = Cookies.get("token");
    currentTokenRef.current = "";
    const countryId =
      currentItem?.type === "hotel"
        ? (currentItem as Hotel).countryId
        : currentItem?.id;

    try {
      if (activeToken) {
        try {
          await stopSearchPrices(activeToken);
        } catch (err) {
          console.error("Error:", err);
        } finally {
          Cookies.remove("token");
        }
      }

      const res = await startSearchPrices(countryId);
      const tokenInfo: string[] = Object.values(await res.json());

      currentTokenRef.current = tokenInfo[0];
      Cookies.set("token", tokenInfo[0], { expires: new Date(tokenInfo[1]) });

      const isTokenValid = () => currentTokenRef.current === tokenInfo[0];

      const polling = async (retries = 0) => {
        if (!isTokenValid()) {
          console.warn("Polling cancelled for stale token");
          return;
        }

        try {
          const res = await getSearchPrices(tokenInfo[0]);
          const data = await res.json();

          if (!isTokenValid()) {
            console.warn("Ignored response for stale token");
            return;
          }

          const prices = await getPricesMap(Object.values(data), currentItem);

          if (prices.length === 0) {
            setError("No tours found. Try changing settings");
          }

          setItems(prices);
          setLoading(false);
        } catch (err: any) {
          if (!isTokenValid()) {
            console.warn("Error ignored for stale token");
            return;
          }

          if (err.status === 425) {
            await delay(4000);
            return polling(retries);
          }

          if (err.status === 404 && retries < 2) {
            await delay(4000);
            return polling(retries + 1);
          }

          console.error("Error:", err);
          if (err.status === 404) {
            setError("Attempt limit reached. Please try again later");
          }
          setLoading(false);
        }
      };

      await polling();
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
        disabled={!value}
        onClick={handleDropdownSubmit}
      />
    </div>
  );
};

export default Dropdown;
