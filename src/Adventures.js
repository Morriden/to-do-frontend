import React, { Component } from 'react'
import './App.css'
import request from 'superagent';

export default class App extends Component {

  state = {
    adventures:[
        
      ],
      newAdventure: {
        name: '',
        danger_level: 0,
        is_completed: false
      }
  }


  async componentDidMount() {
    const fetchedData = await request.get('http://localhost:3000/api/adventures').set('authorization', this.props.token)
    const data = fetchedData.body
    this.setState({ adventures: data })
  }

  handleSubmit = async(e) => {
    const newArrayOfAdventures = this.state.adventures;
    e.preventDefault();
    const newAdventure = await request.post(`http://localhost:3000/api/adventures`, {
      name: this.state.name,
      danger_level: this.state.danger_level,
      is_completed: false
    }).set('authorization', this.props.token)
    console.log(newAdventure);
    newArrayOfAdventures.push(newAdventure);
    this.setState({
      adventures: newArrayOfAdventures
      
    })
  }
  
  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }
  handleDangerChange = (e) => {
    this.setState({ danger_level: e.target.value })
  }
  handleClick = async(id) => {
    await request.put(`http://localhost:3000/api/adventures/${id}`).set('authorization', this.props.token)
    const fetchedData = await request.get('http://localhost:3000/api/adventures').set('authorization', this.props.token)
    const newArrayOfAdventures = fetchedData.body
    this.setState({ adventures: newArrayOfAdventures })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name of the Adventure!
            <input name="name" onChange={this.handleNameChange} />
          </label>
          <label>
            How Dangerous is the Adventure?
            <input name="danger_level" type="number" onChange={this.handleDangerChange} />
          </label>
          <button>Submit New Adventure</button>
        </form>
        <ul>
          {
            this.state.adventures.map(adventure => <li onClick={() => this.handleClick(adventure.id)} className={ adventure.completed ? 'complete' : 'incomplete'} >
              <p>Adventure Name: {adventure.name}</p> 
              <p>Danger Level: {adventure.danger_level}</p>
              <p>Is The Adventure Completed? {String(adventure.is_completed)}</p>
            </li>)
          }
        </ul>
      </div>
    )
  }
}
