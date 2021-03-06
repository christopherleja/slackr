import React from 'react'
import { Comment, Image } from 'semantic-ui-react'
import moment from 'moment'

const isOwnMessage = (user, userId) => user.id === userId ? 'message__self' : ''

const timeFromNow = timestamp => moment(timestamp).fromNow();

const isImage = (message) => {
  return message.hasOwnProperty('image') && !message.hasOwnProperty('content')
}

const Message = ({ message, user, userId }) => {

  return (
    <Comment>
      <Comment.Avatar src={user.avatar} alt={`${user.name}`} />
        <Comment.Content 
          className={isOwnMessage(user, userId)}
        >
        <Comment.Author as='a'>{user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        { isImage(message) ? 
          <Image src={message.image} className="message__image" /> : 
          <Comment.Text>{message.content}</Comment.Text> 
          }
      </Comment.Content>
    </Comment>
  )
}

export default Message
