import AuthStyles from "./Styles";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KindergartenAPI } from "../../services/broker";
import Toast from "../../components/Toast/Toast";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Styles = AuthStyles.Register;
const resetForm = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState(resetForm);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = decodeJwt(token);
      if (decodedToken) {
        navigate("/");
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    KindergartenAPI.Login(form)
      .then((data) => {
        const token = decodeJwt(data?.token);
        const refreshToken = decodeJwt(data?.refreshToken);
        Cookies.set("token", data.token, {
          expires: new Date(Number(token?.exp) * 1000),
        });
        Cookies.set("refreshToken", data.refreshToken, {
          expires: new Date(Number(refreshToken?.exp) * 1000),
        });
        if (!token || !refreshToken) {
          Toast.fire({
            icon: "error",
            title: "Bir Hata Oluştu!",
          });
          return;
        }

        navigate("/");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.error,
        });
        console.log(err);
      });
    setForm(resetForm);
  };
  return (
    <Styles.Container>
      <Styles.Form onSubmit={handleSubmit}>
        <Styles.Title>KREŞ YÖNETİM</Styles.Title>

        <TextField
          id="email"
          value={form.email}
          onChange={handleChange}
          label="E-Posta"
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
          type="email"
          required
        />
        <TextField
          id="password"
          value={form.password}
          onChange={handleChange}
          label="Şifre"
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
          type={showPassword ? "text" : "password"}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="small"
          sx={{ mt: 2 }}
        >
          Giriş Yap
        </Button>

        <Styles.Link onClick={() => navigate("/register")}>
          Hesabın yok mu? Kayıt Ol
        </Styles.Link>
      </Styles.Form>
    </Styles.Container>
  );
};

export default Login;
