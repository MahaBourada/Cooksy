import { Pen, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import api from "../api/api";

const CategoriesSection = ({
  handleSubmitCategorie,
  categories,
  setCategories,
  nomCategorie,
  sousCategorie,
  setNomCategorie,
  setSousCategorie,
  success,
  setSuccess,
  error,
  setError,
}) => {
  const handleDelete = async (id_categorie) => {
    try {
      await api.delete("/categories", { data: { id_categorie } });

      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };

        Object.keys(updatedCategories).forEach((categorie) => {
          updatedCategories[categorie] = updatedCategories[categorie].filter(
            (sub) => sub.id_categorie !== id_categorie
          );
        });

        return updatedCategories;
      });

      setSuccess(response.data.message)
    } catch (error) {
      setError(response.data.error);
    }
  };

  const handleUpdate = async (id_categorie, newSousCategorie) => {
    try {
      // Call the API to update the category
      const response = await api.put("/categories", {
        id_categorie,
        sous_categorie: newSousCategorie,
      });

      setSuccess(response.data.message);

      // Update the local state to reflect the change
      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };

        // Loop through the categories
        Object.keys(updatedCategories).forEach((categorie) => {
          updatedCategories[categorie] = updatedCategories[categorie].map(
            (sub) => {
              // Find the subcategory with the matching id_categorie and update the sous_categorie
              if (sub.id_categorie === id_categorie) {
                return { ...sub, sous_categorie: newSousCategorie };
              }
              return sub;
            }
          );
        });

        return updatedCategories;
      });
    } catch (error) {
      setError(response.data.error);
    }
  };

  return (
    <form className="m-1 mb-8" onSubmit={handleSubmitCategorie}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold m-1">Sous-catégories</h2>
        <button type="submit">
          <Plus
            size={32}
            color="#0F0F0F"
            strokeWidth={3}
            className="hover:translate-x-[1px] hover:translate-y-[1px]"
          />
        </button>
      </div>

      <div className="flex flex-col m-4">
        <label htmlFor="categorie" className="absolute right-[5555px]">
          Catégorie
        </label>
        <select
          name="categorie"
          id="categorie"
          value={nomCategorie}
          onChange={(e) => setNomCategorie(e.target.value)}
          className="text-body bg-transparent border-black border-[0.5px] rounded-2xl p-2.5 mb-4 w-full"
        >
          <option value="" disabled>
            Catégorie
          </option>
          {Object.keys(categories).map((categorie, index) => (
            <option key={index} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>

        <label htmlFor="sous-categorie" className="text-body">
          Nom de la sous-tégorie
        </label>
        <input
          id="sous-categorie"
          type="text"
          required
          value={sousCategorie}
          onChange={(e) => setSousCategorie(e.target.value)}
          className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
        />

        {success && (
          <p className="text-center text-xl font-bold text-green-900">
            {success}
          </p>
        )}
        {error && (
          <p className="text-center text-xl font-bold text-red-800">{error}</p>
        )}
      </div>

      <ul className="list-none m-2 mx-16 text-body">
        {Object.entries(categories).map(([categorie, subcategories], index) => (
          <div key={index}>
            <li>● {categorie}</li>
            <ul className="list-disc ml-6">
              {subcategories.map((sub, subIndex) => (
                <li
                  key={subIndex}
                  className="flex flex-row items-center justify-between"
                >
                  {sub.isEditing ? (
                    <input
                      type="text"
                      value={sub.newSousCategorie}
                      onChange={(e) => {
                        const updatedCategories = { ...categories };
                        updatedCategories[categorie][
                          subIndex
                        ].newSousCategorie = e.target.value;
                        setCategories(updatedCategories);
                      }}
                      onBlur={() =>
                        handleUpdate(sub.id_categorie, sub.newSousCategorie)
                      }
                      className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-1 px-2"
                    />
                  ) : (
                    <p>● {sub.sous_categorie}</p>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedCategories = { ...categories };
                        updatedCategories[categorie][subIndex].isEditing = true;
                        updatedCategories[categorie][
                          subIndex
                        ].newSousCategorie = sub.sous_categorie;
                        setCategories(updatedCategories);
                      }}
                      className="m-2 hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      <Pen size={30} color="#0F0F0F" strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(sub.id_categorie)}
                      className="m-2 hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      <Trash2 size={30} color="#aa0909" strokeWidth={2.5} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </form>
  );
};

export default CategoriesSection;
