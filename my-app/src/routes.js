import Admin from "./pages/Admin";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import DishesPage from "./pages/DishesPage";

export const authRoutes = [
  {
    label: "home",
    path: "/",
    Component: HomePage,
  },
  {
    label: "products",
    path: "/products",
    Component: ProductsPage,
  },
  {
    label: "dishes",
    path: "/dishes",
    Component: DishesPage,
  },
];

export const publicRoutes = [
  {
    label: "Sign up",
    path: "/register",
    Component: RegisterPage,
  },
  {
    label: "Login",
    path: "/login",
    Component: LoginPage,
  },
];
