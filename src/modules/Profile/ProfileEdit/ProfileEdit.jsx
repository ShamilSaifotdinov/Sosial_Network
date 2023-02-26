import { useState } from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { useHistory } from 'react-router-dom';

const ProfileEdit = () => {    
    const auth = getAuth();
    const user = auth.currentUser.providerData[0];
    const [ form, setForm ] = useState({
        Name: user.displayName,
        photoURL: user.photoURL
    });

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const navigate = useHistory()
    const update = (event, form) => {
        console.log(form)
        event.preventDefault()
        updateProfile(auth.currentUser, {
            displayName: form.Name, 
            photoURL: form.photoURL
          }).then(() => {
            navigate.push("/profile");
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }
      
    return (
        <div>
            <h1>Редактирование профиля</h1>
            <form className="login-component_form login-form" onSubmit={(event) => update(event, form)}>
                <label className="login-form_item" htmlFor="Name">Имя</label>
                <input name="Name" id="Name" onChange={handleChange} value={form.Name} required />
                <label className="login-form_item" htmlFor="photoURL">Аватар</label>
                <input name="photoURL" id="photoURL" type="text" onChange={handleChange} value={form.photoURL} />
                <input className="login-form_item login-btn" type="submit" value="Сохранить" />
            </form>
        </div>
    );
}

export default ProfileEdit;