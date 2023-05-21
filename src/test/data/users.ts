import { User } from "../../types/User";
import { NewUser } from "../../types/NewUser";

const user1: User = {
    id: 1,
    email: "a@mail.com",
    name: "A",
    password: "aaaa",
    avatar: "",
    role: "admin"
}

const user2: User = {
    id: 2,
    email: "b@mail.com",
    name: "B",
    password: "bbbb",
    avatar: "",
    role: "customer"
}

const user3: User = {
    id: 3,
    email: "c@mail.com",
    name: "C",
    password: "cccc",
    avatar: "",
    role: "admin"
}

const user4: User = {
    id: 4,
    email: "d@mail.com",
    name: "D",
    password: "dddd",
    avatar: "",
    role: "customer"
}

const newUser: NewUser = {
    name: "E",
    email: "E@mail.com",
    password: "eeee",
    avatar: ""
}

const invalidUser: NewUser = {
    name: "F",
    email: "4",
    password: "ffff",
    avatar: ""
}

export {user1, user2, user3, user4, newUser, invalidUser}