import React, { useEffect, useState } from "react";
import NoSearchHeader from "../components/Headers/NoSearchHeader.jsx";
import kitchen_1 from "../assets/images/kitchen_1.png";
import kitchen_2 from "../assets/images/kitchen_2.png";
import FilledStar from "../assets/vectors/goldFilledStar.svg";
import emptyImage from "../assets/images/EmptyImage.png";
import {
  ChefHat,
  Clock,
  Coins,
  CookingPot,
  Drumstick,
  NotebookText,
  Soup,
  Star,
  Tag,
  Utensils,
} from "lucide-react";
import ReviewSection from "../components/Review/ReviewSection.jsx";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/api.js";

function RecipeDetailsPage() {
  const location = useLocation();
  const {
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
    intensite_type,
    intensite_niveau,
  } = location.state || {};

  const [ingredients, setIngredients] = useState([]);
  const [etapes, setEtapes] = useState([]);
  const [etiquettes, setEtiquettes] = useState([]);
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseIngredients = await api.get(`/recettes/${id}/ingredients`);
      const responseEtapes = await api.get(`/recettes/${id}/etapes`);
      const responseEtiquettes = await api.get(`/recettes/${id}/etiquettes`);
      const responseAvis = await api.get(`/avis/${id}`);

      if (responseAvis && responseAvis.data) {
        setAvis(responseAvis.data);
      }

      if (responseIngredients && responseIngredients.data) {
        setIngredients(responseIngredients.data);
      }

      if (responseEtapes && responseEtapes.data) {
        setEtapes(responseEtapes.data);
      }

      if (responseEtiquettes && responseEtiquettes.data) {
        setEtiquettes(responseEtiquettes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onPostReview = async (reviewData) => {
    try {
      await api.post("/avis", reviewData);

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NoSearchHeader />
      <main className="flex-grow p-1 px-32 mt-10 mb-20">
        <div className="flex justify-between items-center mb-16">
          <img
            src={
              chemin_photo
                ? `http://localhost/cooksy-api/${chemin_photo}`
                : emptyImage
            }
            width={450}
            height={450}
            alt={`Image de ${nom_recette}`}
            className="w-[425px] h-[425px] rounded-[50px] m-auto p-2"
          />

          <div className="p-2 m-5 w-[55%]">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-5xl font-bold">{nom_recette}</h1>
              <div className="mx-3 flex flex-row items-end">
                <p className="text-2xl mx-2">{intensite_type}</p>
                <div className="flex flex-row items-center">
                  {Array.from({
                    length:
                      intensite_niveau === "Faible"
                        ? 1
                        : intensite_niveau === "Modéré"
                        ? 2
                        : intensite_niveau === "Elevé"
                        ? 3
                        : 0,
                  }).map((_, index) => (
                    <Soup key={index} size={36} color="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between text-2xl m-3">
              <div>
                <div className="flex items-center my-1">
                  <Clock
                    size={30}
                    color="#0F0F0F"
                    strokeWidth={3}
                    className="m-0.5"
                  />
                  <p className="m-1">{temps_preparation} minutes</p>
                </div>
                <div className="flex items-center my-1">
                  <CookingPot
                    size={30}
                    color="#0F0F0F"
                    strokeWidth={3}
                    className="m-0.5"
                  />
                  <p className="m-1">{temps_cuisson} minutes</p>
                </div>

                <div>
                  <div className="flex items-center my-1">
                    <Tag
                      size={30}
                      color="#0F0F0F"
                      strokeWidth={3}
                      className="m-0.5"
                    />
                    <p className="m-1">
                      <b>Etiquettes : </b> <br />
                    </p>
                  </div>
                  <p className="mx-3 my-1">
                    {etiquettes && etiquettes.length > 0 ? (
                      etiquettes.map((etiquette, index) => (
                        <span key={index} className="inline">
                          {etiquette.nom_etiquette}
                          {index !== etiquettes.length - 1 && ", "}
                        </span>
                      ))
                    ) : (
                      <span>Pas d'étiquettes</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center my-1">
                  <p className="m-1">
                    {nom_categorie} - {sous_categorie}
                  </p>
                  <Drumstick
                    size={30}
                    color="#0F0F0F"
                    strokeWidth={2.5}
                    className="m-0.5"
                  />
                </div>
                <div className="flex items-center my-1">
                  <p className="m-1">{personnes} personnes</p>
                  <Utensils
                    size={30}
                    color="#0F0F0F"
                    strokeWidth={2.5}
                    className="m-0.5"
                  />
                </div>
                <div className="flex items-center my-1">
                  <p className="m-1">{cout}</p>
                  <Coins
                    size={30}
                    color="#0F0F0F"
                    strokeWidth={2.5}
                    className="m-0.5"
                  />
                </div>
                <div className="flex items-center my-1">
                  <p className="m-1">{niveau_recette}</p>
                  <ChefHat
                    size={28}
                    color="#0F0F0F"
                    strokeWidth={2.5}
                    className="m-0.5"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Description</h2>
              <div className="flex">
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
                      <Star key={i} color="#E67300" strokeWidth={2.75} />
                    ))}
                  </>
                ) : (
                  <div className="text-2xl flex items-center my-1 m-1">
                    <p className="m-1">Pas d'avis</p>
                    <NotebookText
                      size={28}
                      color="#0F0F0F"
                      strokeWidth={2.5}
                      className="m-0.5"
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className="my-5 border-black bg-black h-[1.5px] rounded-full" />

            <p className="text-2xl p-1 mx-3">{desc}</p>
          </div>
        </div>

        <div className="flex justify-between items-start mb-16">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold">Ingrédients</h1>
            <ul className="list-disc p-5 px-12 text-2xl">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.nom_ingredient}
                  {ingredient.quantite &&
                    ` (${ingredient.quantite}${
                      ingredient.mesure ? ` ${ingredient.mesure}` : ""
                    })`}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={kitchen_1}
            alt="Quelqu'un qui cuisine"
            className="w-[50%] rounded-[50px] m-auto p-1"
          />
        </div>

        <div className="flex justify-between items-start mb-16">
          <img
            src={kitchen_2}
            alt="Quelqu'un qui cuisine"
            className="w-[50%] rounded-[50px] m-auto p-1"
          />

          <div className="w-1/2">
            <h1 className="text-4xl font-bold">Etapes</h1>
            <ol className="list-decimal p-5 px-12 text-2xl">
              {etapes.map((etape, index) => (
                <li key={index}>{etape.texte_etape}</li>
              ))}
            </ol>
          </div>
        </div>

        <ReviewSection avis={avis} onPostReview={onPostReview} />
      </main>
    </>
  );
}

export default RecipeDetailsPage;
