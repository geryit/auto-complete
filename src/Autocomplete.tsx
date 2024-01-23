import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Autocomplete.css";

type Country = {
  name: {
    common: string;
  };
};

const fetchData = async (): Promise<string[]> =>
  fetch("https://restcountries.com/v3.1/all?fields=name")
    .then((res) => res.json())
    .then((data) => data.map((country: Country) => country.name.common));

const Autocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then(setCountries)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCountries = useMemo(() => {
    return query.length === 0
      ? []
      : countries.filter((country) =>
          country.toLowerCase().includes(query.toLowerCase()),
        );
  }, [countries, query]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    [],
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
      {filteredCountries.length > 0 && (
        <ul className="auto-complete-results">
          {filteredCountries.map((country) => (
            <li key={country} className="auto-complete-result">
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
