import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react'

import firebase from '../../firebase'
import { CLEAR_USER } from '../../store/actions'

const UserPanel = () => {
  const dispatch = useDispatch()
  const { displayName, photoURL } = useSelector(state => state.user.currentUser)

  const handleSignout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log('signed out'))
        .catch(error => {
          console.error(error)
        })
      dispatch({ type: CLEAR_USER })
  }

  const dropdownOptions = () => {
    return [{
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{displayName}</strong>
        </span>
        ),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={handleSignout}>Sign Out</span>
    }]
}

  return (
    <Grid style={{ background: '#4c3c4c'}}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2rem', margin: 0}}>
        {/* Application Header */}
          <Header 
            inverted 
            floated="left" 
            as="h2"
          >
            <Icon name="code"/>
            <Header.Content>Slackr</Header.Content>
          </Header>
          
        {/* User Dropdown */}
          <Header 
            style={{ padding: '0.25rem'}} 
            as="h4" 
            inverted>
              <Dropdown trigger={
                <span>
                  <Image src={photoURL} spaced="right" avatar />
                  { displayName }
                </span>
              } 
              options={dropdownOptions()}
              />
            </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

export default UserPanel
