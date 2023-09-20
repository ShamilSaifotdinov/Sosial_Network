import { auth, db } from "../../../../../hook/firebase"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import c from './NewGroup.module.css'
import { Modal } from '../../../../Modal/Modal';
import { User } from "./User";

export const NewGroup = ({ isModal, setModal }) => {
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])
    const [groupName, setGroupName] = useState("")

    const handleChangeUsers = async (value) => {
        if (value) {
            const q = query(
                collection(db, "users"),
                where("Name", ">=", value),
                where('Name', '<=', value + '\uf8ff')
            );
            try {
                const querySnapshot = await getDocs(q);
                // console.log(querySnapshot)
                var users = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    users.push({ uid: doc.id, Name: doc.data().Name })
                });
                console.log(users)
                setUsers(users.filter(e => !members.some((item) => item.uid === e.uid)))
            } catch (error) {
                alert("Query error: ", error)
                console.error("Query error: ", error)
            }
        } else {
            setUsers([])
        }
    }

    console.log(members)
    const unCheck = (newMember) => {
        setMembers(members.filter(e => e.uid !== newMember.uid))
    }
    const check = (newMember) => {
        members.push(newMember)
        // console.log(members)

        setMembers(members)
        setUsers(users.filter(e => e.uid !== newMember.uid))
    }

    const createNewGroup = async () => {
        if (groupName && members.length) {
            let groupChat = {
                isGroup: true,
                Name: groupName,
                members: {}
            }
            groupChat.members[auth.currentUser.uid] = true
            for (const member of members) {
                groupChat.members[member.uid] = true
            }
            console.log(groupChat)
            try {
                const docRef = await addDoc(collection(db, "chats"), groupChat);
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                alert("Query error: ", error)
                console.error("Query error: ", error)
            }
        }
    }

    return (
        <Modal
            isVisible={isModal}
            title="Группа"
            content={
                <div className={c.NewGroup}>
                    <input className={c.InputUsersGroup} type="text" placeholder="Наименование группы..." onChange={(e) => setGroupName(e.target.value)} />
                    <input className={c.InputUsersGroup} type="search" placeholder="Найти собеседника..." onChange={(e) => handleChangeUsers(e.target.value)} />
                    <ul>
                        {
                            members.map(user =>
                                <User key={user.uid} user={user} isChecked={true} checking={unCheck} />)
                        }
                        {
                            users.map(user =>
                                <User key={user.uid} user={user} isChecked={false} checking={check} />)
                        }
                    </ul>
                </div>
            }
            footer={<button onClick={createNewGroup}>Создать</button>}
            onClose={() => setModal(false)}
        />
    )
}

