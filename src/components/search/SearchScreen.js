import React, { useMemo } from "react";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { useLocation } from "react-router-dom";

export const SearchScreen = ({ history }) => {

  const location = useLocation()
  const { q = "" } = queryString.parse(location.search);

  const [values, handleInputChange] = useForm({ searchText: q });

  const { searchText } = values;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search</h4>
          <form onSubmit={handleSubmit}>
            <input
              autoComplete="off"
              className="form-control"
              placeholder="find your hero"
              name="searchText"
              type="text"
              value={searchText}
              onChange={handleInputChange}
            />
            <button className="btn btn-block btn-primary mt-3" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          {heroesFiltered.length >= 1 && (
            <div>
              <h4>Result</h4>
              {heroesFiltered.map((hero) => (
                <HeroCard key={hero.id} {...hero} />
              ))}
            </div>
          )}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="mt-4 alert alert-info">There is not hero with the super name: {q}</div>
          )}
        </div>
      </div>
    </div>
  );
};
