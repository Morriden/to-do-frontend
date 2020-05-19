import React, { Component } from 'react'

export default class SubmitNewAdventure extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
          <label>
            Name of the Adventure!
            <input name="name" onChange={this.props.handleNameChange} />
          </label>
          <label>
            How Dangerous is the Adventure?
            <input name="danger_level" type="number" onChange={this.props.handleDangerChange} />
          </label>
          <button>Submit New Adventure</button>
        </form>
            </div>
        )
    }
}
