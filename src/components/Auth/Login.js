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


const Login = () => {

  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ errors, setErrors ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const displayErrors = () => {
    return errors.map((err, i) => {
      return <p key={i}>{err.message}</p>
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFormValid()){
      setErrors([])
      setLoading(true)

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
  
        setTimeout(() => console.log(user), 1000)
      } catch (error) {
        console.error(error)
        setErrors([...errors, error])
      }
    }
    setLoading(false)
  }

  const isFormValid = () => email && password

  const handleErrors = (errors, inputName) => {
    return errors.some(err => 
      err.message.toLowerCase().includes(inputName)
    ) 
    ? 'error'
    : ''
  }

  return (
    <Grid textAlign="center" verticalAlign='middle' className="app">
      <Grid.Column style={{ maxWidth: 450}}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to Slackr
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>

            <Form.Input 
              fluid 
              name="email" 
              icon="mail" 
              value={email}
              iconPosition="left" 
              placeholder="Email" 
              className={handleErrors(errors, 'email')}
              onChange={handleEmail} 
              type="text" 
            />

            <Form.Input 
              fluid 
              name="password" 
              icon="lock" 
              value={password}
              iconPosition="left"
              className={handleErrors(errors, 'password')}
              placeholder="Password" 
              onChange={handlePassword} 
              type="password" 
            />

            <Button disabled={loading} className={loading ? "loading" : ''} color="violet" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        { errors.length ? (
          <Message error>
            <h3>Error</h3>
            {displayErrors()}
          </Message> 
        ): null }
        <Message>
          New to Slackr? &nbsp;
          <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>

    </Grid>
  )
}

export default Login