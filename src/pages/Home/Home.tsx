import { useState } from "react";

import Button from "../../ui/Button/Button";
import Dropdown from "../../ui/Dropdown/Dropdown";

import type { PriceMap } from "../../interfaces/PriceMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { FadeLoader } from "react-spinners";

import s from "./Home.module.scss";
import Card from "../../components/Card/Card";

const Home = () => {
  const [items, setItems] = useState<PriceMap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className={s.container}>
      <div className={s.main}>
        <div className={s.content}>
          <img src="images/airplane.png" alt="airplane" />

          <div className={s["text-block"]}>
            <p className={s.subtitle}>Save Journey</p>

            <h1 className={s.title}>
              Make your <span>Holiday</span> Memorable
            </h1>

            <p className={s.description}>
              Travor is one of the most popular Travel agency for those who want
              to explore the wold and try to make adventure
            </p>

            <Button width={177} height={50} variant="cover" text="Plan Trip" />
          </div>

          <img src="images/man.png" alt="man" />
        </div>
      </div>

      <Dropdown
        setItems={setItems}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />

      {loading ? (
        <FadeLoader className={s.loader} />
      ) : error ? (
        <div className={s["error-block"]}>
          <FontAwesomeIcon className={s.icon} icon={faTriangleExclamation} />
          <p>{error}</p>
        </div>
      ) : (
        items.length > 0 && (
          <div className={s.cards}>
            {items
              .sort((a, b) => a.amount - b.amount)
              .map((item) => (
                <Card key={item.id} item={item} maxWidth={325} />
              ))}
          </div>
        )
      )}
    </div>
  );
};

export default Home;
