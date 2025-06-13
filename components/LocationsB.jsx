// import React from 'react'

import  { useEffect, useState} from 'react'
import axios from 'axios'
function LocationsB(props) {
  const apiUrl = 'https://apiafro.aafrodites.com';

  const [list_pays, setListpays] = useState([]);
  const [list_ville, setListville] = useState([]);
  const [list_quartier, setListquartier] = useState([]);

  console.log("list_quartier")
  console.log(list_quartier)

  const [selectedPays, setSelectedPays] = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');

  // Récupérer la liste des pays
  useEffect(() => {
    axios.get(`${apiUrl}/locations/getPays`)
      .then(response => {
        setListpays(response.data);
      })
      .catch(error => console.error('Échec de récupération de la liste des pays', error));
  }, []);

  // Récupérer la liste des villes lorsque le pays change
  useEffect(() => {
    if (selectedPays) {
      axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
        .then(response => {
          setListville(response.data);
          setListquartier([]); // Réinitialiser les quartiers
        })
        .catch(error => console.error('Échec de récupération de la liste des villes:', error));
    }
  }, [selectedPays]);

  // Récupérer la liste des quartiers lorsque la ville change
  useEffect(() => {
    if (selectedVille) {
      axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
        .then(response => {
          setListquartier(response.data);
        })
        .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
    }
  }, [selectedVille]);

  // Appeler la fonction `onChange` pour transmettre les valeurs au parent
  useEffect(() => {
    if (props.onChange) {
      props.onChange({
        pays: selectedPays,
        ville: selectedVille,
        quartier: selectedQuartier,
      });
    }
  }, [selectedPays, selectedVille, selectedQuartier]); // Déclenche quand une valeur change

  return (
    <>
      {/* Pays */}
      <div className="item_list location_input col-12">
        <fieldset>
          <label className="label">Pays de la boutique</label>
          <select
            className="form-control form-control-lg"
            name={props.inputdata.pays_name}
            value={selectedPays}
            onChange={e => setSelectedPays(e.target.value)}
          >
            <option value="">Sélectionner le Pays</option>
            {list_pays.map(country => (
              <option key={country.id} value={country.id}>
                {country.nom}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      {/* Villes */}
      <div className="item_list location_input col-12">
        <fieldset>
          <label className="label">Ville de la boutique</label>
          <select
            className="form-control form-control-lg"
            name={props.inputdata.ville_name}
            value={selectedVille}
            onChange={e => setSelectedVille(e.target.value)}
            disabled={!selectedPays}
          >
            <option value="">Sélectionner la ville</option>
            {list_ville.map(ville => (
              <option key={ville.idville} value={ville.idville}>
                {ville.nomville}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      {/* Quartiers */}
      {props.inputdata.quartier_name &&
      (
        <>
  <div className="item_list location_input col-12">
        <fieldset>
          <label className="label">Quartier de la boutique</label>
          <select
            className="form-control form-control-lg"
            name={props.inputdata.quartier_name}
            value={selectedQuartier}
            onChange={e => setSelectedQuartier(e.target.value)}
            disabled={!selectedVille}
          >
            <option value="">Sélectionner le quartier</option>
            {list_quartier.map(quartier => (
              <option key={quartier.idquart} value={quartier.idquart}>
                {quartier.nomquartier}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
        </>
      )}
    
    </>
  );
}

export default LocationsB;
