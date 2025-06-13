import React, { useState } from 'react';
// import Select from 'react-select';
import { Select } from './ui/select';
import 'flag-icons/css/flag-icons.min.css';

// Liste des pays de l'Afrique de l'Ouest avec leurs codes pour les drapeaux
const westAfricanCountries = [
  { value: 'bj', label: 'Bénin', flag: 'bj' },
  { value: 'bf', label: 'Burkina Faso', flag: 'bf' },
  { value: 'cv', label: 'Cap-Vert', flag: 'cv' },
  { value: 'ci', label: 'Côte d\'Ivoire', flag: 'ci' },
  { value: 'gm', label: 'Gambie', flag: 'gm' },
  { value: 'gh', label: 'Ghana', flag: 'gh' },
  { value: 'gn', label: 'Guinée', flag: 'gn' },
  { value: 'gw', label: 'Guinée-Bissau', flag: 'gw' },
  { value: 'lr', label: 'Libéria', flag: 'lr' },
  { value: 'ml', label: 'Mali', flag: 'ml' },
  { value: 'mr', label: 'Mauritanie', flag: 'mr' },
  { value: 'ne', label: 'Niger', flag: 'ne' },
  { value: 'ng', label: 'Nigéria', flag: 'ng' },
  { value: 'sn', label: 'Sénégal', flag: 'sn' },
  { value: 'sl', label: 'Sierra Leone', flag: 'sl' },
  { value: 'tg', label: 'Togo', flag: 'tg' },
];

// Styles personnalisés pour rendre le composant plus compact
const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '100px',
    fontSize: '0.85em',
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '20px',
    height: '25px', // Hauteur globale réduite
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 6px', // Moins de padding
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '20px', // Aligne les icônes avec la hauteur réduite
  }),
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85em',
    height: '30px', // Réduit la hauteur des options
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const CountrySelect = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    value: 'tg', label: 'Togo', flag: 'tg'
  });

  const formatOptionLabel = ({ value, flag }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span className={`fi fi-${flag}`}  style={{ marginRight: "3px"}}> </span>
      {value}
    </div>
  );

  return (
    <Select
    className='selected_container'
      value={selectedCountry}
      onChange={setSelectedCountry}
      options={westAfricanCountries}
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      placeholder="choisir"
    />
  );
};

export default CountrySelect;
