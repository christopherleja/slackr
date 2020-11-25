import '../css/App.css'
import { Grid } from 'semantic-ui-react'
import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'
import { useSelector } from 'react-redux'

function App() {

  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <>
      { currentUser &&
      <Grid 
        columns="equal" 
        className="app" 
      >
        <ColorPanel />
        <SidePanel />
        <Grid.Column 
        style={{ marginLeft: '22rem' }}
        >
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
        
      </Grid>
      }
    </>
  );
}

export default App;