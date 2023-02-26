import { useState } from "react"
// import useQuery from "../hooks/hook.http"
// import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../hook/firebase";
import './Login.css'

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

    const loginNew = async (event, form) => {
        console.log(form)
        event.preventDefault()
        createUserWithEmailAndPassword(auth, form.Email, form.Password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                if (errorCode === "auth/email-already-in-use") {
                    alert("Такой пользователь уже существует!");
                }
                else {
                    alert(errorMessage)
                }
                console.log(`${errorCode}: ${errorMessage}`)
            });
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
                else {
                    alert("Ошибка (см. F12)");
                }
                console.log(`${errorCode}: ${errorMessage}`)
            });
    }

    return (
        <div className="login">
            {
                /*loading
                    ? <h1>Loading...</h1>
                    :*/
                    <div className="login-component">
                        <h1 className="login-component_header">Аутентификация</h1>
                        <form className="login-component_form login-form">
                            <label className="login-form_item" htmlFor="E-mail">E-mail</label>
                            <input name="Email" id="E-mail" onChange={handleChange} value={form.Email} required />
                            <label className="login-form_item" htmlFor="Password">Password</label>
                            <input name="Password" id="Password" type="password" onChange={handleChange} value={form.Password} required />
                            <input className="login-form_item login-btn" type="submit" value="Войти" onClick={(event) => login(event, form)}/>
                            <input className="login-form_item login-btn" type="submit" value="Регистрация" onClick={(event) => loginNew(event, form)}/>
                        </form>
                    </div>
            }
        </div>
    )
}