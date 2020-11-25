import React, { useState } from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'

const FileModal = ({ modal, closeModal }) => {

  const [ file, setFile ] = useState(null)

  const addFile = (event) => {
    const file = event.target.files[0]
    console.log(file)
  }

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input 
          fluid
          label="File types: jpg, png"
          name="file"
          type="file"
          onChange={addFile}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          inverted
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
