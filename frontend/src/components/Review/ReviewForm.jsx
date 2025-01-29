import React, { useState } from "react";
import { NoIconButton } from "../Global/Buttons";
import { useParams } from "react-router-dom";
import Cake from "../../assets/images/Cake.png";

const ReviewForm = ({ onPostReview }) => {
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [note, setNote] = useState("");
  const [commentaire, setCommentaire] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rectteId: id, // Make sure you have access to the correct recipe ID
      nomPersonne: nom,
      note,
      commentaire,
    };

    onPostReview(reviewData); // Trigger parent component's function to handle review
  };

  return (
    <div className="relative flex items-start">
      <form className="m-6 w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col w-full mr-2">
            <label htmlFor="nom" className="text-body">
              Nom
            </label>
            <input
              required
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              type="text"
              name="nom"
              className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
            />
          </div>

          <div className="flex flex-col w-full ml-2">
            <label htmlFor="note" className="text-body">
              Note
            </label>
            <select
              required
              name="note"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
            >
              <option value="">Note</option>
              <option value="1">1 étoile</option>
              <option value="2">2 étoiles</option>
              <option value="3">3 étoiles</option>
              <option value="4">4 étoiles</option>
              <option value="5">5 étoiles</option>
            </select>
          </div>
        </div>

        <label htmlFor="commentaire" className="text-body">
          Commentaire
        </label>
        <textarea
          required
          id="commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          type="text"
          name="commentaire"
          className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
        />

        <div className="flex flex-row items-center justify-end">
          <NoIconButton label="Publier" bgColor="bg-secondary" type="submit" />
          <NoIconButton
            label="Annuler"
            bgColor="bg-transparent"
            type="reset"
            borderColor={true}
          />
        </div>
      </form>

      <img
        src={Cake}
        alt="Cake"
        className="absolute right-0 -top-32 w-[26rem] p-2"
      />
    </div>
  );
};

export default ReviewForm;
