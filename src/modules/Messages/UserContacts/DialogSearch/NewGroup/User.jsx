import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import c from './NewGroup.module.css'

export const User = ({user, isChecked, checking}) => {
    console.log(user)
    const handleChange = () => {
        checking(user)
    }
    return (
        <li key={user.uid}>
            <input type="checkbox" id={user.uid} name="member" defaultChecked={isChecked} onChange={handleChange} />
            <label htmlFor={user.uid}>{user.Name}</label>
        </li>
    )
}