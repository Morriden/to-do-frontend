import React, { Component } from 'react'
import request from 'superagent';

export default class SignUp extends Component {
    State = {
        email: '',
        password: ''
    }


    handleSubmit = async(e) => {
        e.preventDefault();
        let token = await request.post(`http://localhost:3000/auth/signup`, this.state)
        localStorage.setItem('TOKEN', token.body.token)
        this.props.history.push('/adventures')
    }

    render() {
        console.log(this.state)
        return (
            <div>
                Sign Up Page
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
