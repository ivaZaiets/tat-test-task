import Button from "../../ui/Button/Button";

import s from "./Home.module.scss";

const Home = () => {
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
    </div>
  );
};

export default Home;
