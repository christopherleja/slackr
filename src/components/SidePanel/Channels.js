import { cleanup } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react'
import firebase from '../../firebase'
import { SET_CURRENT_CHANNEL } from '../../store/actions';

const channelsRef = firebase.database().ref('channels')

const Channels = () => {
  const [ channels, setChannels ] = useState([]);
  const [ modal, setModal ] = useState(false);
  const [ channelName, setChannelName ] = useState('');
  const [ channelDetails, setChannelDetails ] = useState('');
  const [ firstLoad, setFirstLoad ] = useState(true)

  const { currentChannel } = useSelector(state => state.channel)

  const dispatch = useDispatch()

  const { displayName, photoURL } = useSelector(state => state.user.currentUser)

  useEffect(() => {
    addListeners()
    return function cleanup(){
      removeListeners()
    }
  }, [])

  useEffect(() => {
    setFirstChannel()
  }, [channels])

  const addListeners = () => {
    let loadedChannels = [];

    channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels)
    });
  }

  const removeListeners = () => {
    channelsRef.off();
  }

  const openModal = () => setModal(true)

  const closeModal = () => setModal(false)

  const handleChannelName = (e) => {
    setChannelName(e.target.value)
  }

  const handleChannelDetails = (e) => {
    setChannelDetails(e.target.value)
  }

  const formIsValid = () => {
    if (channelName && channelDetails) return true;
    return false;
  }

  const addChannel = async () => {
    const key = channelsRef.push().key;
    
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: displayName,
        avatar: photoURL
      }
    };

    try {
      await channelsRef
        .child(key)
        .update(newChannel)      
    } catch (error) {
      console.error(error)
    }

    setChannelDetails('')
    setChannelName('')
    closeModal()
    console.log('channel added')
  }

  const setFirstChannel = () => {
    const firstChannel = channels[0];
    if (firstLoad && channels.length){
      dispatch({type: SET_CURRENT_CHANNEL, payload: firstChannel})
      setFirstLoad(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (formIsValid){
      addChannel()
    }
  }

  const isChannelActive = (channel) => {
    if (currentChannel){
      return channel.id === currentChannel.id
    }
  }

  const changeChannel = channel => {
    dispatch({ type: SET_CURRENT_CHANNEL, payload: channel })
  }

  const displayChannels = () => {
    if (channels.length){
      return channels.map(channel => {
        return (
          <Menu.Item
            key={channel.id}
            onClick={() => changeChannel(channel)}
            name={channel.name}
            style={{ opacity: 0.7 }}
            active={isChannelActive(channel)}
          >
            # {channel.name}
          </Menu.Item>
        )
      })
    }
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
        {displayChannels()}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header> Add a channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
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
          <Button color="green" inverted onClick={handleSubmit}>
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
