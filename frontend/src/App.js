import { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import VoiceRecognition from './components/VoiceRecognition';

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



function App() {

    return (
        <Router>
            <Header />




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
                {/* <VoiceRecognition /> */}
                <Container>
                    <VoiceRecognition />

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

            <Footer />
        </Router>
    );
}

export default App;