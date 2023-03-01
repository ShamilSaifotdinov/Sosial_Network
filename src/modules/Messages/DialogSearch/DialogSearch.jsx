import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { db } from "../../../hook/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

const DialogSearch = ({url}) => {
    const [users, setUsers] = useState([])

    const handleChange = async (value) => {
        const q = query(collection(db, "users"), where("Name", "==", value));
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
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleChange(e.target.value)} />
            <ul>
                {
                    users
                        ? users.map(user =>
                            <li><NavLink to={`${url}/${user.uid}`}>{user.Name}</NavLink></li>)
                        : <></>
                }
            </ul>
        </div>
    )
}

export default DialogSearch