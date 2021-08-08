import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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

function App() {
    return (
        <Router>
            <Header/>

            <main className="py-3">
                <Container>
                    <Route path='/' component={HomePage} exact/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/profile' component={ProfilePage}/>
                    <Route path='/checkout' component={CheckoutPage}/>
                    <Route path='/place-order' component={PlaceOrderPage}/>
                    <Route path='/payment' component={PaymentPage}/>
                    <Route path='/grocery-item/:id' component={GroceryItemPage}/>
                    <Route path='/cart/:id?' component={CartPage}/>
                </Container>
            </main>

            <Footer/>
        </Router>
    );
}

export default App;