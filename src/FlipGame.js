import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FlipGame.css';
import Toast from "react-bootstrap/Toast";
import { Queue } from '@datastructures-js/queue';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { Card } from 'react-bootstrap';

function App(props, _children) {
    var [faceUp, flip] = React.useState([])
    var [prevFlip, setPrevFlip] = React.useState(-1)
    var [boardLocked, setBoardLock] = React.useState(false)
    var [cardLocked, setCardLock] = React.useState([])
    var [showWrong, setShowWrong] = React.useState(false)
    var [showRight, setShowRight] = React.useState(false)
    var [cnt, setCnt] = React.useState(0)
    var updQueue = React.useRef(new Queue())
    var [matchPairCount, setMatchPairCount] = React.useState(0)
    var [scores, setScores] = React.useState([])
    var [turn, setTurn] = React.useState(0)
    var [bonus, setBonus] = React.useState(1)
    var {opts, setPlayin} = props
    

    React.useEffect(() => {
        var faceUp_init = Array.from('x'.repeat(opts.n_pairs * 2), (_g)=>false)
        flip(faceUp_init)
        var cardLocked_init = Array.from('x'.repeat(opts.n_pairs * 2), (_g)=>false)
        setCardLock(cardLocked_init)
        console.log("effect executed once")

        var players_init = Array.from('x'.repeat(opts.n_players), (_g)=>0)
        setScores(players_init)
    },[opts.n_pairs, opts.n_players])

    React.useEffect(() => {
        setBonus(1)
    }, [turn])

    React.useEffect(()=>{
        console.log("setFaceUp faceUp  = " + faceUp)
        if(updQueue.current.isEmpty()) return
        var act = updQueue.current.dequeue()
        execFaceUpQu(act[0], act[1])
        setCnt(cnt + 1)
    }, [faceUp, cnt])

    var faceDownImg = "logo512.png"
    var imgs = []
    for(var i = 0; i < (opts.n_pairs * 2); i++){
        imgs.push(`gimg${`${1000 + i}`.substr(1)}.png`)
    }

    var isFaceUp = (i) =>
        (faceUp && i < faceUp.length && faceUp[i])

    function right_matched(x, y){
        var new_card_lock = []
        var new_scores = []
        setShowRight(true)
        setMatchPairCount(matchPairCount + 1)

        new_scores = [...scores]
        new_scores[turn] += bonus
        setBonus(bonus + 1)
        setScores(new_scores)
        for(var i = 0; i < cardLocked.length; i++){
            if((!cardLocked[i]) && (i === x || i === y)){
                new_card_lock.push(true)
            } else {
                new_card_lock.push(cardLocked[i])
            }
        }
        setCardLock(new_card_lock)
        setTimeout(()=>{
            setShowRight(false)
            console.log("timeout right match")
        }, 1000)
    }

    function wrong_matched(x, y){
        console.log("wrongly matched " + x.toString() + " " + y.toString())
        setBoardLock(true)
        setShowWrong(true)
        setTimeout(()=>{
            setBoardLock(false)
            setShowWrong(false)
            setFaceUp(x, false)
            console.log(faceUp)
            setFaceUp(y, false)
            console.log(faceUp)
            console.log("timeout wrong match")
            setTurn((turn + 1) % opts.n_players)
        }, 1000)
    }

    function picked(y){
        if(prevFlip === y || boardLocked || cardLocked[y]){return}
        setFaceUp(y, true)

        if(prevFlip === -1){
            setPrevFlip(y)
        } else {
            var x = Math.min(prevFlip, y)
            y = Math.max(prevFlip, y)

            if(x % 2 === 0 && (x + 1) === y){
                right_matched(x,y)
            } else {
                wrong_matched(x,y)
            }    
            setPrevFlip(-1)
        }
    }

    function execFaceUpQu(i, d){
        if(boardLocked || cardLocked[i]) {
            console.log("setFaceUp locked " + i.toString() + " " + d.toString())
        }
        if(faceUp && i < faceUp.length){
            var new_arr = []
            for(var j = 0; j < faceUp.length; j++){
                new_arr.push(faceUp[j])
            }
            new_arr[i] = d
            flip(new_arr)
            return true
        }
        console.log("setFaceUp failed " + i.toString() + " " + d.toString())
        return false
    }

    function setFaceUp(i, d){
        updQueue.current.enqueue([i,d])
        setCnt(cnt + 1)
    }

    function getWinner(){
        
        try{
            var maxScore = 0
            for(var i = 0 ; i < scores.length; i++){
                if(scores[i] > scores[maxScore]){
                    maxScore = i
                }
            }
            return `${opts.playerName[maxScore]} Wins!!`;
        } catch (ex) {
            return "no winner yet"
        }
    }
    return (
        <div className = "container-fluid">
            <div className = "row">
                    
                <div className = "col-lg-3 col-sm-12">
                    <Card>
                        <Card.Header><h3>Current Turn: </h3></Card.Header>
                        <Card.Body>
                            <Card.Text><h2>{opts.playerName[turn]}</h2></Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className = "col-lg-9 col-sm-12">
                    <div className = "d-flex flex-row">
                        {scores.map((val, i) => (
                            <Card key = {i} className = {turn === i ? "turn-indicator" : "not-turn"}>
                                <Card.Header><h3>{opts.playerName[i]}</h3></Card.Header>
                                <Card.Body>
                                    <Card.Text><h2>{val}</h2></Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
                
            </div>
            <div className = "row d-flex flex-row">
                {imgs.map((val, i) => (
                    <GameCard key = {i} k = {i} flip_card = {picked} src = {(isFaceUp(i)?val:faceDownImg)} />
                ))}
            </div>
            <div className = "row d-flex">
                <RightToast show = {showRight} onClose = {(e) => setShowRight(false)} bonus = {bonus - 1}/>
                <WrongToast show = {showWrong} onClose = {(e) => setShowWrong(false)}/>
            </div>
            <GameOverModal show = {matchPairCount >= opts.n_pairs} onHide = {(e) => setPlayin(false)} winner_text = {getWinner()}/>
        </div>
    )
}

function GameCard(props, _children){
    var {k, src, flip_card} = props
    return(
    <div key = {k} className = 'col card-row'>
        <button name = {`gimg${k}`} onClick = {(e) => flip_card(k)}> 
            <img className="playing-card-img" alt = "img" src = {src}/> 
        </button> 
    </div>
    )
}

function RightToast(props, _children){
    var {show, onClose, bonus} = props
    return (
        <Toast show = {show} onClose = {onClose}>
            <Toast.Header> <h2>That's a match!!</h2> </Toast.Header>
            <Toast.Body> <h2><strong>+ {bonus}</strong></h2> </Toast.Body>
        </Toast>
    )
}

function WrongToast(props, _children){
    var {show, onClose} = props
    return (
        <Toast show = {show} onClose = {onClose}>
            <Toast.Header> <h2>Nope!</h2>  </Toast.Header>
        </Toast>
    )
}

function GameOverModal(props, _children){
    var {show, onHide, winner_text} = props
    return(
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Game Over</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>{winner_text}</h1>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    <h4>MainMenu</h4>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default App;