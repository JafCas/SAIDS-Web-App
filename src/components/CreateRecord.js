import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateRecord extends Component {
  state = {
    title: "",
    content: "",
    date: new Date(),
    userSelected: "",
    users: [],
    editing: false,
    _id: "",
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map((user) => user.username),
        userSelected: res.data[0].username,
      });
    }
    /*if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/records/" + this.props.match.params.id
      );
      console.log(res.data);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        userSelected: res.data.author,
        date: new Date(res.data.date),
        editing: true,
        _id: res.data._id,
      });
    }*/
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editing) {
      const updateNote = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.userSelected,
      };
      await axios.put(
        "http://localhost:4000/api/records/" + this.state._id,
        updateNote
      );
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.userSelected,
      };
      await axios.post("http://localhost:4000/api/records/", newNote);
    }
    window.location.href = "/";
  };

  onInputChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a note</h4>
          <form onSubmit={this.onSubmit}>
            {/* SELECT USER */}
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                onChange={this.onInputChange}
                name="userSelected"
                required
              >
                {this.state.users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            {/* NOTE TITLE */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                required
                onChange={this.onInputChange}
                value={this.state.title}
              />
            </div>
            {/* NOTE CONTENT */}
            <div className="form-group">
              <textarea
                name="content"
                className="form-control"
                placeholder="content"
                required
                onChange={this.onInputChange}
                value={this.state.content}
              ></textarea>
            </div>
            {/* Note Date */}
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save note
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateRecord;
