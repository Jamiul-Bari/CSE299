import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { removeFromCart } from '../actions/CartActions'


function VoiceRecognition() {

    const groceryItemList = useSelector(state => state.groceryItemList);
    const { grocery_items } = groceryItemList;


    const [display, setDisplay] = useState('') //display for our message
    const commands = [
        {
            command: [
                "Go to * as admin",
                "Go to * page",
                "Go to *",
                "Go to my *",
                "Open * page",
                "Open *",

            ],
            callback: (redirectPage) => setRedirectUrl(redirectPage),
        },
        {
            command: [
                "Add * to the cart",
                "Add * to the card",
                "Add * to cart",
                "Add * to card",
            ],
            callback: (addThis) => setGroceryItemToAdd(addThis),
        },
        {
            command: [
                "Proceed to *",
                "*",

            ],
            callback: (redirectCheckout) => setCheckout(redirectCheckout),
        },
        {
            command: 'My name is *',          //command the user says, * is any input
            callback: (name) => setDisplay(`Hello, ${name}! Nice to meet you!`)   //set the display to this response
        }
        // {
        //     command: [
        //         "Remove * from the cart",
        //         "Remove * from the card",
        //         "Remove * from cart",
        //         "Remove * from card",
        //     ],
        //     callback: (removeThis) => setGroceryItemToRemove(removeThis),
        // },
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })
    //similar to useState, create a transcript and resetTranscript func
    // from the useSpeechRecognition() function

    const [redirectUrl, setRedirectUrl] = useState('');
    const [checkout, setCheckout] = useState('');
    const [groceryItemToAdd, setGroceryItemToAdd] = useState('');
    // const [groceryItemToRemove, setGroceryItemToRemove] = useState('');

    const pages = [
        "home",
        "login",
        "registration",
        "profile",
        "checkout",
        "check out",
        "cart",
        "card",
        "Shopping Cart",
        "place order",
        "User list",
        "userlist",
        "Users list",
        "order list",
        "grocery item list",
    ];

    const urls = {
        home: "/",
        login: "/login",
        registration: "/register",
        profile: "/profile",
        checkout: "/checkout",
        "check out": "/checkout",
        cart: "/cart",
        card: "/cart",
        "Shopping Cart": "/cart",
        "place order": "/place-order",
        "User list": "/admin/user-list",
        "userlist": "/admin/user-list",
        "Users list": "/admin/user-list",
        "order list": "/admin/order-list",
        "grocery item list": "/admin/grocery-item-list",
    }




    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
        // Disable it instead of returning null.
    }

    let redirect = "";

    if (redirectUrl) {
        if (pages.includes(redirectUrl)) {
            redirect = <Redirect to={urls[redirectUrl]} />
        }
        else {
            redirect = <p>Could not find page: {redirectUrl}</p>
        }
    }

    if(checkout === 'checkout'.toLowerCase()) {
        redirect = <Redirect to={'/login?redirect=checkout'} />
    }

    if (groceryItemToAdd) {
        let groceryItemFromArray = grocery_items.filter(item => item.name.toLowerCase() === groceryItemToAdd.toLowerCase());
        console.log(groceryItemFromArray);

        if (groceryItemFromArray.length === 0) {
            redirect = <p>Could not find grocery item: {groceryItemToAdd}</p>
        }
        else {
            redirect = <Redirect to={`cart/${groceryItemFromArray[0]._id}?qty=1`} />
        }
    }

    // if(groceryItemToRemove) {
    //     let groceryItemFromArray = grocery_items.filter(item => item.name.toLowerCase() === groceryItemToAdd.toLowerCase());
    //     console.log(groceryItemFromArray);

    //     if (groceryItemFromArray.length === 0) {
    //         redirect = <p>Could not find grocery item: {groceryItemToRemove}</p>
    //     }
    //     else {
    //         const dispatch = useDispatch();
    //         redirect = dispatch(removeFromCart());
    //     }
    // }


    return (
        < div className="" >
            {/* <h1>Voice Command</h1> */}
            <Button Button
                variant="outline-success"
                onClick={SpeechRecognition.startListening}
            >
                Listen!
            </Button >
            <Button
                variant="outline-danger"
                onClick={SpeechRecognition.stopListening}
            >
                Stop!
            </Button>
            <Button
                variant="outline-warning"
                onClick={resetTranscript}
            >
                Reset
            </Button>
            <p>{transcript}</p>
            <p>{display}</p>
            <p>{redirect}</p>
        </div >
    )
}

export default VoiceRecognition;
