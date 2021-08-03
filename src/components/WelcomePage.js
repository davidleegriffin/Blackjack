import React, {useState, setState} from 'react'
import { NavLink, Link, Route, Redirect, useHistory, Switch } from 'react-router-dom';
import Team from '../components/Team';

import './WelcomePage.css';

export default function WelcomePage() {



    return (
    <>
        <div className="blackjack__container--main">
            <h1>WELCOME TO BLACKJACK</h1>
            <div>
                <p className="blackjack__explainer">
                    This site is dedicated to Vegas style Blackjack 
                    simulation where the dealer will stand if their 
                    score is greater than or equal to 17. There is 
                    currently no betting taking place but can add 
                    at a later date if desired.
                </p>
            <NavLink to={{pathname: "/blackjack"}}>
                <button className="blackjack__button--home">CLICK HERE TO START</button>
            </NavLink>
            <p classname="blackjack__image--example"><img src="./images/Blackjack-Gameplay.gif" alt="blackjack-screen-shot" width="90%"></img></p>
            </div>
            <Team />
        </div>
    </>
    )
}