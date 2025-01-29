import { Star } from "lucide-react";
import FilledStar from "../../assets/vectors/filledStar.svg";
import emptyImage from "../../assets/images/EmptyImageNoBorder.png";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeComp = ({
  width,
  id_recette,
  nom_recette,
  notes,
  chemin_photo,
  desc,
  temps_preparation,
  temps_cuisson,
  personnes,
  nom_categorie,
  sous_categorie,
  cout,
  niveau_recette,
  intensite_niveau,
  intensite_type,
}) => {
  const truncatedNomRecette =
    nom_recette.length > 10 ? nom_recette.slice(0, 10) + "..." : nom_recette;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/details-recette/${id_recette}`, {
      state: {
        id_recette,
        nom_recette,
        notes,
        chemin_photo,
        desc,
        temps_preparation,
        temps_cuisson,
        personnes,
        nom_categorie,
        cout,
        niveau_recette,
        sous_categorie,
        intensite_niveau,
        intensite_type,
      },
    });
  };
  
  return (
    <div
      onClick={handleNavigate}
      className="hover:underline hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
    >
      <div
        className={`relative p-9 py-7 ${
          width ? `w-${width} h-${width}` : "w-80 h-80"
        } rounded-tl-[70px] rounded-br-[70px] border-black border-4 shadow-custom-box hover:shadow-none`}
        style={{
          backgroundImage: chemin_photo
            ? `linear-gradient(rgba(114, 114, 114, 0.8), transparent 75%), url(http://localhost/cooksy-api/${chemin_photo})`
            : `url(${emptyImage})`,
          backgroundPosition: "center",
          backgroundSize: chemin_photo ? "cover" : "50%",
          backgroundRepeat: "no-repeat",
          backgroundColor: chemin_photo ? "transparent" : "#CCCCCC",
          width: width ? width : "20rem",
          height: width ? width : "20rem",
        }}
      >
        <h2 className="text-4xl font-semibold">{truncatedNomRecette}</h2>

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

export default RecipeComp;
