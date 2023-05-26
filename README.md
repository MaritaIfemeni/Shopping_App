# Front-end Project
![Emoji](https://img.shields.io/badge/in--progress-YES-red)
![Emoji](https://img.shields.io/badge/author-MI-blue)

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)
![Material UI](https://img.shields.io/badge/MUI-v.5-blueviolet)

## Frontend Assignment using react, redux toolkit, typescript and sass

The purpose of this assignment was to create online store fetching data from Platzi Fake Store [API](https://fakeapi.platzi.com/en/rest/)

## Table of contents

- [Issues](#issues)
- [Missing functionalities](#missing-functionalities)
- [Unfinished tasks](#unfinished-tasks)
- [Deployment](#deployment)
- [Getting started](#getting-started)
- [Project structure](#project-structure)

#### Missing functionalities

- Not able to add actual image file when creating new user or product, only URL is possible to add. 
- Not able to update user details.
- No Checkout feature done.
- Does not give any alerts or notifications when something is done successfully or if something went wrong, like adding new user or product.
- Indications that app is loading when fetching data from API has not been done.
- Validation for forms has not been done.
- No pagination for the products when the category is selected.

#### Unfinished tasks

- Refactoring the code:
    - userReducer has not been refactored.
    - MUI styles is in the coponents and there is lots of inline styling.
- Using react-hook-froms for creating product or updating has not been done neither the validation. 
- Page is not fully responsive.
- Arial labels has not been done.
- Test are not complite and no test for the UI has been done.
- Optimalization of the code has not been done.
 
#### Issues to fix in the App

- When user, either admin or customer, is logged in and is in a page which has private routing (like profile page), after refresh it will redirect back to login page.
- AppBar is not behaving right when the loggin in is happening and gives an error in browser console. Funcionality is not affected.
- Test for delete product is not working (stopped working after some refactoring).
- When creating or updating the product wasn't succsesfull it gives wronglu a message that it was succesfull.
- Low performance

#### Deployment

Checkout the project from **[here](https://shopping-app-c37.pages.dev/)**.

#### Getting started

1. To clone repository use: git clone 
2. To install the project run: npm install
3. Refer to package.json for scripts 
4. To run application in development mode run: npm start 
5. To run tests run: npm test
6. To build application for production: npm run build

## Project structure

```
.
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
    ├── App.tsx
    ├── api
    │   ├── categoriesApi.ts
    │   ├── productsApi.ts
    │   └── userApi.ts
    ├── app.css
    ├── app.css.map
    ├── components
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── RegitsrationForm.tsx
    │   └── admin_components
    │       ├── AddNewProduct.tsx
    │       ├── AdminProductDashboard.tsx
    │       ├── DeleteProduct.tsx
    │       └── UpdateProduct.tsx
    ├── hooks
    │   ├── getFilteredList.ts
    │   ├── useAppDispatch.ts
    │   ├── useAppSelector.ts
    │   ├── useDebounce.ts
    │   └── useModal.ts
    ├── img
    │   └── shopping.jpeg
    ├── index.css
    ├── index.tsx
    ├── pages
    │   ├── Cart.tsx
    │   ├── HomePage.tsx
    │   ├── LandingPage.tsx
    │   ├── LogInPage.tsx
    │   ├── ModifyProducts.tsx
    │   ├── PageNotFound.tsx
    │   ├── ProductsPage.tsx
    │   ├── ProfilePage.tsx
    │   ├── SingleProductPage.tsx
    │   └── UserList.tsx
    ├── react-app-env.d.ts
    ├── redux
    │   ├── reducers
    │   │   ├── cartReducer.ts
    │   │   ├── categoryReducer.ts
    │   │   ├── modalReducer.ts
    │   │   ├── productsReducer.ts
    │   │   └── userReducer.ts
    │   └── store.ts
    ├── reportWebVitals.ts
    ├── routes
    │   ├── PrivateRoute.tsx
    │   └── routes.tsx
    ├── setupTests.ts
    ├── styles
    │   └── app.scss
    ├── test
    │   ├── data
    │   │   ├── categories.ts
    │   │   ├── products.ts
    │   │   └── users.ts
    │   ├── reducers
    │   │   ├── cartReduser.test.ts
    │   │   ├── categories.test.ts
    │   │   ├── modalReducer.test.ts
    │   │   ├── productsReducer.test.ts
    │   │   └── userReducer.test.ts
    │   ├── servers
    │   │   ├── categoriesServer.ts
    │   │   ├── productServer.ts
    │   │   └── userServer.ts
    │   └── shared
    │       └── store.ts
    ├── types
    │   ├── AdminUser.ts
    │   ├── CartItem.ts
    │   ├── CartType.ts
    │   ├── Category.ts
    │   ├── ModalProps.ts
    │   ├── NewProduct.ts
    │   ├── NewUser.ts
    │   ├── Product.ts
    │   ├── UpdateUser.ts
    │   ├── UpdatedProduct.ts
    │   ├── User.ts
    │   ├── UserCredentials.ts
    │   └── UserReducer.ts
    ├── utils
    │   └── localStorageUtils.tsx
    └── validation
        ├── newProductSchema.ts
        └── registrationSchema.ts
└── tsconfig.json