import React from "react";
import axios from "axios";

export class Create extends React.Component {
//constructor to bind the events to each method in order for the methods to function
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeGameTitle = this.onChangeGameTitle.bind(this);
        this.onChangeGameCover = this.onChangeGameCover.bind(this);
        this.onChangeGameDeveloper = this.onChangeGameDeveloper.bind(this);
        this.onChangeGameGenre = this.onChangeGameGenre.bind(this);
        this.onChangeGameDesc = this.onChangeGameDesc.bind(this);

        
        this.state = {
            title:'',
            cover:'',
            developer:'',
            genre:'',
            desc:''
        }
    }

    //Takes an event when envoked
    handleSubmit(e){
        e.preventDefault();
        console.log(`Button clicked 
        ${this.state.title},
        ${this.state.cover},
        ${this.state.developer},
        ${this.state.genre},
        ${this.state.desc}`);

        const game ={
            title:this.state.title,
            cover:this.state.cover,
            developer:this.state.developer,
            genre:this.state.genre,
            desc:this.state.desc
        }

        axios.post('http://localhost:4000/api/games',game)
        .then()
        .catch();

        this.setState({
            title:'',
            cover:'',
            developer:'',
            genre:'',
            desc:''
        })
    }

    //Is called when value changes applies to all onChange methods
    onChangeGameTitle(e){
        this.setState({
            title:e.target.value
        })
    }
    onChangeGameCover(e){
        this.setState({
            cover:e.target.value
        })
    }
    onChangeGameDeveloper(e){
        this.setState({
            developer:e.target.value
        })
    }
    onChangeGameGenre(e){
        this.setState({
            genre:e.target.value
        })
    }
    onChangeGameDesc(e){
        this.setState({
            desc:e.target.value
        })
    }

    //html code, creates input fields for adding a new game
    render() {
        return (
            <div>
                <h3>Game Database</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Add Game Title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeGameTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Game Cover: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.cover}
                            onChange={this.onChangeGameCover}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Game Developer: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.developer}
                            onChange={this.onChangeGameDeveloper}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Game Genre: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.genre}
                            onChange={this.onChangeGameGenre}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Game Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.desc}
                            onChange={this.onChangeGameDesc}
                        />
                    </div>

                    <input type="submit" value="Add Game" />
                </form>
            </div>
        );
    }
}