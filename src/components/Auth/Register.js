import React, { useState } from 'react'
import {
  Button, 
  Grid, 
  Form, 
  Header, 
  Icon,
  Message,
  Segment, 
} from 'semantic-ui-react'
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom'

const Register = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')
  const [ email, setEmail ] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
  
      console.log(user)
    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <Grid textAlign="center" verticalAlign='middle' className="app">
      <Grid.Column style={{ maxWidth: 450}}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>

            <Form.Input 
              fluid 
              name="username" 
              icon="user"
              value={username}
              iconPosition="left" 
              placeholder="Username" 
              onChange={handleUsername} 
              type="text" 
            />

            <Form.Input 
              fluid 
              name="email" 
              icon="mail" 
              value={email}
              iconPosition="left" 
              placeholder="Email" 
              onChange={handleEmail} 
              type="text" 
            />

            <Form.Input 
              fluid 
              name="password" 
              icon="lock" 
              value={password}
              iconPosition="left" 
              placeholder="Password" 
              onChange={handlePassword} 
              type="password" 
            />

            <Form.Input 
              fluid 
              name="passwordConfirmation" 
              icon="repeat" 
              value={passwordConfirm}
              iconPosition="left" 
              placeholder="Password Confirmation" 
              onChange={handlePasswordConfirm} 
              type="password" 
            />

            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? &nbsp;
          <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>

    </Grid>
  )
}

export default Register