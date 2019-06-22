import React, { Component } from "react";
//since we need to manipulate state here;
//we would dispatch our action here
import { Consumer } from "../../context";
import axios from "axios";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (dispatch, e) => {
    //we need to pass in dispatch to the function
    //this is where we dispatch our action
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACK",
          payload: res.data.message.body.track_list
        });
        //clear the form
        this.setState({ trackTitle: "" });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      //we aslo need to get the dispatch from context
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music">Search for a song</i>
              </h1>
              <p className="lead text-center">Get the lyrics fro any song</p>
              <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter song title"
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
