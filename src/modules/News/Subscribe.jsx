import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../hook/firebase';

export const Subscribe = ({user, unCheck}) => {
    const [userName, setUserName] = useState("Загрузка...")
    useEffect(() => {
        async function getPosts() {
            try {
              const docSnap = await getDoc(doc(db, "users", user));
              if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                // console.log(docSnap.data().Name)
                setUserName(docSnap.data().Name)        
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
      
            } catch (error) {
              alert("Query error: ", error)
              console.error("Query error: ", error)
            }
      
          }
          getPosts()
    }, [])

    return (
        <li key={user}>
            <input type="checkbox" id={user} name="subscription" defaultChecked={true} onChange={(e) => unCheck(e)} />
            <label htmlFor={user}>{userName}</label>
        </li>
    )
}
