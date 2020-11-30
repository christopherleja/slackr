import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from '../../firebase'
import { Menu, Icon } from 'semantic-ui-react'

const usersRef = firebase.database().ref('users')
const connectedRef = firebase.database().ref('.info/connected')
const presenceRef = firebase.database().ref('presence')

const DirectMessages = () => {
  const [ users, setUsers ] = useState([])

  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    if (currentUser) {
      addListeners(currentUser.uid)
    }
  }, [])

  const addListeners = (userId) => {
    const loadedUsers = [];

    usersRef.on('child_added', snap => {
      if (userId !== snap.key){
        let user = snap.val()
        user['uid'] = snap.key
        user['status'] = 'offline'
        loadedUsers.push(user)
        setUsers(loadedUsers)
      }
    })

    connectedRef.on('value', snap => {
      if (snap.val() === true){
        const ref = presenceRef.child(userId)
        ref.set(true)
        ref.onDisconnect().remove(err => {
          if (err){
            console.error(err)
          }
        })
      }
    })

    presenceRef.on('child_added', snap => {
      if (userId !== snap.key){
        addStatusToUser(snap.key)
      }
    })

    presenceRef.on('child_removed', snap => {
      if (userId !== snap.key){
        addStatusToUser(snap.key, false)      
      }
    })
  }

  const addStatusToUser = (userId, connected=true) => {
    const updatedUsers = users.reduce((acc, user) => {
      if (currentUser.uid === userId){
        user['status'] = connected ? 'online' : 'offline'
      }
      return acc.concat(user)
    }, [])
    setUsers(updatedUsers)
  }

  const isUserOnline = user => user.status === 'online'

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
      <span>
        <Icon name="mail"/> DIRECT MESSAGES
      </span>{' '}
      { users.length }
      </Menu.Item>
      {users.map(user => (
        <Menu.Item
          key={user.uid}
          onClick={() => {console.log(user)}}
          style={{ opacity: 0.7, fontStyle: 'italic' }}
        >
          <Icon 
            name="circle"
            color={isUserOnline(user) ? 'green' : 'red'}
          />
          @ {user.name}
        </Menu.Item>
      ))}
    </Menu.Menu>
  )
}

export default DirectMessages
