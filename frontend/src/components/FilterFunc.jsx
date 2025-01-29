import { ChevronDown, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { NoIconButton } from "./Global/Buttons";

const FilterFunc = ({
  etiquettes,
  categories,
  etiquette,
  difficulte,
  classement,
  sousCategorie,
  cout,
  intensite,
  setEtiquette,
  setDifficulte,
  setClassement,
  setSousCategorie,
  setCout,
  setIntensite,
  handleReset,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (!show) setShow(true);
    else setShow(false);
  };

  return (
    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-between items-center w-fit m-5 mx-10">
        <SlidersHorizontal color="#0F0F0F" size={35} strokeWidth={3} />
        <button
          type="button"
          onClick={handleShow}
          className="flex items-center text-3xl font-bold mx-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]"
        >
          <p className="mx-2">Filtres</p>
          <ChevronDown color="#0F0F0F" size={35} strokeWidth={3} />
        </button>
      </div>

      {show && (
        <>
          <div className="m-auto">
            <div>
              <label htmlFor="etiquette" className="absolute right-[5555px]">
                Etiquette
              </label>
              <select
                name="etiquette"
                id="etiquette"
                value={etiquette}
                onChange={(e) => setEtiquette(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-2.5 m-1 mx-2 mb-3 w-80"
              >
                <option value="">Etiquette</option>
                {etiquettes.map((etiquette) => (
                  <option value={etiquette.nom}>{etiquette.nom}</option>
                ))}
              </select>

              <label htmlFor="difficulte" className="absolute right-[5555px]">
                Difficulté
              </label>
              <select
                name="difficulte"
                id="difficulte"
                value={difficulte}
                onChange={(e) => setDifficulte(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-3 m-1 mx-2 mb-3 w-80"
              >
                <option value="">Difficulté</option>
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>

              <label htmlFor="classement" className="absolute right-[5555px]">
                Note
              </label>
              <select
                name="classement"
                id="classement"
                value={classement}
                onChange={(e) => setClassement(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-3 m-1 mx-2 mb-3 w-80"
              >
                <option value="">Note</option>
                <option value="1">1 étoile</option>
                <option value="2">2 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="5">5 étoiles</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="souscategorie"
                className="absolute right-[5555px]"
              >
                Sous-catégorie
              </label>
              <select
                name="souscategorie"
                id="souscategorie"
                value={sousCategorie}
                onChange={(e) => setSousCategorie(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-3 m-1 mx-2 mb-3 w-80"
              >
                <option value="">Sous-catégorie</option>
                {Object.values(categories)
                  .flat()
                  .map((subcategorie, index) => (
                    <option key={index} value={subcategorie.sous_categorie}>
                      {subcategorie.sous_categorie}
                    </option>
                  ))}
              </select>

              <label htmlFor="cout" className="absolute right-[5555px]">
                Coût
              </label>
              <select
                name="cout"
                id="cout"
                value={cout}
                onChange={(e) => setCout(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-3 m-1 mx-2 mb-3 w-80"
              >
                <option value="">Coût</option>
                <option value="Pas cher">Pas cher</option>
                <option value="Bon marché">Bon marché</option>
                <option value="Cher">Cher</option>
              </select>

              <label htmlFor="intensite" className="absolute right-[5555px]">
                Intensité
              </label>
              <select
                name="intensite"
                id="intensite"
                value={intensite}
                onChange={(e) => setIntensite(e.target.value)}
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-3 m-1 mx-2 mb-3 w-80"
              >
                <option value="">Intensité</option>
                <option value="Epicé">Epicé</option>
                <option value="Alcoolisé">Alcoolisé</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end mx-16">
            <NoIconButton
              label="Réinitialiser"
              type="reset"
              bgColor="bg-background"
              borderColor={true}
              onClick={handleReset}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default FilterFunc;
