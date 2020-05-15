import React, { Component } from 'react'
import AdventuresList from './AdventuresList.js'

export default class AdventuresUL extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.adventures.map(adventure => <AdventuresList adventure={adventure} handleClick={this.props.handleClick}/>)}
                </ul>
            </div>
        )
    }
}