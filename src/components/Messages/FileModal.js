import React, { useState, useEffect } from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'
import mime from 'mime-types'
import useStorage from '../../hooks/useStorage'
import ProgressBar from './ProgressBar'

const authorized = ['image/jpeg', 'image/png']

const FileModal = ({ modal, closeModal, uploadFile }) => {

  const [ file, setFile ] = useState(null)

  const addFile = (event) => {
    const newFile = event.target.files[0]
    if (newFile){
      setFile(newFile)
    }
  }

  const isAuthorized = (filename) => authorized.includes(mime.lookup(filename));

  const sendFile = () => {
    console.log(isAuthorized(file.name))
    if (file){
      if (isAuthorized(file.name)){
        const metadata = { contentType: mime.lookup(file.name) }
        uploadFile(file, metadata)
        closeModal()
        setFile(null)
      }
    }
  }

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input 
          fluid
          label="File types: jpeg, png"
          name="file"
          type="file"
          onChange={addFile}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          inverted
          onClick={sendFile}
        >
          <Icon name="checkmark" /> Send
        </Button>

        <Button
          color="red"
          inverted
          onClick={closeModal}
        >
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default FileModal
