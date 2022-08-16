import React from "react"
import Card from "@mui/material/Card"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  card: {
    width: "15%",
    margin: "10px 0px;",
    padding: "10px 10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  image: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: "15px",
    fontWeight: "bold"
  }
})

function TileCard( data ) {
const classes = useStyles()
// console.log("card data",data.data)
  return (
    <Card variant="outlined" className={classes.card}>
        <img src={data.data.picture.thumbnail} className={classes.image}/>
        <div className={classes.info}>
            <p className={classes.name}>{data.data.name.last} {data.data.name.first}</p >
        </div>
    </Card>
  )
}

export default TileCard
