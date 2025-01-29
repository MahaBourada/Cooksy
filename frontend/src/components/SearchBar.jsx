import { X } from "lucide-react";
import React from "react";

const SearchBar = ({ setSearchTerm, handleReset }) => {
  return (
    <form className="absolute left-1/2 transform -translate-x-1/2 bottom-[-1.5rem] flex justify-center items-center w-full max-w-[80%]">
      <input
        aria-label="Rechercher recette"
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="text-xl w-1/2 h-[3.75rem] rounded-full px-7 py-5 shadow-custom-box focus:outline-none text-black"
        placeholder="Rechercher une recette"
      />
      <button type="reset" className="relative" onClick={handleReset}>
        <X
          color="#333333"
          size={35}
          className="absolute right-5 top-1/2 transform -translate-y-1/2  hover:translate-x-[1px] hover:-translate-y-[45%]"
        />
      </button>
    </form>
  );
};

export default SearchBar;
