import React, { useState } from 'react'
import { Header, Icon, Input, Segment } from 'semantic-ui-react'

const MessagesHeader = ({ channelName, numUniqueUsers, handleSearchChange }) => {
  return (
    <Segment clearing>
      
      {/* Channel Title */}
      <Header 
        fluid="true"
        as='h2' 
        floated="left"
        style={{ marginBottom: 0 }}
        >
        <span>
          {channelName}
          <Icon 
            name="star outline" 
            color="black"
          />
        </span>
        <Header.Subheader>
          {numUniqueUsers}
        </Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
          onChange={handleSearchChange}
        />
      </Header>
    </Segment>
  )
}

export default MessagesHeader
