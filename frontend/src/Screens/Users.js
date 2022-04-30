import React, { Component, useState } from 'react';
//import React, { useState } from 'react'
import axios from 'axios'
import '../components/Users.css'
import { Row, Col } from 'react-bootstrap'
import history from "../history";
import data from "bootstrap/js/src/dom/data";

class Users extends Component {
    constructor() {
        super();
        this.state = { users: [], loading: true };
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        axios.get(`http://localhost:8000/users`).then(users => {
            this.setState({ users: users.data, loading: false })
        })
    }

    render() {
            const loading = this.state.loading;
            return ( <
                div >
                <
                section className = "row-section" >
                <
                div className = "container" >
                <
                div className = "row" >
                <
                h2 className = "text-center" > < span > Liste des utilisateurs < /span> < /
                h2 > <
                /div> {
                loading ? ( <
                    div className = { 'row text-center' } >
                    <
                    span className = "fa fa-spin fa-spinner fa-4x" > < /span> < /
                    div >
                ) : ( <
                    div className = { 'row' } > {
                        this.state.users.map(user =>
                            <
                            div className = "col-md-10 offset-md-1 row-block"
                            key = { user.id } >
                            <
                            ul id = "sortable" >
                            <
                            li >
                            <
                            div className = "media" >
                            <
                            Row >
                            <
                            Col >
                            <
                            div className = "media-body" >
                            <
                            h4 > { user.email } < /h4> <
                        p > { user.username } < /p> < /
                        div >
                                {
                                    user.isVerified ?
                                        <
                                            span className = "badge rounded-pill bg-success" > status < /span> : <
                                            span className = "badge rounded-pill bg-danger" > Status < /span>
                                } <
                        /Col> <
                        Col >
                        <
                        div style = {
                            { marginLeft: '31.25rem' }
                        }  >
                        <
                        button onClick = {
                            () => activate(user.username)
                        }
                        className = "btn btn-default" > { user.isVerified ? "Désactiver" : "Activer" } < /button> < /
                        div > <
                        /Col> < /
                        Row > <
                        /div> < /
                        li > <
                        /ul> < /
                        div >
                    )
                } <
                /div>
            )
        } <
        /div> < /
    section > <
        /div>
)
}
}

function activate(username) {
    console.log(username)
    axios.put(`http://127.0.0.1:8000/activate`, { username });
    window.location.reload();
}
export default Users;