import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TileCard from '../../Components/TileCard';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles"
import {
    fetchData,
    dataSelector,
    searchByName,
    filterData,
    filterSearchedData
  } from "../../Slices/ApiSlice"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textfield: {
    height: "20px",
    width: "350px",
    // "&.MuiOutlinedInput-root": {
    //     borderRadius: "15px"
    // }
  }
})

const SearchFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    Height: 25px;
`
const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const Label = styled.label`
    margin: auto 0;
`
const TileContainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`


const UserInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { data, searchedData, filteredData, loading, hasErrors } = useSelector(dataSelector)
    const [tileView, setTileView] = useState(false)
    const [text, setText] = useState('')
    const[filter, setFilter] = useState('all')
    const [searching, setSearching] = useState(false)

    const onTextChange = (e) => {
        setText(e.target.value);
        setSearching(true);
        dispatch(searchByName(e.target.value));
        if(e.target.value==''){
            setSearching(false)
        }
    }

    const handleFilterChange = (e) => {
        // console.log(e.target.value)
        setFilter(e.target.value)
        if(searching){
            dispatch(filterSearchedData(e.target.value))
        }
        if(!searching){
            dispatch(filterData(e.target.value))
        }
    }

    const handleViewChange = () => {
        setTileView(!tileView)
    }
    
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

   if(!loading){
    console.log("data", data)
    console.log("searched", searchedData)
    console.log("filtered", filteredData)
   }
    return (
    <Container maxWidth='lg' className={classes.container}>
        <h1>User List</h1>
        <SearchFilterContainer>
        <TextField 
        id="outlined-size-small" 
        variant="outlined" 
        size="small" 
        placeholder='Search...' 
        className={classes.textfield}
        onChange={(e)=>{onTextChange(e)}}
        />
            <FilterContainer onChange={(e)=>handleFilterChange(e)}>
            <p style={{padding: 0, margin: "auto 0"}}>Filter</p>
            <input type="radio" id="all" name="filter" value="all"/>
            <Label for="all">All</Label><br/>
            <input type="radio" id="male" name="filter" value="male"/>
            <Label for="male">Male</Label><br/>
            <input type="radio" id="Female" name="filter" value="female"/>
            <Label for="Female">Female</Label>
        </FilterContainer>
        <SwitchContainer>
            <p style={{padding: 0, margin: "auto 0"}}>TileView</p>
            <Switch
                checked={tileView}
                onChange={handleViewChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </SwitchContainer>
        </SearchFilterContainer>
        {tileView && (
        <div>
            {searching && filter=="all" && searchedData.length>0 && (
            <TileContainer>
                {searchedData.map(item =>(
                    <TileCard data ={item.name.last}/>
                ))}
            </TileContainer>
            )}
            {searching && filter!=="all" && filteredData.length>0 && (
                <TileContainer>
                    {filteredData.map(item =>(
                        <TileCard data ={item.name.last}/>
                    ))}
                </TileContainer>
            )}
            {!searching && filter=='all' && data.length>0 && (
                <TileContainer>
                    {data.map(item =>( 
                        <TileCard data ={item.name.last}/>
                    ))}
                </TileContainer>
            )}
        </div>)}

        {/* {!searching && data.length>0 && !tileView &&(
            <div>
                {data.map(item =>(
                    <TileCard data ={item.name.last}/>
                    // <h1>{item.name.last}</h1>
                ))}
            </div>
        )} */}
    </Container>
    )
}

export default UserInfo;