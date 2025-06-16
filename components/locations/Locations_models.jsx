import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Locations(props) {
  const apiUrl = 'https://apiafro.aafrodites.com';

  console.log("props")

  console.log(props)

// changement de méthode
// passer par la ville pour le pays
 const [queryCity, setQueryCity] = useState("");
  const [queryCountry, setQueryCountry] = useState("");
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [suggestedCountries, setSuggestedCountries] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]); // Liste filtrée des villes

  console.log(suggestedCountries)
  console.log(queryCountry)
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCountryReadonly, setIsCountryReadonly] = useState(true);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);

  // const [list_pays, setListpays] = useState([]);
  // const [list_ville, setListville] = useState([]);
  // const [list_quartier, setListquartier] = useState([]);
console.log(suggestedCities)
  const [selectedPays, setSelectedPays] = useState('');
  // const [selectedVille, setSelectedVille] = useState('');
  // const [selectedQuartier, setSelectedQuartier] = useState('');

 
  // Ref pour éviter un re-render infini
  // const isFirstLoad = useRef(true);
 
  // useEffect(() => {
  //   if (props.inputdata && isFirstLoad.current) {
  //     setSelectedPays(prev => prev || props.inputdata.pays_name || '');
  //     setSelectedVille(prev => prev || props.inputdata.ville_name || '');
  //     // setSelectedQuartier(prev => prev || props.inputdata.quartier_name || '');
  //     isFirstLoad.current = false;
  //   }
  // }, [props.inputdata, selectedPays, selectedVille, selectedQuartier]);
  // récupérer les villes
  useEffect(() => {
    axios.get(`${apiUrl}/locations/getAllVilles`)
      .then(response => setSuggestedCities(response.data))
      .catch(error => console.error('Échec de récupération de la liste des pays', error));
  }, []);

  // Récupérer la liste des pays
  useEffect(() => {
    axios.get(`${apiUrl}/locations/getPays`)
      .then(response => setSuggestedCountries(response.data))
      .catch(error => console.error('Échec de récupération de la liste des pays', error));
  }, []);
 
  // Gestion de la saisie dans l'input ville
  const handleCityChange = (e) => {
    const value = e.target.value;
    setQueryCity(value);
    setShowCitySuggestions(value.length > 1);

    if (value.length > 1) {
      const filtered = suggestedCities.filter((city) =>
        city.nomville.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]); // Réinitialise la liste si l'input est vide
    }

    const matchedCity = suggestedCities.find(
      (city) => city.nomville.toLowerCase() === value.toLowerCase()
    );

    if (matchedCity) {
      setSelectedCity(matchedCity);

      // Trouver le pays correspondant
      const matchedCountry = suggestedCountries.find(
        (country) => country.id === matchedCity.pays
      );

      setSelectedPays(matchedCountry)

      setQueryCountry(matchedCountry ? matchedCountry.nom : "");
      setIsCountryReadonly(true);
    } else {
      setSelectedCity(null);
      setQueryCountry("");
      // setIsCountryReadonly(false);
    }
  };

  // Sélection d'une ville dans la liste des suggestions
  const handleCitySelect = (city) => {
    console.log("Ville sélectionnée:", city);

    // Trouver le pays correspondant
    const matchedCountry = suggestedCountries.find(
      (country) => country.id === city.pays
    );

    setQueryCity(city.nomville);
    setQueryCountry(matchedCountry ? matchedCountry.nom : ""); // Afficher le nom du pays
    setSelectedCity(city);
    setIsCountryReadonly(true);
    setShowCitySuggestions(false);
    setFilteredCities([]); // Réinitialiser la liste après sélection
  };


  const handleCountryChange = (e) => {
    const value = e.target.value;

    console.log("value")
    console.log(value)
    setQueryCountry(value);
    setShowCountrySuggestions(value.length > 1);

    const filteredCountries = suggestedCountries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestedCountries(filteredCountries);
  };

  const handleCountrySelect = (country) => {
    setQueryCountry(country);
    setShowCountrySuggestions(false);
  };
 
  // useEffect(() => {
  //   if (selectedPays) {
  //     axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
  //       .then(response => {
  //         setListville(response.data);
  //         setListquartier([]); // Réinitialiser les quartiers
  
  //         // ✅ Ne réinitialiser que si aucune valeur n'existe déjà
  //         setSelectedVille(prev => prev || '');
  //       })
  //       .catch(error => console.error('Échec de récupération de la liste des villes:', error));
  //   }
  // }, [selectedPays]);

  

  // Récupérer la liste des quartiers lorsque la ville change
  // useEffect(() => {
  //   if (selectedVille) {

  //     console.log("selectedVille")
  //     console.log(selectedVille)
  //     axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
  //       .then(response => setListquartier(response.data))
  //       .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
  //   }
  // }, [selectedVille]);

  // Appeler `onChange` pour transmettre les valeurs au parent
  // useEffect(() => {
  //   if (props.onChange) {
  //     props.onChange({
  //       pays: selectedPays,
  //       ville: selectedVille,
  //       quartier: selectedQuartier,
  //     });
  //   }
  // }, [selectedVille , selectedQuartier]);


   // Mise à jour des valeurs pour le composant parent
   useEffect(() => {
    console.log("selectedPays")
    console.log(selectedPays)
    console.log("selectedCity")
    console.log(selectedCity)
    console.log("suggestedCountries")
    console.log(suggestedCountries)

    if (!selectedCity) {
      if (props.onChange) {
        props.onChange({
          pays: null,
          ville: null,
          code_pays: null
        });

      }
      return;
    }
  
    const matchedCountry = suggestedCountries.find(
      (country) => country.id === selectedCity.pays
    );

    console.log(matchedCountry)

    if (props.onChange) {
      props.onChange({
        pays: selectedCity?.pays,
        ville: selectedCity?.idville,
        code_pays : matchedCountry?.code_pays
        // quartier: selectedDistrict,
      });
    }

    
    setIsCountryReadonly(true)
  }, [selectedCity, selectedPays]);


  console.log("isCountryReadonly")
  console.log(isCountryReadonly)

  return (
    <>
   <div className="container_locations">
   <div className="item_list location_input">
     
      {/* <label>Ville :</label> */}
      <input
        type="text"
        className='input_padding'
        placeholder="ville..."
        value={queryCity}
        onChange={handleCityChange}
        onFocus={() => setShowCitySuggestions(queryCity.length > 1)}
        onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
      />
      {/* {showCitySuggestions && (
        <ul className="suggestions">
          {suggestedCities.map((city) => (
            <li key={city.idville} onClick={() => handleCitySelect(city)}>
              {city.nomville}
            </li>
          ))}
        </ul>
      )} */}

<div className={`suggestions ${showCitySuggestions ? 'active' : ''}`}>
  {filteredCities.length > 0 ? (
    filteredCities.map((city) => (
      <li key={city.idville} onClick={() => handleCitySelect(city)}>
        {city.nomville}
      </li>
    ))
  ) : (
    <li>Aucune ville trouvée</li>
  )}
</div>

 </div>
 <div className="item_list location_input col-12">
 <input
        type="text"
        placeholder="pays"
        className='input_padding'
        value={queryCountry}
        onChange={handleCountryChange}
        readOnly={isCountryReadonly}
        onFocus={() => !isCountryReadonly && setShowCountrySuggestions(queryCountry.length > 1)}
        onBlur={() => setTimeout(() => setShowCountrySuggestions(false), 200)}
      />
      {showCountrySuggestions && !isCountryReadonly && (
        <ul className="suggestions">
          {suggestedCountries.map((country, index) => (
            <li key={index} onClick={() => handleCountrySelect(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}

    </div>
  
    </div>
     
     
    </>
  );
}

export default Locations;
