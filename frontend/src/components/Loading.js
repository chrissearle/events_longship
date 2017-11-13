import React, {Component} from 'react'
import Spinner from 'react-spinner'
import 'react-spinner/react-spinner.css'
import Message from './Message'

class Loading extends Component {
    render() {
        return (
            <Message>
                <div className="loader">
                    <Spinner/>
                </div>
            </Message>
        )
    }
}

export default Loading
