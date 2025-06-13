import { useState } from "react";
import { motion } from "framer-motion";

const CandidatureForm = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    height: "",
    experience: "",
    socialMedia: "",
  });

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="custom_form container">
      <h2 className="form-title">Postuler à une catégorie</h2>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Zone générale */}
        <div className="section general-info">
          <h3>Informations Générales</h3>
          <div className="form-group">
            <label>Nom :</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        {/* Accordéons verticaux */}
        {["mannequin", "hotesse", "influenceur"].map((category) => (
          <div key={category} className="accordion-container">
            <button
              type="button"
              className={`accordion-btn ${selectedCategories.includes(category) ? "active" : ""}`}
              onClick={() => toggleCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
            <motion.div
              className="accordion-content"
              initial={false}
              animate={{ height: openSections[category] ? "auto" : 0, opacity: openSections[category] ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {openSections[category] && (
                <div className="section-content">
                  {category === "mannequin" && (
                    <>
                      <h3>Informations pour Mannequin</h3>
                      <div className="form-group">
                        <label>Taille :</label>
                        <input type="text" name="height" value={formData.height} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Expérience :</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
                      </div>
                    </>
                  )}
                  {category === "hotesse" && (
                    <>
                      <h3>Informations pour Hôtesse</h3>
                      <div className="form-group">
                        <label>Expérience :</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
                      </div>
                    </>
                  )}
                  {category === "influenceur" && (
                    <>
                      <h3>Informations pour Influenceur</h3>
                      <div className="form-group">
                        <label>Réseaux sociaux :</label>
                        <input type="text" name="socialMedia" value={formData.socialMedia} onChange={handleChange} />
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        ))}

        <button type="submit" className="submit-btn">Postuler</button>
      </form>
      {/* Sélection des catégories */}
      <div className="button-container">
        <button type="button" className={selectedCategories.includes("mannequin") ? "active" : ""} onClick={() => toggleCategory("mannequin")}>Mannequin</button>
        <button type="button" className={selectedCategories.includes("hotesse") ? "active" : ""} onClick={() => toggleCategory("hotesse")}>Hôtesse</button>
        <button type="button" className={selectedCategories.includes("influenceur") ? "active" : ""} onClick={() => toggleCategory("influenceur")}>Influenceur</button>
      </div>

      {/* Formulaire principal */}
      <form onSubmit={handleSubmit} className="form-container">
        {/* Zone générale */}
        <div className="section general-info">
          <h3>Informations Générales</h3>
          <div className="form-group">
            <label>Nom :</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        {/* Sections dynamiques selon la sélection */}
        {selectedCategories.includes("mannequin") && (
          <motion.div className="section mannequin" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h3>Informations pour Mannequin</h3>
            <div className="form-group">
              <label>Taille :</label>
              <input type="text" name="height" value={formData.height} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Expérience :</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
            </div>
          </motion.div>
        )}

        {selectedCategories.includes("hotesse") && (
          <motion.div className="section hotesse" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h3>Informations pour Hôtesse</h3>
            <div className="form-group">
              <label>Expérience :</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
            </div>
          </motion.div>
        )}

        {selectedCategories.includes("influenceur") && (
          <motion.div className="section influenceur" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h3>Informations pour Influenceur</h3>
            <div className="form-group">
              <label>Réseaux sociaux :</label>
              <input type="text" name="socialMedia" value={formData.socialMedia} onChange={handleChange} />
            </div>
          </motion.div>
        )}

        <button type="submit" className="submit-btn">Postuler</button>
      </form>
    </div>
  );
};

export default CandidatureForm;
