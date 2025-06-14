import DashboardLayout from "../layouts/DashboardLayout";
import CategoriesList from "../pages/DashboardModule/Categories/CategoriesList";
import ChangePassword from "../pages/DashboardModule/ChangePassword/ChangePassword";
import Home from "../pages/DashboardModule/Home/Home";
import AddEditRecipe from "../pages/DashboardModule/Recepies/AddEditRecipe";
import GetRecipeDetails from "../pages/DashboardModule/Recepies/RecipeDetails";
import RecipesList from "../pages/DashboardModule/Recepies/RecipesList";
import UsersList from "../pages/DashboardModule/Users/UsersList";
import ViewUser from "../pages/DashboardModule/Users/ViewUser";
import ProtectedRoutes from "./protectedRoutes";

const DashboardRoutes = (token) => [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes token={token}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "user/:id",
        element: <ViewUser />,
      },
      {
        path: "recipes",
        element: <RecipesList />,
      },
      {
        path: "recipe/add",
        element: <AddEditRecipe />,
      },
      {
        path: "recipe/edit/:id",
        element: <AddEditRecipe />,
      },
      {
        path: "recipe/view/:id",
        element: <GetRecipeDetails />,
      },
      {
        path: "categories",
        element: <CategoriesList />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
];

export default DashboardRoutes;
