import React, { useState } from 'react'
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react'

const Channels = () => {
  const [ channels, setChannels ] = useState([]);
  const [ modal, setModal ] = useState(false);
  const [ channelName, setChannelName ] = useState('');
  const [ channelDetails, setChannelDetails ] = useState('');

  const openModal = () => setModal(true)

  const closeModal = () => setModal(false)

  const handleChannelName = (e) => {
    setChannelName(e.target.value)
  }

  const handleChannelDetails = (e) => {
    setChannelDetails(e.target.value)
  }

  return (
    <>
      <Menu.Menu 
      style={{ paddingBottom: '2rem'}}
      >
        <Menu.Item>
          <span>
            <Icon name="exchange"/> CHANNELS
          </span> {" "}
          ({ channels.length }) 
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header> Add a channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Channel Name"
                name="channelName"
                onChange={handleChannelName}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About Channel" 
                name="channelDetails"
                onChange={handleChannelDetails}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark"/> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove"/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Channels
