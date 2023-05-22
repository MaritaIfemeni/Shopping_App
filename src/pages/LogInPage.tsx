import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { User } from "../types/User";
import {
  fetchAllUsers,
  createNewUser,
  login,
} from "../redux/reducers/userReducer";
import RegitsrationForm from "../components/RegitsrationForm";
import { response } from "msw";

const LogInPage = () => {
  const users = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<User>(); // Specify User as the generic type

  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(login(data));
    console.log("LOGGED IN??", data); // Log the form data
    navigate("/"); // Redirect to home page
  };

  const createUser = () => {
    dispatch(
      createNewUser({
        name: "TEST user D",
        email: "DD@mail.com",
        password: "dddd",
        avatar: "https://placeimg.com/640/480/any",
      })
    );
    console.log("CREATE USER", response);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  console.log("USERS", users);

  return (
    <div>
      <button onClick={createUser}>Create User</button>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="login-username">Email</label>
            <input type="text" id="login-username" {...register("email")} />
          </div>
          <div>
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              {...register("password")}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>

      <h3>Or great new account below: </h3>
      <RegitsrationForm />
    </div>
  );
};

export default LogInPage;
