import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

const App = () => <Router>
    <Routes/>
</Router>;

render(
    <App/>,
    document.getElementById('app')
);
