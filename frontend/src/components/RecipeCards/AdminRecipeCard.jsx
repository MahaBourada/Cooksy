import React from "react";
import FilledStar from "../../assets/vectors/filledStar.svg";
import emptyImage from "../../assets/images/EmptyImageNoBorder.png";
import { Pen, Star, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const AdminRecipeCard = ({
  id_recette,
  setRecettes,
  nom_recette,
  notes,
  chemin_photo,
  desc,
  temps_preparation,
  temps_cuisson,
  personnes,
  categories,
  etiquettes,
  cout,
  niveau_recette,
  intensite_niveau,
  intensite_type,
  categorieNom,
  sousCategorie,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Example: Add logic before navigating
    navigate(`modifier-recette/${id_recette}`, {
      state: {
        id_recette,
        nom_recette,
        notes,
        chemin_photo,
        desc,
        temps_preparation,
        temps_cuisson,
        personnes,
        cout,
        niveau_recette,
        intensite_niveau,
        intensite_type,
        categories,
        etiquettes,
        categorieNom,
        sousCategorie,
      },
    });
  };

  const handleDelete = async (id_recette) => {
    try {
      await api.delete("/recettes", { data: { id_recette } });

      setRecettes((prevRecettes) => {
        // Filter out the deleted recette by id
        return prevRecettes.filter(
          (recette) => recette.id_recette !== id_recette
        );
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const truncatedNomRecette =
    nom_recette.length > 25 ? nom_recette.slice(0, 25) + "..." : nom_recette;

  return (
    <div className="text-white hover:underline m-2 mt-6 mb-8">
      <div
        className={`relative bg-cover bg-center p-6 px-9 w-full h-40 rounded-tl-[70px] rounded-br-[70px] border-black border-4 shadow-custom-box hover:shadow-none`}
        style={{
          backgroundImage: chemin_photo
            ? `linear-gradient(rgba(114, 114, 114, 0.8), transparent 75%), url(http://localhost/cooksy-api/${chemin_photo})`
            : `url(${emptyImage})`,
          backgroundPosition: "center",
          backgroundSize: chemin_photo ? "cover" : "17%",
          backgroundRepeat: "no-repeat",
          backgroundColor: chemin_photo ? "transparent" : "#CCCCCC",
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-3xl font-semibold">{truncatedNomRecette}</h2>
          <div>
            <button
              type="button"
              onClick={handleNavigate}
              className="m-2 hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <Pen size={30} color="currentColor" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className="m-2 hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <Trash2
                onClick={() => handleDelete(id_recette)}
                size={30}
                color="#aa0909"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
        <div className="flex absolute bottom-8 right-8">
          {notes ? (
            <>
              {Array.from({ length: notes }).map((_, i) => (
                <img
                  key={i}
                  src={FilledStar}
                  alt="Etoile remplie"
                  className="w-6"
                />
              ))}
              {Array.from({ length: 5 - notes }).map((_, i) => (
                <Star key={i} color="#FFFFFF" strokeWidth={2.75} />
              ))}
            </>
          ) : (
            <p className="text-2xl">Pas d'avis</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRecipeCard;
