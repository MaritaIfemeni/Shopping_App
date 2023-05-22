import React from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllUsers } from "../redux/reducers/userReducer";

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.usersReducer.users);

  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div>
      UserList
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.avatar}</div>
            <div>{user.isAdmin}</div>
            <div>{user.password}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
