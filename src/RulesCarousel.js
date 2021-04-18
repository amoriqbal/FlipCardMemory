import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel"
import "./RulesCarousel.css";
export default function RulesCarousel(props, _children){
    return(
        <Carousel className = "rules-carousel" interval = {2000}>
            <Carousel.Item>
                <img src = "c2.jpg" alt = "GG" className="d-block w-100"></img>
                <Carousel.Caption>
                <h3>Rule #1 : Identify the pairs</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src = "c2.jpg" alt = "GG" className="d-block w-100"></img>
                <Carousel.Caption>
                <h3>Rule #2 : We'll shuffle them and put them face down</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src = "c2.jpg" alt = "GG" className="d-block w-100"></img>
                <Carousel.Caption>
                <h3>Rule #3 : On your turn, flip two cards of the same pair</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src = "c2.jpg" alt = "GG" className="d-block w-100"></img>
                <Carousel.Caption>
                <h3>Rule #5 : On right flip, you get points and a bonus turn... Flip again!</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src = "c2.jpg" alt = "GG" className="d-block w-100"></img>
                <Carousel.Caption>
                <h3>Rule #5 : On wrong flip, your turn ends</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src = "c2.jpg" alt = "GG" className="d-block w-100"></img>
                <Carousel.Caption>
                <h3>Rule #6 : When all pairs have been matched, the winner is declared</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}