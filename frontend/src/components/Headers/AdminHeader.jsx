import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import api from "../../api/api";

const AdminHeader = ({ headerLabel }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      navigate("/connexion");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className='relative px-8 pt-7 pb-10 bg-[url("assets/vectors/small_bottom_shape.svg")] bg-bottom bg-cover'>
      <div className="flex justify-between items-center">
        <img
          src="/assets/vectors/Logo.svg"
          alt="Logo"
          className="w-60 h-auto"
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
          <div className="flex items-center bg-[#D57070] text-black text-xl h-12 py-1 px-5 rounded-full shadow-custom-box hover:translate-x-[1px] hover:translate-y-[1px] hover:opacity-80 hover:shadow-none">
            <LogOut size={30} color="#0F0F0F" />
            <button className="px-2" type="button" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </nav>
      </div>

      <h1 className="text-5xl font-bold p-1 m-2 mx-10 mt-10">{headerLabel}</h1>
    </header>
  );
};

export default AdminHeader;
