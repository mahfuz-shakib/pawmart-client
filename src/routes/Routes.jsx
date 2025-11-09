import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import Register from "../pages/Register";
import CategoyrFiltered from "../pages/CategoyrFiltered";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home,
        loader:()=>fetch('http://localhost:3000/recentProducts')
       },
       {path:'/allListings',Component:PetsAndSupplies,loader:()=>fetch('http://localhost:3000/products')},
       {path:'/category-filtered-product/:categoryName',Component:CategoyrFiltered},
      {path:'/login', Component:Login},
      {path:'/register', Component:Register},
    ],
  },
]);
