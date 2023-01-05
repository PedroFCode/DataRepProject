import React from "react";
import Card from 'react-bootstrap/Card';
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export class GameItem extends React.Component {
    constructor(){
        super();
        this.DeleteGame = this.DeleteGame.bind(this);
    }
    DeleteGame(e){
        e.preventDefault();

        axios.delete('http://localhost:4000/api/game/'+this.props.game._id)
        .then((res)=>{this.props.Reload();})
        .catch();
    }
    render() {
        return (
            <div>

                <Card>
                    <Card.Header>{this.props.game.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img width="220" height="400" src={this.props.game.cover}></img>
                          
                            
                                <p>Description: {this.props.game.desc}
                                </p>
                             
                               <h4> Genre: {this.props.game.genre}</h4> 
                            
                            <footer >
                               Developer: {this.props.game.developer}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={'/edit/' + this.props.game._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteGame}>Delete</Button>
                </Card>
            </div>
        );
    }
}