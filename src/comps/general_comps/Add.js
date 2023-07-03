import { Fab } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function Add() {
    const nav = useNavigate();

    return (
        <>
            <Fab
                sx={{ background: "#228B22", color: "white", "&:hover": { color: "white", background: "#AFE1AF" }, position: 'sticky', bottom: 70, left: 1900 }}
                onClick={() => { nav("/uploadForm") }}
                aria-label="uploadForm">
                <AddIcon />
            </Fab>
        </>
    )
}