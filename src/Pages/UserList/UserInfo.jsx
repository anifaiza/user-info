import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchData,
    dataSelector,
    searchByName,
  } from "../../Slices/ApiSlice"

const UserInfo = () => {
    const dispatch = useDispatch()
    const { data, searchedData } = useSelector(dataSelector)
    const [tileView, setTileView] = useState(false)
    const [text, setText] = useState('')

    const onTextChange = (e) => {
        e.preventDefault();
        setText(e);
        dispatch(searchByName(text));
    }
    
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    console.log("hello")
    return (
    <div>
        <h1>User List</h1>
        <input type="text" onChange={(e)=>onTextChange(e)}/>
    </div>
    )
}

export default UserInfo;