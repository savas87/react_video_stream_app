import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signIn, signOut, logIn} from '../action'

class GoogleAuth extends Component { 
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '764042888527-m1a1cvbb6jsmrgcdrlf71cqoackla9n9.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut();
        }
    }
    onSignIn = () => {
        this.auth.signIn()
    }
    onSignOut = () => {
        this.auth.signOut()
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button"
                onClick={this.onSignOut}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui green google button"
                onClick={this.onSignIn}>
                <i className="google icon"></i>
                Sign In
            </button>
            )
        }
    }
    check = () => {
        this.props.logIn();
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}                         
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.auth.isSignedIn,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {logIn, signIn, signOut})(GoogleAuth);