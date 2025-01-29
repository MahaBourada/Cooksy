import React from "react";
import Profile from "../../assets/vectors/profile.svg";
import FilledStar from "../../assets/vectors/goldFilledStar.svg";
import ReviewForm from "./ReviewForm";

const ReviewSection = ({ avis, onPostReview }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options); // Format the date in French
  };
  return (
    <section>
      <h1 className="text-4xl font-bold">Avis ({avis.length})</h1>
      
      <ReviewForm onPostReview={onPostReview} />
      <div>
        {avis.length === 0 ? (
          <p className="text-2xl my-16 flex flex-row items-center justify-center">
            Aucun avis pour le moment...
          </p>
        ) : (
          avis.map((avisIndividuel, index) => (
            <div key={index} className="flex items-start justify-start">
              <img src={Profile} alt="Profile" className="w-16 p-1 mx-4" />

              <div className="w-[80%] m-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-between w-72">
                    <h3 className="text-xl font-bold">
                      {avisIndividuel.nom_personne}
                    </h3>
                    <p className="text-lg text-gray-500">
                      {formatDate(avisIndividuel.date)}
                    </p>
                  </div>

                  <div className="flex items-center m-1">
                    {Array.from({ length: avisIndividuel.note }).map(
                      (_, index) => (
                        <img
                          key={index}
                          src={FilledStar}
                          alt="Etoile remplie"
                          className="w-6"
                        />
                      )
                    )}
                  </div>
                </div>

                <p className="text-lg m-1">{avisIndividuel.commentaire}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
