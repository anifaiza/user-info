import React from "react"
import styled from "styled-components"

const Card = styled.div`
    width: 20%;
    margin: auto;
    border: 2px solid black;
    padding: 10px;
`

function TileCard( data ) {
console.log(data)
  return (
    <Card variant="outlined">
        <h3>{data.data}</h3>
    </Card>
  )
}

export default TileCard
