import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import PageNotFound from "../pages/PageNotFound";
import LogInPage from "../pages/LogInPage";
import ProductsPage from "../pages/ProductsPage";
import ModifyProducts from "../pages/ModifyProducts";
//import ProfilePage from "../pages/ProductsPage";


const routes: any = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/product/:id",
          element: <SingleProductPage />,
        },
        {
          path: "/login",
          element: <LogInPage />,
          // children: [
          //   {
          //     path: "/Profile",
          //     element: <ProfilePage />,
          //   }
          // ]
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        { 
          path: "/modifyProducts",
          element: <ModifyProducts />,
        },
      ],
    },
  ]);
  
  export default routes;