import React, { useEffect, useState } from "react";
import { Image, Plus, Star, Trash2 } from "lucide-react";
import AdminHeader from "../components/Headers/AdminHeader";
import { IconButton } from "../components/Global/Buttons";
import api from "../api/api";
import { useLocation, useParams } from "react-router-dom";

function UpdateRecipePage() {
  const location = useLocation();
  const { categories, etiquettes } = location.state || {};

  const [nomRecette, setNomRecette] = useState(location.state.nom_recette);
  const [description, setDescription] = useState(location.state.desc);
  const [preparation, setPreparation] = useState(
    location.state.temps_preparation
  );
  const [cuisson, setCuisson] = useState(location.state.temps_cuisson);
  const [personnes, setPersonnes] = useState(location.state.personnes);
  const [categorie, setCategorie] = useState(location.state.categorieNom);
  const [sousCategorie, setSousCategorie] = useState(
    location.state.sousCategorie
  );
  const [sousCategorieOptions, setSousCategorieOptions] = useState([]);
  const [niveau, setNiveau] = useState(location.state.niveau_recette);
  const [cout, setCout] = useState(location.state.cout);
  const [cheminPhoto, setCheminPhoto] = useState(null);
  const [typeIntensite, setTypeIntensite] = useState(
    location.state.intensite_type
  );

  const [niveauIntensite, setNiveauIntensite] = useState(
    location.state.intensite_niveau
  );

  const { id } = useParams();
  const [recetteEtiquettes, setRecetteEtiquettes] = useState([]);

  const fetchRecetteEtiquette = async () => {
    try {
      const response = await api.get(`/recettes/${id}/etiquettes`);

      if (response && response.data) {
        setRecetteEtiquettes(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRecetteEtiquette();
  }, []);

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

  useEffect(() => {
    // Update sousCategorie options based on selected categorie
    if (categories[categorie]) {
      setSousCategorieOptions(categories[categorie]);
    } else {
      setSousCategorieOptions([]);
    }
  }, [categorie, categories]);

  const [selectedEtiquettes, setSelectedEtiquettes] = useState(["", "", ""]);

  useEffect(() => {
    if (recetteEtiquettes.length > 0) {
      // Set selectedEtiquettes based on recetteEtiquettes with a default of 3 items
      const updatedEtiquettes = [
        ...recetteEtiquettes.map((etiquette) => etiquette.nom_etiquette),
      ];
      // Fill the rest of the array with empty strings to ensure it has 3 items
      while (updatedEtiquettes.length < 3) {
        updatedEtiquettes.push(""); // Add empty strings to make sure there are 3 elements
      }
      setSelectedEtiquettes(updatedEtiquettes);
    }
  }, [recetteEtiquettes]);

  useEffect(() => {
    fetchRecetteEtiquette();
  }, [id]);

  // Handle etiquette selection
  const handleEtiquetteChange = (index, value) => {
    const updatedEtiquettes = [...selectedEtiquettes];
    updatedEtiquettes[index] = value; // Update the selected etiquette
    setSelectedEtiquettes(updatedEtiquettes);
  };

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const recipeData = {
      idRecette: location.state.id_recette,
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
      cheminPhoto,
      etiquettes: selectedEtiquettes,
    };

    try {
      const response = await api.put("/recettes", recipeData);
      setSuccess(response.data.message);

      setSuccess("Recette modifiée");
    } catch (error) {
      setError("Erreur");
    }
  };

  return (
    <>
      <AdminHeader headerLabel="Mettre à jour une recette" />
      <main className="flex-grow flex flex-col p-5 mx-12">
        <form onSubmit={handleUpdate} className="m-3 w-full">
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
                  <option value="">Catégorie</option>
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
                  <option value="">Sous-catégorie</option>
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
                  <option value="">Niveau</option>
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
                  <option value="">Coût</option>
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
                  <option value="">Intensité</option>
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
                  <option value="">Niveau d'intensité</option>
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
                  <option value="">Choisir</option>
                  {etiquettes.map((etiquette) => (
                    <option key={etiquette.id_etiquette} value={etiquette.nom}>
                      {etiquette.nom}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {success && (
            <p className="mx-16 text-body text-green-900 font-bold">
              {success}
            </p>
          )}
          {error && (
            <p className="mx-16 text-body text-red-800 font-bold">{error}</p>
          )}

          <div className="w-fit m-5">
            <IconButton
              icon={<Plus size={30} color="#0F0F0F" strokeWidth={2} />}
              label="Modifier"
              type="submit"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default UpdateRecipePage;
