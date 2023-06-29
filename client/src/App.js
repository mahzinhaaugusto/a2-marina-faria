import './App.css';
import 'antd/dist/reset.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonWithCars from './components/listItems/PersonWithCars';
import Home from './components/layout/Home';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/person/:id"
              element={<PersonWithCars />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
