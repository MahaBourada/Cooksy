import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipesListPage from "./pages/RecipesListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import LoginPage from "./pages/LoginPage";
import AddRecipePage from "./pages/AddRecipePage";
import Layout from "./Layout";
import ManagementPage from "./pages/ManagementPage";
import PrivateRoute from "./PrivateRoute";
import UpdateRecipePage from "./pages/UpdateRecipePage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="recettes" element={<RecipesListPage />} />
          <Route path="details-recette/:id" element={<RecipeDetailsPage />} />
          <Route path="connexion" element={<LoginPage />} />
        </Route>

        {/* <Route path="/gestion" element={<Layout />}> */}
        <Route path="/gestion" element={<PrivateRoute />}>
          <Route index element={<ManagementPage />} />
          <Route path="ajouter-recette" element={<AddRecipePage />} />
          <Route path="modifier-recette/:id" element={<UpdateRecipePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
