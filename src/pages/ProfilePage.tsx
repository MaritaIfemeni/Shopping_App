import React from "react";

import useAppSelector from "../hooks/useAppSelector";

const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);

  return (
    <div>
      <div>
        <h1>Profile Page</h1>
        <h3>
          {currentUser && (
            <h3>
              HI {currentUser.name}, you can change your details from here!
            </h3>
          )}
        </h3>
        <p> {currentUser && <p>Logged in as {currentUser.name}, Your registered Email: {currentUser.email}</p>}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
