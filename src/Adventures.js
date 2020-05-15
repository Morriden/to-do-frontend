import React, { Component } from 'react'
import './App.css'
import request from 'superagent';
import AdventuresUL from './AdventuresUL.js';
import SubmitNewAdventure from './SubmitNewAdventure.js';

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
    const fetchedData = await request.get('https://afternoon-coast-11547.herokuapp.com/api/adventures').set('authorization', this.props.token)
    const data = fetchedData.body
    this.setState({ adventures: data })
  }

  handleSubmit = async(e) => {
    const newArrayOfAdventures = this.state.adventures;
    e.preventDefault();
    const newAdventure = await request.post(`https://afternoon-coast-11547.herokuapp.com/api/adventures`, {
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
    await request.put(`https://afternoon-coast-11547.herokuapp.com/api/adventures/${id}`).set('authorization', this.props.token)
    const fetchedData = await request.get('https://afternoon-coast-11547.herokuapp.com/api/adventures').set('authorization', this.props.token)
    const newArrayOfAdventures = fetchedData.body
    this.setState({ adventures: newArrayOfAdventures })
  }

  render() {
    console.log(this.state)
    return (
        <div>
          <SubmitNewAdventure handleNameChange={this.handleNameChange} handleDangerChange={this.handleDangerChange} handleSubmit={this.handleSubmit}/>
        <div>
          <AdventuresUL adventures={this.state.adventures} handleClick={this.handleClick}/>
        </div>
      </div>
    )
  }
}
