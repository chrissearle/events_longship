import React, {Component} from 'react'
import Message from './Message'

import {textFor} from '../formatters'

class NoSuchEvent extends Component {
    render() {
        return (
            <Message>
                <div className="paper">
                    <h2>{textFor('error.notfound.title')}</h2>

                    <p>{textFor('error.notfound.body')}</p>
                </div>
            </Message>
        )
    }
}

export default NoSuchEvent
