import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TileCard from '../../Components/TileCard';
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
    const [tileView, setTileView] = useState(true)
    const [text, setText] = useState('')
    const [searching, setSearching] = useState(false)

    const onTextChange = (e) => {
        setText(e.target.value);
        setSearching(true);
        dispatch(searchByName(e.target.value, data));
    }
    
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

   if(!loading){
    console.log("data", data)
    console.log("searched", searchedData)
   }
    return (
    <div>
        <h1>User List</h1>
        <input type="text" onChange={(e)=>{onTextChange(e)}}/>
        {searching && searchedData.length>0 && (
            <div>
                {searchedData.map(item =>(
                    <h1>{item.name.last}</h1>
                ))}
            </div>
        )}
        {!searching && data.length>0 && tileView &&(
            <div>
                {data.map(item =>(
                    <TileCard data ={item.name.last}/>
                    // <h1>{item.name.last}</h1>
                ))}
            </div>
        )}
        {!searching && data.length>0 && !tileView &&(
            <div>
                {data.map(item =>(
                    <TileCard data ={item.name.last}/>
                    // <h1>{item.name.last}</h1>
                ))}
            </div>
        )}
    </div>
    )
}

export default UserInfo;