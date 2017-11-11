import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import {blue} from 'material-ui/colors'
import createPalette from 'material-ui/styles/createPalette'

import Event from './Event';
import NoSuchEvent from './NoSuchEvent';
import Message from './Message';

const muiTheme = createMuiTheme({
    palette: createPalette({
        primary: blue,
    })
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path={"/:event"}
                            render={(route) => (
                                <Event event={route.match.params.event}/>
                            )}
                        />
                        <Route render={() => (
                            <Message>
                                <div className="paper">
                                    <NoSuchEvent/>
                                </div>
                            </Message>
                        )}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
