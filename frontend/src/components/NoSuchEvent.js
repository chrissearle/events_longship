import React, {Component} from 'react';
import Message from './Message';

class NoSuchEvent extends Component {
    render() {
        return (
            <Message>
                <div class="paper">
                    <h2>Arrangement finnes ikke</h2>

                    <p>Vi kunne ikke finne arrangementet du ønsket. Vennligst sjekk lenken du har fått.</p>
                </div>
            </Message>
        );
    }
}

export default NoSuchEvent;
