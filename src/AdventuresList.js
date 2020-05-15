import React, { Component } from 'react'

export default class AdventuresList extends Component {
    render() {
        const adventure = this.props.adventure;
        return <li onClick={() => this.props.handleClick(adventure.id)} className={ adventure.is_completed ? 'complete' : 'incomplete'} >
                    <p>Adventure Name: {adventure.name}</p> 
                    <p>Danger Level: {adventure.danger_level}</p>
                    <p>Is The Adventure Completed? {String(adventure.is_completed)}</p>
                </li>
    
    }
}
