
import axios from 'axios';
import React, { Component } from 'react'

export default class comp extends Component {
        state = {
            shows: []
        }
    
    componentDidMount = () => {
        axios.get('https://api.tvmaze.com/search/shows?q=batman')
        .then( (response) => {
            this.setState({
                shows: response.data.map(entry => entry.show)
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h2>Lado del cliente</h2>
                {this.state.shows.map(show => <p key={show.id}>{show.name}</p>)}
            </div>
        )
    }
}
