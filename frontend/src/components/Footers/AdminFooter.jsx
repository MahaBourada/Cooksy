import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <footer className='px-8 py-1 bg-[url("assets/vectors/small_up_shape.svg")] bg-cover'>
      <div className="flex justify-between items-center mx-1 pt-10">
        <img
          src="/assets/vectors/Logo.svg"
          alt="Logo"
          className="w-[10rem] h-auto p-2"
        />
        <nav className="flex items-center space-x-4">
          <ul className="flex justify-between items-center list-none text-xl p-2">
            <li className="m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]">
              <Link to="/gestion">Tableau de bord</Link>
            </li>
            <li className="m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]">
              <Link to="/gestion">Recettes</Link>
            </li>
            <li className="m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]">
              <Link to="/gestion">Sous-catégories</Link>
            </li>
            <li className="m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]">
              <Link to="/gestion">Etiquettes</Link>
            </li>
          </ul>
        </nav>
      </div>

      <hr className="my-1 border-black bg-black h-[1.5px] rounded-full" />

      <div className="flex justify-between items-end mx-3 text-lg">
        <div className="flex space-x-4 items-center p-2">
          <Youtube size={42} color="#0F0F0F" strokeWidth={1.5} />
          <Instagram color="#0F0F0F" size={30} />
          <Twitter color="#0F0F0F" size={30} />
          <Facebook color="#0F0F0F" size={30} />
        </div>
        <p className="p-2">
          <span className="underline">Droit d'auteur</span> ©{" "}
          <span className="underline">2024 Tous droits réservés</span>
        </p>
        <p className="p-2">
          <span className="underline">Termes</span> &{" "}
          <span className="underline">Conditions</span>
        </p>
      </div>
    </footer>
  );
}

export default AdminFooter;
