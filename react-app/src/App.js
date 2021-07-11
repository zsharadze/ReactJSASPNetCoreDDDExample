import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { BookConnector } from './book/BookConnector';
import { PublisherConnector } from './publisher/PublisherConnector';
import { Redirect } from 'react-router';
import { dataStore } from './data/datastore'
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={dataStore}>
      <BrowserRouter>
        <Switch>
          <Route path={["/books", "/addbook"]} component={BookConnector} />
          <Route path={["/publishers", "/addpublisher"]} component={PublisherConnector} />
          <Redirect to="/books" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
