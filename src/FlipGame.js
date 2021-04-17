import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FlipGame.css';
function App(props, _children) {
    var [faceUp, flip] = React.useState([])
    var [timedFlip, setTimedFlip] = React.useState([0, 1500])
    var {opts, setPlayin} = props
    React.useEffect(() => {
        var faceUp_init = Array.from('x'.repeat(opts.n_pairs * 2), (g)=>false)
        flip(faceUp_init)
        console.log("effect executed once")
    },[opts.n_pairs])
    
    React.useEffect(() => {
        setTimeout(() => flip_card(timedFlip[0]), timedFlip[1])
    }, [timedFlip])
    var faceDownImg = "logo512.png"
    var imgs = []
    for(var i = 0; i < (opts.n_pairs * 2); i++){
        imgs.push(`gimg${`${1000 + i}`.substr(1)}.png`)
    }

    var isFaceUp = (i) =>
        (faceUp && i < faceUp.length && faceUp[i])

    function flip_card(i){
        if(faceUp && i < faceUp.length){
            var new_arr = []
            for(var j = 0; j < faceUp.length; j++){
                new_arr.push(faceUp[j])
            }
            new_arr[i] = !new_arr[i]
            flip(new_arr)
            return true
        }
        return false
    }

    var temp_flip = (i, t) => {
        flip_card(i)
        setTimedFlip([i, 1500])
    }
    return (
        <div className = "container-fluid">
            <div className = "row d-flex flex-row">
                {imgs.map((val, i) => (
                    <div key = {i} className = 'col card-row'>
                        <button name = {`gimg${i}`} onClick = {(e) => temp_flip(i, 2)}> 
                            <img className="playing-card-img" alt = "img" src = {(isFaceUp(i)?val:faceDownImg)}/> 
                        </button> 
                    </div>)
                )}
            </div>
        </div>
    )
}

export default App;