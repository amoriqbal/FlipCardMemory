
import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlipGame from './FlipGame';
import RulesCarousel from './RulesCarousel'

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
        <h1>Memory Flip!</h1>
      </header>
      <Container>
        {playin !== undefined && playin === false && (<>
          <Row>
            <div className = "col-12">
              <RulesCarousel/>
            </div>
          </Row>
          <Row>
            <div className = "col-12">
              <Button id = "play-button" onClick = {playButtonClicked}> <h2><strong>PLAY</strong></h2> </Button>
              
            </div>
          </Row>
        </>)}
        {playin &&
            <FlipGame opts = {opts.current} setPlayin = {setPlayin}/>
        }
      </Container>
      
    </div>
  );
}

export default App;
