import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import GroceryItemPage from './pages/GroceryItemPage';

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/grocery-item/:id' component={GroceryItemPage} />
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;