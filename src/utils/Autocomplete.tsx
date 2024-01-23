import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import "./Autocomplete.css";
import Result from "./Result";
import { fetchCountries } from "./fetchCountries";

const Autocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCountries()
      .then(setCountries)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setCountries]);

  const results = useMemo(() => {
    return query.length === 0
      ? []
      : countries.filter((country) =>
          country.toLowerCase().includes(query.toLowerCase()),
        );
  }, [query, countries]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    [setQuery],
  );

  return isLoading ? (
    <div>Loading..</div>
  ) : (
    <div className="auto-complete">
      <input
        type="text"
        value={query}
        onChange={onChange}
        className="auto-complete-input"
        placeholder="Search a country..."
      />
      {!!query &&
        (!results.length ? (
          <div>No results found</div>
        ) : (
          <ul className="auto-complete-results">
            {results.map((result) => (
              <li key={result} className="auto-complete-result">
                <Result result={result} query={query} />
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
};

export default memo(Autocomplete);