import React, { useEffect, useState } from "react";
import SearchHeader from "../components/Headers/SearchHeader";
import FilterFunc from "../components/FilterFunc";
import RecipeComp from "../components/RecipeCards/RecipeComp";
import { TailSpin } from "react-loading-icons";
import api from "../api/api";

function RecipesListPage() {
  const [recettes, setRecettes] = useState([]);
  const [etiquettes, setEtiquettes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [etiquette, setEtiquette] = useState("");
  const [difficulte, setDifficulte] = useState("");
  const [classement, setClassement] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");
  const [cout, setCout] = useState("");
  const [intensite, setIntensite] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseRecettes = await api.get(`/recettes`);
      const responseEtiquettes = await api.get(`/etiquettes`);
      const responseCategories = await api.get(`/categories`);

      if (responseRecettes && responseRecettes.data) {
        const recettesWithDetails = await Promise.all(
          responseRecettes.data.map(async (recette) => {
            const [responseIngredients, responseEtiquettes] = await Promise.all(
              [
                api.get(`/recettes/${recette.id_recette}/ingredients`),
                api.get(`/recettes/${recette.id_recette}/etiquettes`),
              ]
            );
            return {
              ...recette,
              ingredients: responseIngredients.data || [], // Add ingredients to each recipe
              etiquettes: responseEtiquettes.data || [],
            };
          })
        );

        setRecettes(recettesWithDetails); // Update state with enriched data
      }

      if (responseEtiquettes && responseEtiquettes.data) {
        setEtiquettes(responseEtiquettes.data);
      }

      if (responseCategories && responseCategories.data) {
        setCategories(responseCategories.data);
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

  // Utility function to remove accents and special characters
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Function to search AND filter recipes based on the search term AND the selected filters
  const filteredRecettes = recettes.filter((recette) => {
    const searchTermLower = searchTerm.toLowerCase();

    const nameMatch = removeAccents(recette.nom.toLowerCase()).includes(
      removeAccents(searchTermLower)
    );

    const categoryMatch = removeAccents(
      recette.nom_categorie.toLowerCase()
    ).includes(removeAccents(searchTermLower));

    const ingredientMatch = recette.ingredients.some((ingredient) =>
      removeAccents(ingredient.nom_ingredient.toLowerCase()).includes(
        removeAccents(searchTermLower)
      )
    );

    const difficulteMatch =
      !difficulte || recette.niveau_recette === difficulte;

    const classementMatch =
      !classement || Math.floor(recette.moyenne) == classement; //Since it's a number comparison, we use == and not ===

    const coutMatch = !cout || recette.texte_cout === cout;

    const intensiteMatch = !intensite || recette.intensite_type === intensite;

    const sousCategorieMatch =
      !sousCategorie || recette.sous_categorie === sousCategorie;

    const etiquetteMatch =
      !etiquette ||
      recette.etiquettes.some(
        (oneEtiquette) => oneEtiquette.nom_etiquette === etiquette
      );

    return (
      difficulteMatch &&
      classementMatch &&
      coutMatch &&
      intensiteMatch &&
      etiquetteMatch &&
      sousCategorieMatch &&
      (nameMatch || categoryMatch || ingredientMatch)
    );
  });

  const handleReset = () => {
    setSearchTerm("");
    setEtiquette("");
    setDifficulte("");
    setClassement("");
    setSousCategorie("");
    setCout("");
    setIntensite("");
    setRecettes(recettes);
  };

  return (
    <>
      <SearchHeader setSearchTerm={setSearchTerm} handleReset={handleReset} />
      <main className="flex-grow mx-24">
        <FilterFunc
          handleReset={handleReset}
          etiquettes={etiquettes}
          categories={categories}
          etiquette={etiquette}
          difficulte={difficulte}
          classement={classement}
          sousCategorie={sousCategorie}
          cout={cout}
          intensite={intensite}
          setEtiquette={setEtiquette}
          setDifficulte={setDifficulte}
          setClassement={setClassement}
          setSousCategorie={setSousCategorie}
          setCout={setCout}
          setIntensite={setIntensite}
        />
        <h1 className="text-center text-5xl font-bold p-1 pb-5 m-1 my-6">
          Nos recettes
        </h1>
        {loading ? (
          <TailSpin
            fill="#0F0F0F"
            stroke="#0F0F0F"
            strokeWidth={2}
            width="75"
            height="75"
            className="m-auto mt-10 mb-20"
          />
        ) : filteredRecettes.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 justify-items-center w-[80rem] text-white mx-auto mb-20">
            {filteredRecettes.map((recette) => (
              <RecipeComp
                key={recette.id_recette}
                id_recette={recette.id_recette}
                nom_recette={recette.nom}
                width="24rem"
                notes={Math.floor(recette.moyenne)}
                chemin_photo={recette.chemin_photo}
                desc={recette.description}
                temps_preparation={recette.temps_preparation}
                temps_cuisson={recette.temps_cuisson}
                personnes={recette.personnes}
                nom_categorie={recette.nom_categorie}
                sous_categorie={recette.sous_categorie}
                cout={recette.texte_cout}
                niveau_recette={recette.niveau_recette}
                intensite_niveau={recette.intensite_niveau}
                intensite_type={recette.intensite_type}
              />
            ))}
          </div>
        ) : (
          <p className="text-black text-2xl flex flex-row justify-center items-center mb-28">
            Pas de résultats
          </p>
        )}
      </main>
    </>
  );
}

export default RecipesListPage;
