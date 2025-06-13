import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Locations(props) {
  const apiUrl = 'https://apiafro.aafrodites.com';

  const [list_pays, setListpays] = useState([]);
  const [list_ville, setListville] = useState([]);
  const [list_quartier, setListquartier] = useState([]);

  const [selectedPays, setSelectedPays] = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');

  console.log("props")
  console.log(props)
  // Ref pour éviter un re-render infini
  const isFirstLoad = useRef(true);

  // console.log("props.inputdata")
  // console.log(props.inputdata)
  // Récupérer les données initiales à partir de props (chargé une seule fois)
  // useEffect(() => {
  //   if (props.inputdata && isFirstLoad.current) {
  //     console.log("here data")
  //     console.log(props.inputdata.ville_name)
  //     setSelectedPays(props.inputdata.pays_name || '');
  //     setSelectedVille(props.inputdata.ville_name || '');
  //     setSelectedQuartier(props.inputdata.quartier_name || '');

  //     console.log("props.inputdata.pays_name")
  //     console.log(props.inputdata.pays_name)
  //     console.log(props.inputdata.ville_name)
  //     console.log(props.inputdata.quartier_name)
  //     isFirstLoad.current = false; // Empêche le rechargement infini
  //   }
  // }, [props.inputdata]); 
  useEffect(() => {
    if (props.inputdata && isFirstLoad.current) {
      setSelectedPays(prev => prev || props.inputdata.pays_name || '');
      setSelectedVille(prev => prev || props.inputdata.ville_name || '');
      setSelectedQuartier(prev => prev || props.inputdata.quartier_name || '');
      isFirstLoad.current = false;
    }
  }, [props.inputdata, selectedPays, selectedVille, selectedQuartier]);
  
  // Récupérer la liste des pays
  useEffect(() => {
    axios.get(`${apiUrl}/locations/getPays`)
      .then(response => setListpays(response.data))
      .catch(error => console.error('Échec de récupération de la liste des pays', error));
  }, []);

  // Récupérer la liste des villes lorsque le pays change
  // useEffect(() => {
  //   if (selectedPays) {
  //     axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
  //       .then(response => {
  //         setListville(response.data);
  //         setListquartier([]); // Réinitialiser les quartiers
  //         setSelectedVille(''); // Réinitialiser la ville sélectionnée
  //       })
  //       .catch(error => console.error('Échec de récupération de la liste des villes:', error));
  //   }
  // }, [selectedPays]);

  useEffect(() => {
    if (selectedPays) {
      axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
        .then(response => {
          setListville(response.data);
          setListquartier([]); // Réinitialiser les quartiers
  
          // ✅ Ne réinitialiser que si aucune valeur n'existe déjà
          setSelectedVille(prev => prev || '');
        })
        .catch(error => console.error('Échec de récupération de la liste des villes:', error));
    }
  }, [selectedPays]);

  

  // Récupérer la liste des quartiers lorsque la ville change
  useEffect(() => {
    if (selectedVille) {

      console.log("selectedVille")
      console.log(selectedVille)
      axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
        .then(response => setListquartier(response.data))
        .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
    }
  }, [selectedVille]);

  // Appeler `onChange` pour transmettre les valeurs au parent
  useEffect(() => {
    if (props.onChange) {
      props.onChange({
        pays: selectedPays,
        ville: selectedVille,
        quartier: selectedQuartier,
      });
    }
  }, [selectedVille , selectedQuartier]);

  return (
    <>

       {/* Villes */}
       <div className="item_list location_input col-12">

     

<fieldset>
  <label className="label">Votre ville 
  {/* {selectedVille}  */}

  </label>
  <select
    // className="form-control form-control-lg"
    className={`form-control form-control-lg ${props?.className}`}
    disabled={props?.className?.includes("readonly")} 

    value=  {selectedVille} 
    onChange={e => setSelectedVille(e.target.value)}
    // disabled={!selectedPays}
  >
    <option value=""> votre ville</option>
    {list_ville.map(ville => (
      <option key={ville.idville} value={ville.idville}>
        {ville.nomville} 
      </option>
    ))}
  </select>
</fieldset>
</div>

      {/* Pays */}
      <div className="item_list location_input col-12">
        <fieldset>
          <label className="label">Votre pays</label>
          <select
            // className="form-control form-control-lg"
            className={`form-control form-control-lg ${props?.className}`}
            disabled={props?.className?.includes("readonly")} 
    
            value={selectedPays}
            onChange={e => setSelectedPays(e.target.value)}
          >
            <option value=""> votre pays</option>
            {list_pays.map(country => (
              <option key={country.id} value={country.id}>
                {country.nom}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

   

      {/* Quartiers */}
      <div className="item_list location_input for_quartier col-12">
        <fieldset>
          <label className="label">Quartier</label>
          <select
            // className="form-control form-control-lg"
            className={`form-control form-control-lg ${props?.className}`}
            disabled={props?.className?.includes("readonly")} 
    
            value={selectedQuartier}
            onChange={e => setSelectedQuartier(e.target.value)}
            // disabled={!selectedVille}
          >
            <option value="">votre quartier</option>
            {list_quartier.map(quartier => (
              <option key={quartier.idquart} value={quartier.idquart}>
                {quartier.nomquartier}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
    </>
  );
}

export default Locations;
