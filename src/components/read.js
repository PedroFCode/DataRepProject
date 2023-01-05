import React from "react";
import { Games } from "./games";
import axios from "axios";

export class Read extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }
   //axios makes a request to the url and sets response to games array
    componentDidMount() {
        axios.get('http://localhost:4000/api/games')
            .then((response) => {
                this.setState({ games: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //JSON file of games array
    state = {
        games: []
    }

    //HTML Code, renders games onto screen
    render() {
        return (
            <div>
                <h3>Games Database</h3>
                <Games games={this.state.games} Reload={this.componentDidMount}></Games>
            </div>
        );
    }
}