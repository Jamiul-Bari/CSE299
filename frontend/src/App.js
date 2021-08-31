import { useState } from 'react';
// import { Route as RR } from 'react-router';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import GroceryItemPage from './pages/GroceryItemPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import GroceryItemListPage from './pages/GroceryItemListPage';
import GroceryItemEditPage from './pages/GroceryItemEditPage';
import OrderListPage from './pages/OrderListPage';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function App() {

    // let history = useHistory();

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
            // command: 'My name is *',          //command the user says, * is any input
            // callback: (name) => setDisplay(`Hello, ${name}! Nice to meet you!`)   //set the display to this response
        },
        // {
        //     command: 'Go to *',
        //     callback: ($url) => console.log(this.props.history)
        // }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })
    //similar to useState, create a transcript and resetTranscript func
    // from the useSpeechRecognition() function

    const [redirectUrl, setRedirectUrl] = useState('');

    const pages = [
        "home",
        "login",
        "registration",
        "profile",
        "checkout",
        "cart",
        "Shopping Cart",
        "place order",
        "User list",
        "order list",
        "grocery item list",
    ];

    const urls = {
        home: "/",
        login: "/login",
        registration: "/register",
        profile: "/profile",
        checkout: "/checkout",
        cart: "/cart",
        "Shopping Cart": "/cart",
        "place order": "/place-order",
        "User list": "/admin/user-list",
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


    return (
        <Router>
            <Header />

            <div className="App">
                <h1>Voice Command</h1>
                <button onClick={SpeechRecognition.startListening}>
                    Listen!
                </button>
                <button onClick={SpeechRecognition.stopListening}>
                    Stop!
                </button>
                <button onClick={resetTranscript}>
                    Reset
                </button>
                <p>{transcript}</p>
            </div>

            {/* <div>
                <h1>Commands</h1>
                <button onClick={SpeechRecognition.startListening}>
                    Listen!
                </button>
                <button onClick={SpeechRecognition.stopListening}>
                    Stop!
                </button>
                <p>{transcript}</p>
                <p>{display}</p>
                <button onClick={() => setDisplay('')}>
                    Empty Display
                </button>
            </div> */}


            <main className="py-3">
                <Container>
                    <Route path='/' component={HomePage} exact />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/checkout' component={CheckoutPage} />
                    <Route path='/place-order' component={PlaceOrderPage} />
                    <Route path='/order/:id' component={OrderPage} />
                    <Route path='/payment' component={PaymentPage} />
                    <Route path='/grocery-item/:id' component={GroceryItemPage} />
                    <Route path='/cart/:id?' component={CartPage} />

                    <Route path='/admin/user-list' component={UserListPage} />
                    <Route path='/admin/user/:id/edit' component={UserEditPage} />

                    <Route path='/admin/order-list' component={OrderListPage} />

                    <Route path='/admin/grocery-item-list' component={GroceryItemListPage} />
                    <Route path='/admin/grocery-item/:id/edit' component={GroceryItemEditPage} />

                </Container>
            </main>

            {redirect}

            <Footer />
        </Router>
    );
}

export default App;