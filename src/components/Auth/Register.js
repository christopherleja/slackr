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
import md5 from 'md5'

const Register = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ errors, setErrors ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ userRef, setUserRef ] = useState(firebase.database().ref('users'))

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

  const isFormValid = () => {
    let error;

    if (isFormEmpty()){
      error = { message: "Please fill in all fields"};
      setErrors([...errors, error])
      return false;
    } 
    else if (!passwordIsValid()){
      error = { message: "Password is invalid"}
      setErrors([...errors, error])
      return false;
    }
    else return true;
  }

  const passwordIsValid = () => {
    if (password === passwordConfirm && password.length > 6) return true
    else return false;
  }

  const isFormEmpty = () => {
    return !username.length || !password.length || !passwordConfirm.length || !email.length
  }

  const displayErrors = () => {
    return errors.map((err, i) => {
      return <p key={i}>{err.message}</p>
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    if (isFormValid()){
      setLoading(true)
      try {
        const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        
        await newUser.user.updateProfile({
          displayName: username,
          photoURL: `http://gravatar.com/avatar/${md5(newUser.user.email)}?d=identicon`
        })

        const res = await saveUser(newUser)
        
        console.log(res)
      } catch (error) {
        console.error(error)
        setErrors([...errors, error])
      }
    }
    setLoading(false)
  }

  const handleErrors = (errors, inputName) => {
    return errors.some(err => 
      err.message.toLowerCase().includes(inputName)
    ) 
    ? 'error'
    : ''
  }

  const saveUser = async ({ user }) => {
    return await userRef.child(user.uid).set({
      name: user.displayName,
      avatar: user.photoURL
    })
  }

  return (
    <Grid textAlign="center" verticalAlign='middle' className="app">
      <Grid.Column style={{ maxWidth: 450}}>
        <Header as="h1" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for Slackr
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
              className={handleErrors(errors, 'username')}
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

            <Form.Input 
              fluid 
              name="passwordConfirmation" 
              icon="repeat" 
              value={passwordConfirm}
              iconPosition="left" 
              className={handleErrors(errors, 'password')}
              placeholder="Password Confirmation" 
              onChange={handlePasswordConfirm} 
              type="password" 
            />

            <Button disabled={loading} className={loading ? "loading" : ''} color="orange" fluid size="large">
              Submit
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
          Already a user? &nbsp;
          <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>

    </Grid>
  )
}

export default Register