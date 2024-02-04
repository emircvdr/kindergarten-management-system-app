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
  userName: "",
  email: "",
  password: "",
  passwordAgain: "",
};
const Register = () => {
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
    if (form.password !== form.passwordAgain) {
      Toast.fire({
        icon: "error",
        title: "Şifreler Eşleşmiyor!",
      });
      return;
    }
    if (form.password.length < 6) {
      Toast.fire({
        icon: "error",
        title: "Şifre 6 karakterden az olamaz!",
      });
      return;
    }

    KindergartenAPI.Register(form).then((res) => {
      Toast.fire({
        icon: "success",
        title: res.message,
      });
      navigate("/login");
    });

    setForm(resetForm);
  };
  return (
    <Styles.Container>
      <Styles.Form onSubmit={handleSubmit}>
        <Styles.Title>KREŞ YÖNETİM</Styles.Title>
        <TextField
          id="userName"
          value={form.userName}
          onChange={handleChange}
          label="Kullanıcı Adı"
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
          type="text"
          required
        />
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
        <TextField
          id="passwordAgain"
          value={form.passwordAgain}
          onChange={handleChange}
          label="Şifreyi Tekrar Giriniz"
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
          type="password"
          required
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="small"
          sx={{ mt: 2 }}
        >
          Kayıt Ol
        </Button>

        <Styles.Link onClick={() => navigate("/login")}>
          Hesabınız var mı? Giriş Yapın
        </Styles.Link>
      </Styles.Form>
    </Styles.Container>
  );
};

export default Register;
