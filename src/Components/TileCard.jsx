import React from "react"
import Card from "@mui/material/Card"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  card: {
    width: "15%",
    margin: "10px 0px;",
    padding: "0px 10px",
  },
})

function TileCard( data ) {
const classes = useStyles()
// console.log(data)
  return (
    <Card variant="outlined" className={classes.card}>
        <h3>{data.data}</h3>
    </Card>
  )
}

export default TileCard
