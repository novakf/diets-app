import Admin from "./pages/Admin";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AdminProductsPage from "./pages/AdminProductsPage"
import DishesPage from "./pages/DishesPage";
import AdminDishesPage from "./pages/AdminDishesPage"

export const adminRoutes = [
  {
    label: "home",
    path: "/",
    Component: HomePage,
  },
  {
    label: "products",
    path: "/products",
    Component: AdminProductsPage,
  },
  {
    label: "dishes",
    path: "/dishes",
    Component: AdminDishesPage,
  },
];

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
