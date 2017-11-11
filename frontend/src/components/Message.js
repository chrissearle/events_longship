import React, {Component} from 'react';
import Grid from 'material-ui/Grid';

class Message extends Component {
    render() {
        return (
            <Grid className="maingrid" container spacing={24}>
                <Grid item xs={12}>
                    {this.props.children}
                </Grid>
            </Grid>
        )
    }
}

export default Message;