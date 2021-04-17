
import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlipGame from './FlipGame';

function App() {
  var play_states = {
    HOME : "HOME",
    PLAY : "PLAY",
    OVER : "OVER"
  }

  var playButtonClicked = e => {
    setPlayin(play_states.PLAY)
  }
  var [playin, setPlayin] = React.useState(play_states.HOME)
  var opts = React.useRef({
    n_players : 2,
    n_pairs : 3
  })
  return (
    <div className="App">
      <header className="App-header">
        <h2>Memory Flip!</h2>
      </header>
      <Container>
        <Row>
      {playin && playin === play_states.HOME && (
          <Button id = "play-button" onClick = {playButtonClicked}> PLAY </Button>
      )}
      {playin && playin === play_states.PLAY &&
          <FlipGame opts = {opts.current} setPlayin = {setPlayin}/>
      }
      </Row>
      </Container>
      
    </div>
  );
}

export default App;
