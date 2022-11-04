import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get("https://exercisetrackermernapp.herokuapp.com/exercises/" + id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("https://exercisetrackermernapp.herokuapp.com/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onDurationChange(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onDateChange(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e) {
    const { id } = this.props.match.params;
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);
    axios.post("https://exercisetrackermernapp.herokuapp.com/update/" + id, exercise).then((res) => console.log(res.data));

    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onUsernameChange}>
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" required className="form-control" value={this.state.description} onChange={this.onDescriptionChange} />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="text" className="form-control" value={this.state.duration} onChange={this.onDurationChange} />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker selected={this.state.date} onChange={this.onDateChange} />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
