import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import Register from "../pages/Register";
import CategoyrFiltered from "../pages/CategoyrFiltered";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
// , loader: () => fetch("http://localhost:3000/products")
// , loader: () => fetch("http://localhost:3000/recentProducts") 
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home},
      { path: "/allListings", Component: PetsAndSupplies},
      { path: "/category-filtered-product/:categoryName", Component: CategoyrFiltered },
      { path: "/addListing", Component: AddListing },
      { path: "/myListings", Component: MyListings },
      { path: "/myOrders", Component: MyOrders },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
