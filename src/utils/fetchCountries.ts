type Country = {
  name: {
    common: string;
  };
};
export const fetchCountries = async (): Promise<string[]> =>
  fetch("https://restcountries.com/v3.1/all?fields=name")
    .then((res) => res.json())
    .then((data) => data.map((country: Country) => country.name.common));
