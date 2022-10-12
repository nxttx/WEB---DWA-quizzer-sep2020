import React from "react";


export default function TeamComp(props) {
    let color = 'is-info is-light'
    let awnser = null;
    let buttons = null;
    console.log(props.team);

    if (props.team.awnser !== null) {
        if (props.team.awnser === "") {
            return (<></>)
        }
        awnser = <p><strong> {props.team.awnser}</strong> </p>

        if(props.team.isCorrect){
            buttons =
            <span role="img" aria-label="cross" onClick={() => { props.handleAwnserChange(props.team.teamName, false) }}>&#x274C;</span>;
        }else{
            buttons =
            <span role="img" aria-label="correct" onClick={() => { props.handleAwnserChange(props.team.teamName, true) }}>&#x2714;</span>;
        }


        if (props.team.isCorrect) {
            color = "is-success"
        } else {
            color = "is-danger"
        }

    } else {
        buttons = <span role="img" aria-label="cross" onClick={() => { props.removeTeam(props.team.teamName) }}>&#x274C;</span>
    }

    return (
        <div className={"notification " + color + "  is-vcentered "} key={"accept-Team-" + props.team.teamName} >
            <div className="content is-large">
                <div className="columns">
                    <div className="column is-8">
                        {props.team.teamName}
                    </div>
                    <div className="column">
                    </div>
                    <div className="column">
                        {buttons}
                    </div>
                </div>
            </div>
            {awnser}
        </div>)
}