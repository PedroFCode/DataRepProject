import React from "react";
import { Games } from "./games";
import axios from "axios";

export class Read extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }
   
    componentDidMount() {
        axios.get('http://localhost:4000/api/games')
            .then((response) => {
                this.setState({ games: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    state = {
        games: []
    }

    render() {
        return (
            <div>
                <h3>Games Database</h3>
                <Games games={this.state.games} Reload={this.componentDidMount}></Games>
            </div>
        );
    }
}