import React from "react";
import { useForm } from "react-hook-form";
import useAppDispatch from "../hooks/useAppDispatch";
import { createNewUser } from "../redux/reducers/userReducer";
import { NewUser } from "../types/NewUser"; 

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<NewUser>();

  const onSubmit = (data: NewUser) => {
    dispatch(createNewUser(data));
    console.log("CREATE USER", data);
  };

  return (
    <div>
      <h2>Registration form:</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input {...register("name")} id="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input {...register("email")} id="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input {...register("password")} id="password" />
          </div>
          <div>
            <label htmlFor="avatar">Avatar:</label>
            <input {...register("avatar")} id="avatar" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
