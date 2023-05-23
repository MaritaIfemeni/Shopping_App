import React from "react";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { updateUser } from "../redux/reducers/userReducer";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);

  //This is under construction
  const handleUpdateUser = () => {
    dispatch(
      updateUser({
        id: 57,
        data: {
          name: "Marita Doe",
          email: "updated",
          password: "1234",
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        },
      })
    );

    console.log("updated", updateUser);
  };

  return (
    <div>
      <div>
        <button onClick={handleUpdateUser}>Update User</button>
      </div>
      <div>
        <h1>Profile Page</h1>
        <h3>
          {currentUser && (
            <h3>
              HI {currentUser.name}, you can change your details from here!
            </h3>
          )}
        </h3>
        <div>
          {" "}
          {currentUser && (
            <p>
              Logged in as {currentUser.name}, Your registered Email:{" "}
              {currentUser.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
