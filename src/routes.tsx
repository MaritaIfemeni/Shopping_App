import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import SingleProductPage from "./pages/SingleProductPage";
import PageNotFound from "./pages/PageNotFound";
import LogInPage from "./pages/LogInPage";
import ProductsPage from "./pages/ProductsPage";
import ModifyProducts from "./pages/ModifyProducts";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";


const routes: any = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/modifyProducts",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={true}
            fallbackPath="/login"
          >
            <ModifyProducts />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
