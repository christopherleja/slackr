import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Segment } from 'semantic-ui-react'
import firebase from '../../firebase'

const MessageForm = ({ messagesRef }) => {

  const [ message, setMessage ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ errors, setErrors ] = useState([])

  const channel = useSelector(state => state.channel.currentChannel)
  const currentUser = useSelector(state => state.user.currentUser)

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const createMessage = () => {
    const newMessage = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      },
      content: message
    }
    return newMessage
  }

  const sendMessage = () => {
    if (message){
      setLoading(true)
      messagesRef
      .child(channel.id)
      .push()
      .set(createMessage())
      .then(() => {
        setLoading(false)
        setMessage('')
        setErrors([])
      })
      .catch(err => {
        console.error(err)
        const errArr = [...errors, err]
        setErrors(errArr)
        setLoading(false)
      })
    } else {
      const err = { message: "Please add a message"}
      const errArr = [...errors, err]
      setErrors(errArr)
    }
  }

  return (
    <Segment className="message__form">
      <Input 
        fluid
        name="message"
        style={{ marginBottom: '0.7em' }}
        label={<Button icon="add" />}
        labelPosition="left"
        onChange={handleMessage}
        placeholder="Write your message"
        value={message}
        className={
          errors.length && errors.some(error => error.message.includes('message')) 
          ? 'error' : ''
        }
      />
      <Button.Group icon widths="2">

        <Button 
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          onClick={sendMessage}
          disabled={loading}
        />

        <Button 
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  )
}

export default MessageForm
