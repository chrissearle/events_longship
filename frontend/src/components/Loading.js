import React, {Component} from 'react';
import Spinner from 'react-spinner';
import 'react-spinner/react-spinner.css';

class Loading extends Component {
    render() {
        return (
            <div className="loader">
                <Spinner/>
            </div>
        );
    }
}

export default Loading;
