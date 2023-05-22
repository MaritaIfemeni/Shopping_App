import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { User } from "../types/User";
import { login } from "../redux/reducers/userReducer";
import RegitsrationForm from "../components/RegitsrationForm";

const LogInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(login(data));
    navigate("/");
  };

  return (
    <div>
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
