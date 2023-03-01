import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { db } from "../../../hook/firebase"
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const ProfileEdit = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [form, setForm] = useState({
        Name: user.displayName ? user.displayName : "",
        photoURL: user.photoURL ? user.photoURL : "",
        birthday: "",
        city: "",
        employment: "",
        status: ""
    });

    useEffect(() => {
        async function fetchData () {
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setForm({
                    ...form, 
                    ...docSnap.data()
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        fetchData()

        // setForm({...docSnap})
    }, [])
    

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const navigate = useHistory()
    const update = async (event, form) => {
        console.log(form)
        event.preventDefault()
        try {
            // console.log(auth)
            const docRef = await setDoc(doc(db, "users", user.uid), {
                ...form
            });
            console.log("Document written: ", docRef);
            updateProfile(auth.currentUser, {
                displayName: form.Name,
                photoURL: form.photoURL
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                console.log(error)
                throw Error ("Error updating profile: ", error);
            });
            navigate.push("/profile");
        } catch (error) {
            console.error(error)
            alert(error)
        }        
    }

    return (
        <div>
            <h1>Редактирование профиля</h1>
            <form className="login-component_form login-form" onSubmit={(event) => update(event, form)}>
                <label className="login-form_item" htmlFor="Name">Имя</label>
                <input name="Name" id="Name" onChange={handleChange} value={form.Name} required />

                {/* <label className="login-form_item" htmlFor="photoURL">Аватар</label>
                <input name="photoURL" id="photoURL" type="text" onChange={handleChange} value={form.photoURL} /> */}

                <label className="login-form_item" htmlFor="birthday">Дата рождения</label>
                <input name="birthday" id="birthday" type="text" onChange={handleChange} value={form.birthday} />

                <label className="login-form_item" htmlFor="city">Город</label>
                <input name="city" id="city" type="text" onChange={handleChange} value={form.city} />

                <label className="login-form_item" htmlFor="employment">Место учёбы/работы</label>
                <input name="employment" id="employment" type="text" onChange={handleChange} value={form.employment} />

                <label className="login-form_item" htmlFor="status">Статус</label>
                <input name="status" id="status" type="text" onChange={handleChange} value={form.status} />

                <input className="login-form_item login-btn" type="submit" value="Сохранить" />
            </form>
        </div>
    );
}

export default ProfileEdit;