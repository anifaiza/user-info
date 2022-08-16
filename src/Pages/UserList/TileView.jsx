import React from "react";
import TileCard from "../../Components/TileCard";

const TileView = (users) => {
    console.log(users.users)
    return(
        <div>
            {users.users.map(item =>(
                <TileCard data={item}></TileCard>
                // <h1>{item.name.last}</h1>
            ))}
        </div>
    )
}
export default TileView;