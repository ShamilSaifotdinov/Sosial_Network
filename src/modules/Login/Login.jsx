import { useState } from "react"
// import useQuery from "../hooks/hook.http"
// import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../hook/firebase";
import './Login.css'
import { Link } from "react-router-dom";
import Register from "./Register";

export default function Login() {
    const [form, setForm] = useState({
        Email: "",
        Password: ""
    });

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const login = async (event, form) => {
        console.log(form)
        event.preventDefault()
        signInWithEmailAndPassword(auth, form.Email, form.Password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                // console.log(auth)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                if (errorCode === "auth/wrong-password") {
                    alert("Неверный логин или пароль!");
                }
                if (errorCode === "auth/user-not-found") {
                    alert("Такого пользователя еще не существует!");
                }
                else {
                    alert("Ошибка (см. F12)");
                }
                console.log(`${errorCode}: ${errorMessage}`)
            });
    }

    return (
        <div className="login">
            <div className="login-component">
                <h1 className="login-component_header">Аутентификация</h1>
                <form className="login-component_form login-form" onSubmit={(event) => login(event, form)}>
                    <label className="login-form_item" htmlFor="E-mail">E-mail</label>
                    <input name="Email" id="E-mail" onChange={handleChange} value={form.Email} required />

                    <label className="login-form_item" htmlFor="Password">Пароль</label>
                    <input name="Password" id="Password" type="password" onChange={handleChange} value={form.Password} required />

                    <input className="login-form_item login-btn" type="submit" value="Войти" />
                    <Link to="/register">
                        <button className="login-form_item login-btn" type='button' >Зарегистрироваться</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}