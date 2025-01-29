import { Pen, Plus, Trash2 } from "lucide-react";
import React from "react";
import api from "../api/api";

const EtiquettesSections = ({
  handleSubmitEtiquette,
  etiquettes,
  setEtiquettes,
  newEtiquette,
  setNewEtiquette,
  success,
  setSuccess,
  error,
  setError,
}) => {
  const handleDelete = async (id_etiquette) => {
    try {
      const response = await api.delete("/etiquettes", {
        data: { id_etiquette },
      });

      setSuccess(response.data.message);

      setEtiquettes((prevEtiquettes) => {
        // Filter out the deleted etiquette by id
        return prevEtiquettes.filter(
          (etiquette) => etiquette.id_etiquette !== id_etiquette
        );
      });
    } catch (error) {
      setError(response.data.error);
    }
  };

  const handleUpdate = async (id_etiquette, newNomEtiquette) => {
    try {
      // Call the API to update the etiquette
      const response = await api.put("/etiquettes", {
        id_etiquette,
        nom: newNomEtiquette,
      });

      setSuccess(response.data.message);

      // Update the local state to reflect the change
      setEtiquettes((prevEtiquettes) => {
        // Create a new object to avoid mutating the previous state
        const updatedEtiquettes = [...prevEtiquettes];

        // Find and update the etiquette with the matching id_etiquette
        const etiquetteIndex = updatedEtiquettes.findIndex(
          (etiquette) => etiquette.id_etiquette === id_etiquette
        );

        if (etiquetteIndex !== -1) {
          updatedEtiquettes[etiquetteIndex] = {
            ...updatedEtiquettes[etiquetteIndex],
            nom: newNomEtiquette,
          };
        }

        // Return the updated list of etiquettes
        return updatedEtiquettes;
      });
    } catch (error) {
      setError(response.data.error);
    }
  };

  return (
    <form className="m-1 mb-8" onSubmit={handleSubmitEtiquette}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold m-1">Etiquettes</h2>
        <button type="submit">
          <Plus
            size={32}
            color="#0F0F0F"
            strokeWidth={3}
            className="hover:translate-x-[1px] hover:translate-y-[1px]"
          />
        </button>
      </div>

      <div className="m-4">
        <label htmlFor="etiquette" className="text-body">
          Nom de l'étiquette
        </label>
        <input
          id="etiquette"
          type="text"
          value={newEtiquette}
          onChange={(e) => setNewEtiquette(e.target.value)}
          required
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

      <ul className="list-disc m-2 mx-16 text-body">
        {etiquettes.map((etiquette, index) => (
          <li
            key={etiquette.id_etiquette}
            className="flex flex-row items-center justify-between"
          >
            {etiquette.isEditing ? (
              <input
                type="text"
                value={etiquette.newNom}
                onChange={(e) => {
                  const updatedEtiquettes = [...etiquettes];
                  updatedEtiquettes[index].newNom = e.target.value;
                  setEtiquettes(updatedEtiquettes);
                }}
                onBlur={() =>
                  handleUpdate(etiquette.id_etiquette, etiquette.newNom)
                }
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-1 px-2"
                autoFocus
              />
            ) : (
              <p>● {etiquette.nom}</p>
            )}

            <div>
              <button
                type="button"
                onClick={() => {
                  const updatedEtiquettes = [...etiquettes];
                  updatedEtiquettes[index].isEditing = true;
                  updatedEtiquettes[index].newNom = etiquette.nom;
                  setEtiquettes(updatedEtiquettes);
                }}
                className="m-2 hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <Pen size={30} color="#0F0F0F" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(etiquette.id_etiquette)}
                className="m-2 hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <Trash2 size={30} color="#aa0909" strokeWidth={2.5} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default EtiquettesSections;
