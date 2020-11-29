import React, { useState, useEffect } from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'
import firebase from '../../firebase'
import { useList } from 'react-firebase-hooks/database'

import { useSelector } from 'react-redux'
import Message from './Message'

const messagesRef = firebase.database().ref('messages')

const Messages = () => {

  const [ snapshots, loading, error ] = useList(messagesRef)

  const [ messages, setMessages ] = useState([])
  const [ messagesLoading, setMessagesLoading ] = useState(true)
  const [ messagesCurrent, setMessagesCurrent ] = useState(false)
  
  const currentChannel = useSelector(state => state.channel.currentChannel)
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    if (currentChannel && currentUser && !messagesCurrent){
      addListeners(currentChannel.id)
    } 
  }, [currentChannel, messagesCurrent])

  const addListeners = channelId => {
    addMessageListener(channelId)
  }

  const addMessageListener = channelId => {
    setMessages([])
    const loadedMessages = [];

    messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      setMessages(loadedMessages)
    })
    setMessagesLoading(false)
  }

  const updateMessages = () => {
    setMessagesCurrent(false)
  }

  const displayMessages = () => {
    return messages.map(message => {
      return <Message 
      key={message.timestamp}
      message={message}
      user={message.user}
      userId={currentUser.uid}
      />
    })
  }

  return (
    <>
      <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">
            {messages.length && displayMessages()}
          </Comment.Group>
        </Segment>

        <MessageForm messagesRef={messagesRef} updateMessages={updateMessages} />
    </>
  )
}

export default Messages
