import React, { useState, useEffect } from "react";

const CountrySelector = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    console.log("loading liste")
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("data")
        console.log(data)
        const sortedCountries = data
          .map((country) => ({
            name: country.name.common,
            flag: country.flags.svg,
            code: country.cca2,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
      })
      .catch((error) => console.error("Erreur lors du chargement des pays :", error));
  }, []);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    if (onSelect) onSelect(country);
  };

  return (
    <div className="relative w-80">
      {/* Affichage du pays sélectionné */}
      <div
        className="flex items-center border p-2 rounded cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry ? (
          <>
            <img src={selectedCountry.flag} alt="Flag" className="w-6 h-6 mr-2" />
            <span>{selectedCountry.name}</span>
          </>
        ) : (
          <span className="text-gray-500">Sélectionner un pays</span>
        )}
      </div>

      {/* Liste déroulante */}
      {isOpen && (
        <div className="absolute w-full bg-white border mt-1 max-h-60 overflow-y-auto rounded shadow-lg z-10">
          <input
            type="text"
            placeholder="Rechercher un pays..."
            className="w-full p-2 border-b outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-52 overflow-y-auto">
            {countries
              .filter((country) =>
                country.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((country) => (
                <li
                  key={country.code}
                  className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectCountry(country)}
                >
                  <img src={country.flag} alt="Flag" className="w-6 h-6 mr-2" />
                  {country.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
