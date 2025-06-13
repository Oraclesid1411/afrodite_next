import React, { useState, useEffect } from 'react';

const CheckboxGroup = ({ options, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Mettre à jour la sélection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Mise à jour de la sélection en fonction de l'état actuel
    setSelectedItems(prevSelectedItems => {
      const updatedItems = checked
        ? [...prevSelectedItems, value]
        : prevSelectedItems.filter(item => item !== value);
      return updatedItems;
    });
  };

  // Utilisation de useEffect pour envoyer la sélection au parent après chaque mise à jour de l'état
  useEffect(() => {
    // Appeler la fonction onSelectionChange avec la nouvelle sélection
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]); // Déclenche cette fonction à chaque changement de selectedItems

  return (
    <div className="check_boxe_custom">
      {options.map(option => (
        <div key={option.id} className="item">
          <label>
            <input
              type="checkbox"
              value={option.libelle}
              onChange={handleCheckboxChange}
              checked={selectedItems.includes(option.libelle)} // Pour gérer le statut du checkbox
            />
            {option.libelle}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
