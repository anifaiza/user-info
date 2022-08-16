import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TileCard from '../../Components/TileCard';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import ReactPaginate from 'react-paginate';
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    },
    pagination: {
        width: "50%",
        display: "flex",
        flexDirection: "row",
        listStyle: "none",
        float: "right",
    },
    paginationLink: {
        margin: "0 auto"
    },
    image: {
        height: "50px",
        width: "50px",
        borderRadius: "50%",
    },
    table: {
        height: "300px"
    }

})

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
    const [filter, setFilter] = useState('all')
    const [searching, setSearching] = useState(false)
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const onTextChange = (e) => {
        setSearching(true);
        dispatch(searchByName(e.target.value.toLowerCase()));
        if (e.target.value === '') {
            setSearching(false)
        }
    }

    const handleFilterChange = (e) => {
        // console.log(e.target.value)
        setFilter(e.target.value)
        if (searching) {
            dispatch(filterSearchedData(e.target.value))
        }
        if (!searching) {
            dispatch(filterData(e.target.value))
        }
    }

    const handleViewChange = () => {
        setTileView(!tileView)
        console.log("tileview", tileView)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    }

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    useEffect(() => {
        const endOffset = itemOffset + 10;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        if (searching && filter === "all" && searchedData.length > 0) {
            setCurrentItems(searchedData.slice(itemOffset, endOffset));
        } else if (searching && filter !== "all") {
            if (filteredData.length !== 0 && filteredData.length < searchedData.length) {
                setCurrentItems(filteredData.slice(itemOffset, endOffset));
            }
            else {
                setCurrentItems(searchedData.slice(itemOffset, endOffset))
            }
        } else if (!searching && filter === 'all') {
            setCurrentItems(data.slice(itemOffset, endOffset))
        } else if (!searching && filter !== 'all') {
            setCurrentItems(searchedData.slice(itemOffset, endOffset))
        }
        // setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / 10));
    }, [itemOffset, data, searchedData, filteredData])

    if (!loading) {
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
                    onChange={(e) => { onTextChange(e) }}
                />
                <FilterContainer onChange={(e) => handleFilterChange(e)}>
                    <p style={{ padding: 0, margin: "auto 0" }}>Filter</p>
                    <input type="radio" id="all" name="filter" value="all" />
                    <Label for="all">All</Label><br />
                    <input type="radio" id="male" name="filter" value="male" />
                    <Label for="male">Male</Label><br />
                    <input type="radio" id="Female" name="filter" value="female" />
                    <Label for="Female">Female</Label>
                </FilterContainer>
                <SwitchContainer>
                    <p style={{ padding: 0, margin: "auto 0" }}>TileView</p>
                    <Switch
                        // checked={tileView}
                        onChange={handleViewChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </SwitchContainer>
            </SearchFilterContainer>
            {tileView && (
                <div>
                    <TileContainer>
                        {currentItems && currentItems.map((item, i) => (
                            <TileCard key={i} data={item} />
                        ))}
                    </TileContainer>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={(e) => handlePageClick(e)}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                        className={classes.pagination}
                        pageClassName={classes.paginationLink}
                    />
                </div>
            )}
            {!tileView && (
                <div style={{ marginTop: "50px" }}>
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{''}</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="left">Registration Date</StyledTableCell>
                                    <StyledTableCell align="left">UserName</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentItems && currentItems.map((item, i) => (
                                    <TableRow key={i}>
                                        <StyledTableCell component="th" scope="row">
                                            <img src={item.picture.thumbnail} className={classes.image} />
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {item.name.last}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{item.registered.date.split("T")[0]}</StyledTableCell>
                                        <StyledTableCell align="left">{item.login.username}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={(e) => handlePageClick(e)}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                        className={classes.pagination}
                        pageClassName={classes.paginationLink}
                    />
                </div>
            )}


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