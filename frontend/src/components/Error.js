import React, {Component} from 'react';

import Message from './Message';

class Error extends Component {
    render() {
        return (
            <Message>
                <h2>Beklager - noe gikk galt</h2>
            </Message>
        );
    }
}

export default Error;
