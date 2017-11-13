import React, {Component} from 'react';

import Message from './Message';

import {textFor} from '../formatters';

class Error extends Component {
    render() {
        return (
            <Message>
                <h2>{textFor('error.general.title')}</h2>
            </Message>
        );
    }
}

export default Error;
