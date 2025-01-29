import React, { useState } from "react";
import NoSearchHeader from "../components/Headers/NoSearchHeader";
import { BigButton } from "../components/Global/Buttons";
import kitchen_3 from "../assets/images/kitchen_3.png";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePassword = () => {
    if (!show) setShow(true);
    else setShow(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    try {
      await api.post("/login", loginData, {
        withCredentials: true,
      });

      navigate("/gestion");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <NoSearchHeader />
      <main className="flex-grow flex justify-center items-center">
        <img src={kitchen_3} alt="Cuisine" className="w-[43rem] p-10 m-6" />

        <form
          className="flex flex-col justify-start p-2 m-10"
          onSubmit={handleLogin}
        >
          <h1 className="text-5xl font-bold p-1 my-4">Bienvenue !</h1>

          <div className="w-[30rem] flex flex-col">
            <label htmlFor="username" className="text-body">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
            />

            <label htmlFor="password" className="text-body">
              Mot de passe
            </label>

            <div className="relative w-full">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={!show ? "password" : "text"}
                required
                className="text-body bg-transparent border-black border-[0.5px] rounded-2xl py-3 p-4 m-1 mb-3 w-full"
              />
              <button type="button" onClick={handlePassword}>
                {!show ? (
                  <Eye
                    color="#333333"
                    size={35}
                    className="absolute right-3 top-[35%] transform -translate-y-1/2"
                  />
                ) : (
                  <EyeOff
                    color="#333333"
                    size={35}
                    className="absolute right-3 top-[35%] transform -translate-y-1/2"
                  />
                )}
              </button>
            </div>

            {error && (
              <p className="mb-6 text-end mx-4 text-red-800 font-bold text-xl">
                {error}
              </p>
            )}

            <BigButton label="Connexion" type="submit" />
          </div>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
