
import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlipGame from './FlipGame';

function App() {
  var playButtonClicked = e => {
    setPlayin(true)
  }
  var [playin, setPlayin] = React.useState(false)
  var opts = React.useRef({
    n_players : 2,
    n_pairs : 3,
    playerName : ["Amor", "Dimpi"]
  })
  return (
    <div className="App">
      <header className="App-header">
        <h2>Memory Flip!</h2>
      </header>
      <Container>
        <Row>
      {playin !== undefined && playin === false && (
          <Button id = "play-button" onClick = {playButtonClicked}> PLAY </Button>
      )}
      {playin &&
          <FlipGame opts = {opts.current} setPlayin = {setPlayin}/>
      }
      </Row>
      </Container>
      
    </div>
  );
}

export default App;
