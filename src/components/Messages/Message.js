import React from 'react'
import { Comment } from 'semantic-ui-react'
import moment from 'moment'

const isOwnMessage = (user, userId) => {
  return user.id === userId ? 'message__self' : ''
}

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user, userId }) => {

  return (
    <Comment>
      <Comment.Avatar src={user.avatar} alt={`${user.name}`} />
        <Comment.Content 
          className={isOwnMessage(user, userId)}
        >
        <Comment.Author as='a'>{user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Message
