import React, { Component } from 'react'
import request from 'superagent';

export default class SignIn extends Component {
    State = {
        email: '',
        password: ''
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        let token = await request.post(`https://afternoon-coast-11547.herokuapp.com/auth/signUp`, this.state)
        localStorage.setItem('TOKEN', token.body.token)
        this.props.history.push('/adventures')
    }

    render() {
        return (
            <div>
                Sign In Page
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email: 
                    <input onChange={(e) => this.setState({ email: e.target.value})} />
                    </label>
                    <label>
                        Password: 
                    <input onChange={(e) => this.setState({ password: e.target.value})} />
                    </label>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}
