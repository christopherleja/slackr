import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Segment } from 'semantic-ui-react'
import firebase from '../../firebase'
import FileModal from './FileModal'
import ProgressBar from './ProgressBar'

const MessageForm = ({ messagesRef, updateMessages }) => {
  
  const [ message, setMessage ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ errors, setErrors ] = useState([])
  const [ modal, setModal ] = useState(false)
  const [ file, setFile ] = useState(null)

  const channel = useSelector(state => state.channel.currentChannel)
  const { uid, displayName, photoURL } = useSelector(state => state.user.currentUser)

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const createMessage = (fileUrl = null) => {
    const newMessage = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: uid,
        name: displayName,
        avatar: photoURL
      },
    };
      if (fileUrl !== null){
        newMessage['image'] = fileUrl
      } else {
        newMessage['content'] = message
    }
    return newMessage
  }

  const handleUploadError = (err) => {
    console.error(err)
    const newErr = [...errors, err]
    setErrors(newErr)
  }

  const uploadFile = (file) => {
    setFile(file)
  }

  const readyToSend = (url) => {
    sendFileMessage(url, messagesRef, channel.id)
  }

  const sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref.child(pathToUpload)
      .push()
      .set(createMessage(fileUrl))
      .then(() => {
        console.log("sending")
      })
      .catch(err => {
        handleUploadError(err)
      })
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
          updateMessages()
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
          onClick={openModal}
        />
        <FileModal 
          modal={modal}
          closeModal={closeModal}
          uploadFile={uploadFile}
        />
      </Button.Group>
      {file && 
      <ProgressBar 
        file={file}
        setFile={setFile}
        readyToSend={readyToSend}
      />}
    </Segment>
  )
}

export default MessageForm
