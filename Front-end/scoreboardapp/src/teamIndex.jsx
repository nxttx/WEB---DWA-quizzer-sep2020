import React from "react";

export default function teamIndex(team, number) {
    console.log(team)
    if(number){
        return (
            <h2 className={"title is-"+number} key={team.teamName}>
                {team.teamName}: {team.teamPoints} pnt
            </h2>
        )
    }
    if (team.answerIsCorrect) {
        
        return (
            <h2 className="title is-3" key={team.teamName}>
                &#x2714; {team.teamName}: {team.teamPoints} pnt
            </h2>
        )
    }
    return (
        <h2 className="title is-3" key={team.teamName}>
            {team.teamName}: {team.teamPoints} pnt
        </h2>
    )
}
