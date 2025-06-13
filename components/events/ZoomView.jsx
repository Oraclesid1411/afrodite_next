// ZoomView.js
'use client';
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const ZoomView = ({ currentMonth, currentYear, onMonthChange, onYearChange }) => {
  const [showMonthModal, setShowMonthModal] = useState(false);
  // const [showYearModal, setShowYearModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const months = ["Janv.", "Févr.", "mars", "avr.", "mai", "juin",
                 "juil.", "août", "sept.", "oct.", "nov.", "déc."];

  useEffect(() => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  }, [currentMonth, currentYear]);

  const toggleMonthModal = () => setShowMonthModal(!showMonthModal);
  // const toggleYearModal = () => setShowYearModal(!showYearModal);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    onMonthChange(month);
    onYearChange(selectedYear); // Prend en compte l'année sélectionnée
    toggleMonthModal();
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };
 

  const handlePrevYear = () => setSelectedYear(prev => prev - 1);
  const handleNextYear = () => setSelectedYear(prev => prev + 1);

  // console.log("selectedYear")
  // console.log(selectedYear)
  return (
    <>
    <div className="event_zoom_container">
  {/* Affichage du mois et de l'année avec options pour ouvrir les modaux */}
        <span className='show_date'  onClick={toggleMonthModal}>
        <span className="calendar_value">{months[selectedMonth]}</span>
        {/* {selectedYear !== currentYear && ( */}
          <span className="calendar_value year"> {selectedYear}</span>
        {/* )} */}
      </span>

      {/* Modal de sélection du mois */}

      {showMonthModal && (
        <div className="events_page">
        <div className="modal-overlay" onClick={toggleMonthModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
           
            {/* Sélecteur d'année */}
            <div className="year_box year-select">
              {/* <label>Année :</label> */}
              <button className="nav_button" onClick={handlePrevYear}>
                 <FontAwesomeIcon icon={faChevronLeft}/>
                {/* <i className="fa fa-chevron-left"></i> */}
              </button>
              <select className='select_year' value={selectedYear} onChange={handleYearChange}>
                {[...Array(50)].map((_, index) => {
                  const year = currentYear - 1 + index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <button className="nav_button" onClick={handleNextYear}>
                 <FontAwesomeIcon icon={faChevronRight}/>
              </button>
            </div>

            {/* Liste des mois */}
            <div className="month_select">
              <div className="row">
              {months.map((month, index) => (
                <div className="col-3">
 <button key={index} onClick={() => handleMonthClick(index)}>
                  {month}
                </button>
                </div>
               
              ))}
              </div>
           
            </div>
          </div>
        </div>
        </div>
        
      )}
    </div>
    

      {/* {showMonthModal && (
        <div className="modal-overlay" onClick={toggleMonthModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Choisissez le mois</h2>
            <div className="month-select">
              {months.map((month, index) => (
                <button key={index} onClick={() => handleMonthClick(index)}>
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Modal de sélection de l'année */}
      {/* {showYearModal && (
        <div className="modal-overlay" onClick={toggleYearModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Choisissez l'année</h2>
            <div className="year-select">
              {[...Array(10)].map((_, index) => (
                <button key={index} onClick={() => handleYearClick(currentYear - 5 + index)}>
                  {currentYear - 5 + index}
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ZoomView;
