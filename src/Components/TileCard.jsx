import React from "react"
import Card from "@mui/material/Card"
import { makeStyles } from "@material-ui/core/styles"
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles({
  card: {
    width: "17%",
    margin: "10px 0px;",
    padding: "10px 10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    boxShadow: "5px 5px 10px grey;"
  },
  image: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px"
  },
  name: {
    fontSize: "15px",
    fontWeight: "bold",
    margin: "0px"
  },
  email: {
    fontSize: "15px",
    color: "grey",
    margin: "0px",
    lineBreak: "anywhere",
  },
  username: {
    fontSize: "12px",
    margin: "2px"
  },
  icon:{
    height: "15px",
    width: "15px"
  }
})

function TileCard( data ) {
const classes = useStyles()
// console.log("card data",data.data)
  return (
    <Card variant="outlined" className={classes.card}>
        <img src={data.data.picture.thumbnail} className={classes.image}/>
        <div className={classes.info}>
            <p className={classes.name}> {data.data.name.last} {data.data.name.first}</p >
            <p className={classes.email}> {data.data.email} </p >
            <p className={classes.username}> <PersonIcon className={classes.icon}/> {data.data.login.username}</p>
            <p className={classes.username}> <EventNoteIcon className={classes.icon} /> {data.data.registered.date.split("T")[0]}</p>
        </div>
    </Card>
  )
}

export default TileCard
