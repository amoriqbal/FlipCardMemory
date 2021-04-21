import React, { useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './AnimGameCard.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function GameCard(props, _children){
    var {k, src, flip_card} = props
    var [cardsArr, setCardsArr] = useState([<img className="playing-card-img" alt = "img" src = {src}/>])
    useEffect(() => {
        setCardsArr([])
        setTimeout(() => {
            setCardsArr([<img className="playing-card-img" alt = "img" src = {src}/>])
        }, 310)
    }, [src])
    return(
    <div key = {k} className = 'col p-2 card-row'>
        <button name = {`gimg${k}`} onClick = {(e) => flip_card(k)}> 
            
            <ReactCSSTransitionGroup transitionName = "example"
                transitionAppear = {false}
                transitionAppearTimeout = {300}
                transitionEnterTimeout = {300}
                transitionLeaveTimeout = {300}>
                {cardsArr}
            </ReactCSSTransitionGroup>
            
        </button> 
    </div>
    )
}