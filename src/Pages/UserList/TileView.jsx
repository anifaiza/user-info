import React from "react";
import TileCard from "../../Components/TileCard";

const TileView = (users) => {
    console.log(users.users)
    return (
        <div>
            {users.users.map(item => (
                <TileCard data={item}></TileCard>
            ))}
        </div>
    )
}
export default TileView;