import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import useAppDispatch from "../hooks/useAppDispatch";
import { createNewUser } from "../redux/reducers/userReducer";
import { User } from "../types/User";

const RegitsrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm<User>();
  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(createNewUser(data));
    navigate("/login");
  };

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState("");

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(createNewUser({ name, email, password, avatar }));
  // };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
      
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="name" {...register("name")}
                  name="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email" {...register("email")}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password" {...register("password")}
                  name="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Avatar URL"
                  id="avatar" {...register("avatar")}
                  name="avatar"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
};

//     <div>
//       <h2>Registration form:</h2>
//       <div>
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div>
//           <label id="name">
//             name:
//             <input
//               onChange={(e) => setName(e.target.value)}
//               name="name"
//               value={name}
//             />
//           </label>
//           </div>
//           <div>
//           <label id="email">
//             email:
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               name="email"
//               value={email}
//             />
//           </label>
//           </div>
//           <div>
//           <label id="password">
//             password:
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               name="password"
//               value={password}
//             />
//           </label>
//           </div>
//           <div>
//           <label id="avatar">
//             avatar:
//             <input
//               onChange={(e) => setAvatar(e.target.value)}
//               name="avatar"
//               value={avatar}
//             />
//           </label>
//           </div>

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default RegitsrationForm;
