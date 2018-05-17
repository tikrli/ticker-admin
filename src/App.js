import React, {Component} from 'react';
import {Container} from "semantic-ui-react";
import Menu from './components/Menu';
import TickerList from "./components/TickerList";
import {Switch, Route} from "react-router-dom";
import TickerView from "./components/TickerView";

const Home = () => {
    return (<TickerList/>);
};

const Ticker = ({match}) => {
    return (<TickerView id={match.params.id}/>);
};

const Main = () => {
    return (<main>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/ticker/:id" component={Ticker}/>
        </Switch>
    </main>);
};

class App extends Component {
    render() {

        return (<div>
            <Menu/>
            <Container style={{marginTop: 100}}>
                <Main/>
            </Container>
        </div>);
    }
}

export default App;