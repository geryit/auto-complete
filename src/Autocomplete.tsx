import React, { useState, useEffect } from "react";
import "./Autocomplete.css";

type Country = {
  name: {
    common: string;
  };
};

const fetchData = async (query: string): Promise<string[]> => {
  const countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=name",
  )
    .then((res) => res.json())
    .then((data) => data.map((country: Country) => country.name.common));
  return countries.filter((country: string) =>
    country.toLowerCase().includes(query.toLowerCase()),
  );
};

const Autocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    fetchData(query).then((data) => {
      setSuggestions(data);
      setIsLoading(false);
    });
  }, [query]);

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="autocomplete-input"
        placeholder="Search a country..."
      />
      {isLoading && <div>Loading...</div>}
      <ul className="autocomplete-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="autocomplete-item">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
