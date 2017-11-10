import React, {Component} from 'react';
import Spinner from 'react-spinner';
import 'react-spinner/react-spinner.css';
import './Loading.css';

class Loading extends Component {
    render() {
        return (
            <Spinner/>
        );
    }
}

export default Loading;
