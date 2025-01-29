import React, { useEffect, useState } from "react";
import { Image, Plus, Star, Trash2 } from "lucide-react";
import AdminHeader from "../components/Headers/AdminHeader";
import { IconButton } from "../components/Global/Buttons";
import api from "../api/api";
import { useLocation } from "react-router-dom";
//import { v4 as uuidv4 } from 'uuid';

function AddRecipePage() {
  const [nomRecette, setNomRecette] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState("");
  const [cuisson, setCuisson] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [categorie, setCategorie] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");
  const [sousCategorieOptions, setSousCategorieOptions] = useState([]);
  const [niveau, setNiveau] = useState("");
  const [cout, setCout] = useState("");
  const [cheminPhoto, setCheminPhoto] = useState(null);
  const [typeIntensite, setTypeIntensite] = useState("");
  const [niveauIntensite, setNiveauIntensite] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");

  function handleImage(e) {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      alert("Le fichier est trop volumineux. La taille maximale est de 5 Mo.");
      return;
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // This is the base64 encoded image

        setCheminPhoto(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      nomRecette,
      description,
      preparation: parseInt(preparation),
      cuisson: parseInt(cuisson),
      personnes: parseInt(personnes),
      niveau,
      categorie,
      sousCategorie,
      cout,
      typeIntensite,
      niveauIntensite,
      ingredients,
      etapes,
      cheminPhoto,
      etiquettes: selectedEtiquettes.filter((e) => e.nom_etiquette !== ""), // Filter out empty selections
    };

    console.log(recipeData);

    try {
      await api.post("/recettes", recipeData);
      setDisplayMessage("Recette ajoutée");
    } catch (error) {
      console.error(error);
      setDisplayMessage(error.message);
    }
  };

  const location = useLocation();
  const { categories, etiquettes } = location.state || {};

  useEffect(() => {
    // Update sousCategorie options based on selected categorie
    if (categories[categorie]) {
      setSousCategorieOptions(categories[categorie]);
    } else {
      setSousCategorieOptions([]);
    }
  }, [categorie, categories]);

  const [ingredients, setIngredients] = useState([
    { nom_ingredient: "", quantite: "", mesure: "" },
  ]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { nom_ingredient: "", quantite: "", mesure: "" },
    ]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const [etapes, setEtapes] = useState([{ num_etape: 1, texte_etape: "" }]);
  const [nextNumEtape, setNextNumEtape] = useState(2); // État pour suivre le prochain numéro d'étape

  const handleAddEtape = () => {
    setEtapes([...etapes, { num_etape: nextNumEtape, texte_etape: "" }]);
    setNextNumEtape(nextNumEtape + 1); // Incrémente le numéro de l'étape
  };

  const handleEtapeChange = (index, field, value) => {
    const updatedEtapes = [...etapes];
    updatedEtapes[index][field] = value;
    setEtapes(updatedEtapes);
  };

  const handleRemoveEtape = (index) => {
    const updatedEtapes = etapes.filter((_, i) => i !== index);
    setEtapes(updatedEtapes);
  };

  const [selectedEtiquettes, setSelectedEtiquettes] = useState(["", "", ""]);

  // Handle etiquette selection
  const handleEtiquetteChange = (index, value) => {
    const updatedEtiquettes = [...selectedEtiquettes];
    updatedEtiquettes[index] = value; // Update the selected etiquette
    setSelectedEtiquettes(updatedEtiquettes);
  };

  return (
    <>
      <AdminHeader headerLabel="Ajouter une recette" />
      <main className="flex-grow flex flex-col p-5 mx-12">
        <form onSubmit={handleSubmit} className="m-3 w-full">
          <h2 className="text-3xl font-bold p-1 m-2">Informations générales</h2>
          <div className="flex flex-row justify-between m-5">
            <div>
              <label htmlFor="nom_recette" className="text-body">
                Nom de la recette
              </label>
              <input
                required
                id="nom_recette"
                type="text"
                name="nom_recette"
                value={nomRecette}
                onChange={(e) => setNomRecette(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
              />
              <label htmlFor="description" className="text-body">
                Description
              </label>
              <textarea
                required
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-body bg-transparent border-black border-[0.5px] rounded-2xl border-dashed py-3 p-4 ml-5 mt-9 mb-5 w-1/2">
              <label htmlFor="chemin_photo">Ajouter une photo</label>
              <input
                type="file"
                name="chemin_photo"
                accept="image/png, image/jpeg, image/jpg"
                id="chemin_photo"
                onChange={handleImage}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly m-5">
            <div className="mr-4">
              <label htmlFor="preparation" className="text-body">
                Temps de préparation (minutes)
              </label>
              <input
                required
                id="preparation"
                type="number"
                name="preparation"
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
              />
            </div>

            <div className="mr-2">
              <label htmlFor="cuisson" className="text-body">
                Temps de cuisson (minutes)
              </label>
              <input
                required
                id="cuisson"
                type="number"
                name="cuisson"
                value={cuisson}
                onChange={(e) => setCuisson(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
              />
            </div>

            <div className="ml-2">
              <label htmlFor="personnes" className="text-body">
                Nombre de personnes
              </label>
              <input
                required
                id="personnes"
                type="number"
                name="personnes"
                value={personnes}
                onChange={(e) => setPersonnes(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-evenly m-5">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col w-1/2 mr-2">
                <label htmlFor="categorie" className="text-body">
                  Catégorie
                </label>
                <select
                  required
                  name="categorie"
                  id="categorie"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Catégorie
                  </option>
                  {Object.keys(categories).map((categorie, index) => (
                    <option key={index} value={categorie}>
                      {categorie}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <label htmlFor="sous-categorie" className="text-body">
                  Sous-catégorie
                </label>
                <select
                  required
                  name="sous-categorie"
                  id="sous-categorie"
                  value={sousCategorie}
                  onChange={(e) => setSousCategorie(e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Sous-catégorie
                  </option>
                  {sousCategorieOptions.map((sousCat) => (
                    <option
                      key={sousCat.id_categorie}
                      value={sousCat.sous_categorie}
                    >
                      {sousCat.sous_categorie}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col w-1/2 mr-2">
                <label htmlFor="niveau" className="text-body">
                  Niveau
                </label>
                <select
                  required
                  name="niveau"
                  id="niveau"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Niveau
                  </option>
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Difficile">Difficile</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <label htmlFor="cout" className="text-body">
                  Coût
                </label>
                <select
                  required
                  name="cout"
                  id="cout"
                  value={cout}
                  onChange={(e) => setCout(e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Coût
                  </option>
                  <option value="Pas cher">Pas cher</option>
                  <option value="Bon marché">Bon marché</option>
                  <option value="Cher">Cher</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col w-1/2 mr-2">
                <label htmlFor="type-intensite" className="text-body">
                  Intensité
                </label>
                <select
                  name="type-intensite"
                  id="type-intensite"
                  value={typeIntensite}
                  onChange={(e) => setTypeIntensite(e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Intensité
                  </option>
                  <option value="Epicé">Epicé</option>
                  <option value="Alcoolisé">Alcoolisé</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <label htmlFor="niveau-itensite" className="text-body">
                  Niveau d'intensité
                </label>
                <select
                  name="niveau-itensite"
                  id="niveau-itensite"
                  value={niveauIntensite}
                  onChange={(e) => setNiveauIntensite(e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Niveau d'intensité
                  </option>
                  <option value="Faible">Faible</option>
                  <option value="Modéré">Modéré</option>
                  <option value="Elevé">Elevé</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly m-5">
            {selectedEtiquettes.map((selected, index) => (
              <div key={index} className="mr-4 w-full">
                <label htmlFor={`etiquette-${index}`} className="text-body">
                  Etiquette {index + 1}
                </label>
                <select
                  id={`etiquette-${index}`}
                  name={`etiquette-${index}`}
                  value={selected}
                  onChange={(e) => handleEtiquetteChange(index, e.target.value)}
                  className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                >
                  <option value="">
                    Choisir
                  </option>
                  {etiquettes.map((etiquette) => (
                    <option key={etiquette.id_etiquette} value={etiquette.nom}>
                      {etiquette.nom}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold p-1 m-2 mt-8">
            Liste des ingrédients
          </h2>

          <div className="mt-5">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-evenly m-5"
              >
                <div className="flex flex-col mr-4 w-full">
                  <label htmlFor="ingredient" className="text-body">
                    Ingrédient
                  </label>
                  <input
                    required
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    value={ingredient.nom_ingredient}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "nom_ingredient",
                        e.target.value
                      )
                    }
                    className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                  />
                </div>

                <div className="flex flex-col mr-2 w-2/3">
                  <label htmlFor="quantite" className="text-body">
                    Quantité
                  </label>
                  <input
                    required
                    id="quantite"
                    type="number"
                    name="quantite"
                    value={ingredient.quantite}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantite", e.target.value)
                    }
                    className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                  />
                </div>

                <div className="flex flex-col ml-2 w-2/3">
                  <label htmlFor="mesure" className="text-body">
                    Mesure
                  </label>
                  <input
                    id="mesure"
                    type="text"
                    name="mesure"
                    value={ingredient.mesure}
                    onChange={(e) =>
                      handleIngredientChange(index, "mesure", e.target.value)
                    }
                    className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="m-3 mr-0 mt-6 hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Trash2 size={36} color="#aa0909" strokeWidth={2.5} />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="text-body bg-transparent border-black border-[0.5px] rounded-2xl border-dashed py-3 p-4 mx-5 mr-5 w-[97.25%]"
              onClick={handleAddIngredient}
            >
              <div className="flex flex-row items-center justify-center">
                <Plus size={30} color="#0F0F0F" strokeWidth={2} />
                <p>Ajouter un ingrédient</p>
              </div>
            </button>
          </div>

          <h2 className="text-3xl font-bold p-1 m-2 mt-8">Liste des étapes</h2>
          <div className="mt-5">
            {etapes.map((etape, index) => (
              <div className="flex flex-row items-center justify-evenly m-5">
                <div className="flex flex-col w-full">
                  <label htmlFor="etape" className="text-body">
                    Etape
                  </label>
                  <textarea
                    required
                    id="etape"
                    type="text"
                    name="etape"
                    value={etape.texte_etape}
                    onChange={(e) =>
                      handleEtapeChange(index, "texte_etape", e.target.value)
                    }
                    className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
                  />
                </div>

                <button
                  type="button"
                  className="m-2 mx-3 hover:translate-x-[1px] hover:translate-y-[1px]"
                  onClick={() => handleRemoveEtape(index)}
                >
                  <Trash2 size={36} color="#aa0909" strokeWidth={2.5} />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="text-body bg-transparent border-black border-[0.5px] rounded-2xl border-dashed py-3 p-4 mx-5 w-[97.25%]"
              onClick={handleAddEtape}
            >
              <div className="flex flex-row items-center justify-center">
                <Plus size={30} color="#0F0F0F" strokeWidth={2} />
                <p>Ajouter une étape</p>
              </div>
            </button>
          </div>

          {displayMessage && (
            <p className="mx-16 mt-6 text-body text-green-900 font-bold">
              {displayMessage}
            </p>
          )}

          <div className="w-fit m-5">
            <IconButton
              icon={<Plus size={30} color="#0F0F0F" strokeWidth={2} />}
              label="Ajouter"
              type="submit"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default AddRecipePage;
