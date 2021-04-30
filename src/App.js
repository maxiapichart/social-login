// React core.
import React, { Component } from 'react'

// Firebase.
import firebase from 'firebase/app'
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// Styles.
import './App.css' // This uses CSS modules.

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyBkvxkBzh0tNKo58N1B_Y_6_V1tr4YJ9GY',
  authDomain: 'react-social-login-40a0d.firebaseapp.com',
  projectId: 'react-social-login-40a0d',
  storageBucket: 'react-social-login-40a0d.appspot.com',
  messagingSenderId: '594287601543',
  appId: '1:594287601543:web:e0567c090b613811139522',
  measurementId: 'G-H0BS18V21W',
}

// Instantiate a Firebase app.
firebase.initializeApp(firebaseConfig)

class App extends Component {
  // The component's local state.
  state = {
    // Local siged in state.
    isSignedIn: false,
  }
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false,
    },
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }))
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    return !this.state.isSignedIn ? (
      <div className="container">
        <h1>FirebaseUI-React</h1>
        <h1> with Firebase Authentication</h1>
        <p>Please sign-in</p>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    ) : (
      <div className="container">
        <h1>FirebaseUI-React</h1>
        <h1> with Firebase Authentication</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in
        </p>
        <img
          className="user-profile"
          src={firebase.auth().currentUser.photoURL}
          alt="user-profile"
        />
        <button className="sign-out" onClick={() => firebase.auth().signOut()}>
          Sign out
        </button>
      </div>
    )
  }
}

export default App
