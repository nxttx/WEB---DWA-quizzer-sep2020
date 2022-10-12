import React from "react";

export class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            images: ['tv_scoreboard.png',
                'team_send_answer.png',
                'quizmaster_teams.png'],
        }
        this.changeImage.bind(this)
    }

    changeImage(bool) {
        if (bool) { //++
            if (this.state.active < (this.state.images.length - 1)) {
                this.setState({ active: this.state.active + 1 });
            } else {
                this.setState({ active: 0 })
            }
        } else { //--
            if (this.state.active !== 0) {
                this.setState({ active: this.state.active - 1 });
            } else {
                this.setState({ active: this.state.images.length - 1 })
            }
        }
        console.log(this.state.active)
    }

    update() {
        setTimeout(() => {
            this.changeImage(true)
            console.log(this.state.images[this.state.active])
            this.render()
        }, 3500)
    }

    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        this.update();
    }


    render() {





        return (<>
            <a href="/#" onClick={() => { this.changeImage(false) }}> <i className="fas fa-arrow-left"></i> </a>
            <a href="/#" onClick={() => { this.changeImage(true) }}> <i className="fas fa-arrow-right" style={{ position: "relative", right: -10 + "px" }}></i> </a>
            <br />

            <img className="" src={this.state.images[this.state.active]} alt="slider" style={{ height: 200 }} />



        </>

        )
    }
}
export default Slider;
