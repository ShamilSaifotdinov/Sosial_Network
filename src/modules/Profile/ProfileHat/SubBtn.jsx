import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../hook/firebase'

export const SubBtn = ({ id }) => {
  const [isSub, setSub] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    async function fetch(params) {
      try {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          let subs = docSnap.data().subs
          if (subs && subs.includes(id)) setSub(true)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        setLoaded(true)
      } catch (error) {
        alert("Query error: ", error)
        console.error("Query error: ", error)
      }
    }
    fetch()
  }, [id])

  const editSub = async () => {
    try {
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        let subs = docSnap.data().subs
        console.log(subs)
        if (subs) {
          if (subs.includes(id)) {
            setDoc(
              doc(db, "users", auth.currentUser.uid),
              { subs: subs.filter(e => e !== id) },
              { merge: true }
            );
            console.log("Отписан")
            setSub(false)
          } else {
            setDoc(
              doc(db, "users", auth.currentUser.uid),
              { subs: [...subs, id] },
              { merge: true }
            );
            console.log("Подписан")
            setSub(true)
          }
        } else {
          setDoc(
            doc(db, "users", auth.currentUser.uid),
            { subs: [id] },
            { merge: true }
          );
          console.log("Подписан")
          setSub(true)
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoaded(true)
    } catch (error) {
      alert("Query error: ", error)
      console.error("Query error: ", error)
    }
  }
  return (
    isLoaded && (isSub ?
      <button onClick={editSub}>Отписаться</button> :
      <button onClick={editSub}>Подписаться</button>)
  )
}
