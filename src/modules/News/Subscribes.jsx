import { doc, getDoc, setDoc } from 'firebase/firestore';
import c from "./News.module.css";
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../hook/firebase';
import { Modal } from '../Modal/Modal';
import { Subscribe } from './Subscribe';

export const Subscribes = ({ isModal, setModal, subs, setSubs }) => {
    const unCheck = (event) => {
        // console.log(e)
        // console.log(event.target.id + ": " + event.target.checked)
        if (event.target.checked) {
            subs.unshift(event.target.id)
        } else {
            subs = subs.filter(e => e !== event.target.id)
        }
        console.log(subs)
    }

    const saveSubs = () => {
        try {
            setDoc(
                doc(db, "users", auth.currentUser.uid),
                { subs },
                { merge: true }
            );
            setSubs(subs)
            setModal(false)
        } catch (error) {
            // alert("Query error: ", error)
            console.error("Query error: ", error)
        }
    }

    return (
        <Modal
            isVisible={isModal}
            title="Подписки"
            content={
                <ul className={c['user-list']}>
                    {
                        subs.map(user =>
                            <Subscribe key={user} user={user} subs={subs} unCheck={unCheck}/>)
                    }
                </ul>
            }
            footer={<button onClick={saveSubs}>Сохранить</button>}
            onClose={() => setModal(false)}
        />
    )
}

