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
import UserList from "./pages/UserList";

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
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={false}
            fallbackPath="/login"
          >
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/modifyproducts",
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
      {
        path: "/userlist",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={true}
            fallbackPath="/login"
          >
            <UserList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
