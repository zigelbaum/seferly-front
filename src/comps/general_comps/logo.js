import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo({ margin }) {
    const nav = useNavigate()
    return (
        <div className={margin} >

            <img style={{ cursor: "pointer" }} src="\images\seferly.png" alt="Logo" width={"150"} />

        </div>
    )
}