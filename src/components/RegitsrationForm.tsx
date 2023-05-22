import React, { useState } from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import { createNewUser } from "../redux/reducers/userReducer";

const RegitsrationForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewUser({ name, email, password, avatar }));
  };

  return (
    <div>
      <h2>Registration form:</h2>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
          <label id="name">
            name:
            <input
              onChange={(e) => setName(e.target.value)}
              name="name"
              value={name}
            />
          </label>
          </div>
          <div>
          <label id="email">
            email:
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
            />
          </label>
          </div>
          <div>
          <label id="password">
            password:
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
            />
          </label>
          </div>
          <div>
          <label id="avatar">
            avatar:
            <input
              onChange={(e) => setAvatar(e.target.value)}
              name="avatar"
              value={avatar}
            />
          </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegitsrationForm;
