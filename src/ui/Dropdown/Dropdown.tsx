import { useEffect, useState, useRef } from "react";

import { getCountries, searchGeo } from "../../api/api";
import { getItemIcon } from "../../utils/getItemIcon";

import type { Country } from "../../interfaces/Country";
import type { City } from "../../interfaces/City";
import type { Hotel } from "../../interfaces/Hotel";

import Button from "../Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import s from "./Dropdown.module.scss";

const Dropdown = () => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [list, setList] = useState<(Country | City | Hotel)[]>([]);
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

      <Button width={165} height={60} variant="cover" text="Find Tour" />
    </div>
  );
};

export default Dropdown;
