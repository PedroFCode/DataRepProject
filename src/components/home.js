import React from "react";
import Card from 'react-bootstrap/Card';

//Home Page
export class Home extends React.Component {
    //renders html code
    render() {
        return (
            <div>
            <Card>
            <Card.Header>Welcome to Game</Card.Header>
            <Card.Body>
            
                
                <img width="300" height="200" src="https://store.hp.com/app/assets/images/uploads/prod/video-game-genres1597871118726439.jpg"></img>
                <p>Here you can add, view, delete and update from our database as well as read short description to find the best one suited for you!</p>
            </Card.Body>
            </Card>
            </div>
        );
    }
}