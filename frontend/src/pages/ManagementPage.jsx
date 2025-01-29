import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import AdminRecipeCard from "../components/RecipeCards/AdminRecipeCard";
import AdminHeader from "../components/Headers/AdminHeader";
import api from "../api/api";
import { TailSpin } from "react-loading-icons";
import CategoriesSection from "../components/CategoriesSection";
import EtiquettesSections from "../components/EtiquettesSections";

function ManagementPage() {
  const [recettes, setRecettes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [etiquettes, setEtiquettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successCategorie, setSuccessCategorie] = useState("");
  const [successEtiquette, setSuccessEtiquette] = useState("");
  const [errorCategorie, setErrorCategorie] = useState("");
  const [errorEtiquette, setErrorEtiquette] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseRecettes = await api.get(`/recettes`);
      const responseCategories = await api.get(`/categories`);
      const responseEtiquettes = await api.get(`/etiquettes`);

      if (responseRecettes && responseRecettes.data) {
        setRecettes(responseRecettes.data);
      }

      if (responseCategories && responseCategories.data) {
        setCategories(responseCategories.data);
      }

      if (responseEtiquettes && responseEtiquettes.data) {
        setEtiquettes(responseEtiquettes.data);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`ajouter-recette`, {
      state: {
        categories,
        etiquettes,
      },
    });
  };

  const [newEtiquette, setNewEtiquette] = useState("");

  const handleSubmitEtiquette = async (e) => {
    e.preventDefault();
    const etiquetteData = {
      nomEtiquette: newEtiquette,
    };

    try {
      const response = await api.post("/etiquettes", etiquetteData);

      setSuccessEtiquette("Etiquette ajoutée");
    } catch (error) {
      setErrorEtiquette(error.response.data.error);
    }
  };

  const [nomCategorie, setNomCategorie] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");

  const handleSubmitCategorie = async (e) => {
    e.preventDefault();
    const categorieData = {
      nomCategorie,
      sousCategorie,
    };

    try {
      const response = await api.post("/categories", categorieData);

      setSuccessCategorie("Sous catégorie ajoutée");
    } catch (error) {
      setErrorCategorie(error.response.data.error);
    }
  };

  return (
    <>
      <AdminHeader headerLabel="Tableau de bord" />
      <main className="flex-grow mx-24 my-6">
        <div className="flex items-start justify-between m-4">
          <div className="w-1/2">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold m-1">Recettes</h2>
              <div onClick={handleNavigate} className="cursor-pointer">
                <Plus
                  size={32}
                  color="#0F0F0F"
                  strokeWidth={3}
                  className="hover:translate-x-[1px] hover:translate-y-[1px]"
                />
              </div>
            </div>

            {loading ? (
              <TailSpin
                fill="#0F0F0F"
                stroke="#0F0F0F"
                strokeWidth={2}
                width="75"
                height="75"
                className="m-auto my-40"
              />
            ) : recettes.length === 0 ? (
              <p className="text-2xl flex flex-row justify-center my-16">
                Aucune recette enregistrée
              </p>
            ) : (
              recettes.map((recette) => (
                <AdminRecipeCard
                  key={recette.id_recette}
                  setRecettes={setRecettes}
                  id_recette={recette.id_recette}
                  nom_recette={recette.nom}
                  width="24rem"
                  notes={Math.floor(recette.moyenne)}
                  chemin_photo={recette.chemin_photo}
                  desc={recette.description}
                  temps_preparation={recette.temps_preparation}
                  temps_cuisson={recette.temps_cuisson}
                  personnes={recette.personnes}
                  cout={recette.texte_cout}
                  niveau_recette={recette.niveau_recette}
                  intensite_niveau={recette.intensite_niveau}
                  intensite_type={recette.intensite_type}
                  categorieNom={recette.nom_categorie}
                  sousCategorie={recette.sous_categorie}
                  categories={categories}
                  etiquettes={etiquettes}
                />
              ))
            )}
          </div>

          <div className="w-[43%]">
            {loading ? (
              <TailSpin
                fill="#0F0F0F"
                stroke="#0F0F0F"
                strokeWidth={2}
                width="75"
                height="75"
                className="m-auto my-40"
              />
            ) : Object.keys(categories).length === 0 ? (
              <p className="text-2xl flex flex-row justify-center my-16">
                Aucune catégorie enregistrée
              </p>
            ) : (
              <CategoriesSection
                handleSubmitCategorie={handleSubmitCategorie}
                categories={categories}
                setCategories={setCategories}
                nomCategorie={nomCategorie}
                sousCategorie={sousCategorie}
                setNomCategorie={setNomCategorie}
                setSousCategorie={setSousCategorie}
                success={successCategorie}
                setSuccess={setSuccessCategorie}
                error={errorCategorie}
                setError={setErrorCategorie}
              />
            )}

            {loading ? (
              <TailSpin
                fill="#0F0F0F"
                stroke="#0F0F0F"
                strokeWidth={2}
                width="75"
                height="75"
                className="m-auto my-40"
              />
            ) : etiquettes.length === 0 ? (
              <p className="text-2xl flex flex-row justify-center my-16">
                Aucune étiquette enregistrée
              </p>
            ) : (
              <EtiquettesSections
                handleSubmitEtiquette={handleSubmitEtiquette}
                etiquettes={etiquettes}
                setEtiquettes={setEtiquettes}
                newEtiquette={newEtiquette}
                setNewEtiquette={setNewEtiquette}
                success={successEtiquette}
                setSuccess={setSuccessEtiquette}
                error={errorEtiquette}
                setError={setErrorEtiquette}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ManagementPage;
