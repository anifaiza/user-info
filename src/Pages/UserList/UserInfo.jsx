import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchData,
    dataSelector,
    searchByName,
  } from "../../Slices/ApiSlice"

//   import { userActions } from "../../store"

const UserInfo = () => {
    // const { users } = useSelector(x => x.users);
    const dispatch = useDispatch()
    const { data, searchedData, loading, hasErrors } = useSelector(dataSelector)
    const [tileView, setTileView] = useState(false)
    const [text, setText] = useState('')

    const onTextChange = (e) => {
        e.preventDefault();
        setText(e);
        dispatch(searchByName(text));
    }
    
    useEffect(() => {
        dispatch(fetchData())
    }, [])

    
    // useEffect(() => {
    //     dispatch(userActions.getAll());
    // }, []);

   if(!loading){
    console.log("data", data)
   }
    return (
    <div>
        <h1>User List</h1>
        <input type="text" />
    </div>
    )
}

export default UserInfo;