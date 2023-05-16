import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema, {
  RegistrationFormData,
} from "../validation/registrationSchema";

const LogInPage = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });
  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
  };

  // TODO: Apply MUI and Controlled inputs, Login form data/functions
  return (
    <div>
      <h2>LogIn</h2>
      <form>
        <div>
          <label htmlFor="login-username">Userame</label>
          <input type="text" id="login-username" />
        </div>
        <div>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <h3>Or great new account below: </h3>
      <h2>Registration form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Userame</label>
          <input type="text" id="username" {...register("username")} />
          <div>{errors.username && <p>errors.username.message</p>}</div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input type="avatar" id="avatar" {...register("avatar")} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <div>
          <label htmlFor="confirm">Password Again</label>
          <input type="password" id="confirm" {...register("confirm")} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LogInPage;
