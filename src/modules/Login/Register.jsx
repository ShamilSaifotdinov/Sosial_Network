import { useState } from "react"
// import useQuery from "../hooks/hook.http"
// import { useNavigate } from "react-router-dom"
import { useHistory } from "react-router-dom";
import './Login.css'

import { setDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../hook/firebase";

export default function Register() {
    const navigate = useHistory()
    const [form, setForm] = useState({
        Name: "",
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

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.Email, form.Password)
            const user = userCredential.user;
            console.log(user)
            // console.log(auth)
            const docRef = await setDoc(doc(db, "users", user.uid), {
                Name: form.Name
            });
            console.log("Document written: ", docRef);

            updateProfile(auth.currentUser, {
                displayName: form.Name
                // photoURL: form.photoURL
            })
            navigate.push("/edit");
        } catch (error) {
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
        }
    }

    return (
        <div className="login">
            <div className="login-component">
                <h1 className="login-component_header">Регистрация</h1>
                <form className="login-component_form login-form" onSubmit={(event) => loginNew(event, form)}>
                    <label className="login-form_item" htmlFor="Name">Имя</label>
                    <input name="Name" id="Name" onChange={handleChange} value={form.Name} required />

                    <label className="login-form_item" htmlFor="E-mail">E-mail</label>
                    <input name="Email" id="E-mail" onChange={handleChange} value={form.Email} required />

                    <label className="login-form_item" htmlFor="Password">Пароль</label>
                    <input name="Password" id="Password" type="password" onChange={handleChange} value={form.Password} required />

                    {/* <input className="login-form_item login-btn" type="submit" value="Войти" onClick={(event) => login(event, form)} /> */}
                    <input className="login-form_item login-btn" type="submit" value="Зарегистрироваться" />
                </form>
            </div>
        </div>
    )
}