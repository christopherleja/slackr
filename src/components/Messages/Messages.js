import React, { useState, useEffect, useRef } from 'react'
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
  const [ numUniqueUsers, setNumUniqueUsers ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchLoading, setSearchLoading ] = useState(false)
  const [ searchResults, setSearchResults ] = useState([])
  
  const currentChannel = useSelector(state => state.channel.currentChannel)
  const currentUser = useSelector(state => state.user.currentUser)

  const displayChannelName = channel => {
    return channel ? `#${channel.name}` : '';
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setSearchLoading(true)
    handleSearchMessages(messages)
  }

  const countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)){
        acc.push(message.user.name);
      }
      return acc;
    }, [])

    const numUniqueUsers = uniqueUsers.length !== 1 ? 
    `${uniqueUsers.length} users` : `${uniqueUsers.length} user`
    
    setNumUniqueUsers(numUniqueUsers)
  }

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
    countUniqueUsers(loadedMessages)
  }

  const updateMessages = () => {
    setMessagesCurrent(false)
  }

  const displayMessages = (messages) => {
    if (messages.length){
      return messages.map(message => {
        return <Message 
        key={message.timestamp}
        message={message}
        user={message.user}
        userId={currentUser.uid}
        />
      })
    }
  }

  const handleSearchMessages = () => {
    const channelMessages = [...messages]

    const regex = new RegExp(searchTerm, 'gi')
    const searchResults = channelMessages.filter(message => {
      return message.content && message.content.match(regex)
    })

    setSearchResults(searchResults)
    setSearchLoading(false)
  }

  return (
    <>
      <MessagesHeader 
        channelName={displayChannelName(currentChannel)}
        numUniqueUsers={numUniqueUsers}
        handleSearchChange={handleSearchChange}
      />
        <Segment>
          <Comment.Group className="messages">
            {searchTerm ? 
              displayMessages(searchResults) :
              displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm messagesRef={messagesRef} updateMessages={updateMessages} />
    </>
  )
}

export default Messages
