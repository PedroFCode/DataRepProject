import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Edit(){
    let {id} = useParams();
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [developer, setDeveloper] = useState('');
    const [genre, setGenre] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:4000/api/game/'+id)
        .then((response)=>{
            setTitle(response.data.title);
            setCover(response.data.cover);
            setDeveloper(response.data.developer);
            setGenre(response.data.genre);
            setDesc(response.data.desc);
        })
        .catch()
    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const editGame = {
            title:title,
            cover:cover,
            developer:developer,
            genre:genre,
            desc:desc
        }

        axios.put('http://localhost:4000/api/game/'+id,editGame)
        .then()
        .catch();
    }

    return(
        <div>
            <h3>Edit Game</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                        <label>Edit Game Title: </label>
                        <input type="text"
                            className="form-control"
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Game Cover: </label>
                        <input type="text"
                            className="form-control"
                            value={cover}
                            onChange={(e)=>{setCover(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Game Developer: </label>
                        <input type="text"
                            className="form-control"
                            value={developer}
                            onChange={(e)=>{setDeveloper(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Game Genre: </label>
                        <input type="text"
                            className="form-control"
                            value={genre}
                            onChange={(e)=>{setGenre(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Game Description: </label>
                        <input type="text"
                            className="form-control"
                            value={desc}
                            onChange={(e)=>{setDesc(e.target.value)}}
                        />
                    </div>
                <input type="submit" value="Submit Edit"></input>
                <br></br>
                <Link to='/read/'  className="btn btn-primary">Finish</Link>
                
            </form>
        </div>
    );
}