import React, { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { IconButton } from "../Global/Buttons";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import RecipeComp from "../RecipeCards/RecipeComp";
import api from "../../api/api";

const HomeHeader = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/recettes");
  };

  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/recettes`);

      if (response && response.data) {
        setRecettes(response.data);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecettes();
  }, []);

  const top3Recettes = recettes
  .sort((a, b) => b.moyenne - a.moyenne)  // Sort in descending order
  .slice(0, 3);

  return (
    <header className='relative px-8 pt-7 pb-14 mb-10 bg-[url("assets/vectors/small_bottom_shape_curved.svg")] bg-bottom bg-cover'>
      <div className="flex justify-between items-center">
        <img
          src="/assets/vectors/Logo.svg"
          alt="Logo"
          className="w-60 h-auto"
        />
        <nav className="flex items-center space-x-4">
          <ul className="flex justify-between items-center list-none text-xl p-2">
            <li className="m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]">
              <Link to="/">Accueil</Link>
            </li>
            <li className="m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]">
              <Link to="/recettes">Liste des recettes</Link>
            </li>
          </ul>
          <Link to="/connexion">
            <IconButton
              icon={<UserRound color="#0F0F0F" />}
              label="Connexion"
            />
          </Link>
        </nav>
      </div>

      <h1 className="text-center text-5xl font-bold p-1 pb-5 m-2 my-5 mb-6">
        Les incontournables
      </h1>
      <div className="flex justify-between items-center text-white w-[70rem] mx-auto mb-10">
        {top3Recettes.map((recette, index) => (
          <RecipeComp
            key={recette.id_recette}
            id_recette={recette.id_recette}
            nom_recette={recette.nom}
            width={index === 1 ? '25rem' : '21rem'}
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

      {/* <SearchBar handleNavigate={handleNavigate} /> */}
    </header>
  );
};

export default HomeHeader;
