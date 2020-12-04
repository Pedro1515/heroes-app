import React, { useMemo } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = ({ history }) => {
  const { heroId } = useParams();

  const hero = useMemo(() => getHeroById(heroId), [heroId])

  if (!hero) {
    return <Redirect to="/" />;
  }
  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero;

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push("./");
    } else {
      history.goBack();
    }
  };

  return (
    <div>
      <h1>HeroScreen</h1>
      <div className="row mt-3">
        <div className="col-4">
          <img
            alt={superhero}
            className="img-thumbnail animate__animated animate__bounceIn"
            src={`../assets/heroes/${heroId}.jpg`}
          />
        </div>

        <div className="col-8">
          <h3> {superhero} </h3>
          <ul className="list-group">
            <li className="list-group-item list-group-item-dark">
              <b>Alter Ego: {alter_ego}</b>
            </li>
            <li className="list-group-item list-group-item-dark">
              <b>Publisher: {publisher}</b>
            </li>
            <li className="list-group-item list-group-item-dark">
              <b>First Appearance: {first_appearance}</b>
            </li>
          </ul>
          <br />
          <h5>Characters</h5>
          <p>{characters}</p>
          <button className="btn btn-info" onClick={handleReturn}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};
