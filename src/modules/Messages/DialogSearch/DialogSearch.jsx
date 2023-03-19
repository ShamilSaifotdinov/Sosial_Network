import c from "../UserContacts/UserContacts.module.css";
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { db } from "../../../hook/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

const DialogSearch = () => {
    const [users, setUsers] = useState([])

    const handleChange = async (value) => {
        if (value) {
            const q = query(
                collection(db, "users"),
                where("Name", ">=", value),
                where('Name', '<=', value + '\uf8ff')
            );
            try {
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot)
                var users = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    users.push({ uid: doc.id, Name: doc.data().Name })
                });
                console.log(users)
                setUsers(users)
            } catch (error) {
                alert("Query error: ", error)
                console.error("Query error: ", error)
            }
        } else {
            setUsers([])
        }
    }

    return (
        <div>
            <input type="search" placeholder="Найти собеседника..." onChange={(e) => handleChange(e.target.value)} />
            {
                users.length !== 0
                    ? <ul>
                        {users.map(user =>
                            <li><NavLink to={`/${user.uid}`} activeClassName={c.active}>{user.Name}</NavLink></li>)}
                        <hr></hr>
                    </ul>
                    : <></>
            }
        </div >
    )
}

export default DialogSearch