import React from "react";

export default function Scoreboard(props) {
    const teamsArray = props.teamsWithPoints.teams

    const list = teamsArray.map(team => {
        console.log(team)
        return (
            <div className="notification is-info is-light" key={team.teamName}>
                <p className='is-size-1'>{team.name}</p>
                <p className='is-size-4'>Punten: {team.points}</p>
            </div>
        )
    }
    )


    console.log(props.teamsWithPoints)
    return (<div>
        <section className="hero is-success is-fullheight is-bold">
            <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
            <div className="container has-text-centered">
                <br />
                {list}
                <br />
                <button className="button" >Nieuw spel</button><br />
            </div>
        </section>
    </div>
    );
}
