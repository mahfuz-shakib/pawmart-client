import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import Register from "../pages/Register";
import CategoyrFiltered from "../pages/CategoyrFiltered";
import ListingDetails from "../pages/ListingDetails";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "../privateRoute/PrivateRoute";
// , loader: () => fetch("http://localhost:3000/products")
// , loader: () => fetch("http://localhost:3000/recentProducts")
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/allListings", Component: PetsAndSupplies },
      {
        path: "/allListings/:id",
        Component:ListingDetails
      },
      { path: "/category-filtered-product/:categoryName", Component: CategoyrFiltered },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
       {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <DashboardHomepage />
              </LazyWrapper>
            ),
          },
          {
            path: "/dashboard/homepage",
            element: (
              <LazyWrapper>
                <DashboardHomepage />
              </LazyWrapper>
            ),
          },
          {
            path: "/dashboard/manage-users",
            element: (
              <LazyWrapper>
                <ManageUsers />
              </LazyWrapper>
            ),
          },

          {
            path: "/dashboard/myProfile",
            element: (
              <LazyWrapper>
                <MyProfile />
              </LazyWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
