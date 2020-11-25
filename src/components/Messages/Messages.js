import React, { useState, useEffect } from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'
import firebase from '../../firebase'
import { useSelector } from 'react-redux'
import Message from './Message'


const Messages = () => {

  const [ messagesRef, setMessagesRef ] = useState(firebase.database().ref('messages'))
  const [ messages, setMessages ] = useState([])
  const [ messagesLoading, setMessagesLoading ] = useState(true)
  const [ messagesCurrent, setMessagesCurrent ] = useState(true)
  
  const currentChannel = useSelector(state => state.channel.currentChannel)
  const currentUser = useSelector(state => state.user.currentUser)

  const isCurrent = messagesCurrent === false

  useEffect(() => {
    if (currentChannel && currentUser){
      addListeners(currentChannel.id)
      setMessagesCurrent(true)
    }
  }, [currentChannel, messages.length, isCurrent])

  const addListeners = channelId => {
    addMessageListener(channelId)
  }

  const addMessageListener = channelId => {
    setMessages([])
    const loadedMessages = [];

    messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      setMessages(loadedMessages)
      setMessagesLoading(false)
    })
  }

  const updateMessages = () => {
    setMessagesCurrent(false)
  }

  const displayMessages = (messages) => (
    messages.length > 0 && messages.map(message => {
      return <Message 
        key={message.timestamp}
        message={message}
        user={message.user}
        userId={currentUser.uid}
      />
    })
  )

  return (
    <>
      <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">
            {displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm messagesRef={messagesRef} updateMessages={updateMessages} />
    </>
  )
}

export default Messages
