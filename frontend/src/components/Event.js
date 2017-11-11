import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText} from 'material-ui/List';

import EventServices from '../services/EventServices';

import Loading from './Loading';
import NoSuchEvent from './NoSuchEvent';
import Form from './Form';
import Message from './Message';

import {formatDate} from '../formatters';

class Event extends Component {
    state = {
        loading: true,
        error: false
    };

    componentDidMount() {
        EventServices.getEvent(this.props.event, event => {
            this.setState({
                event: event,
                loading: false
            });
        }).catch(() => {
            this.setState({
                event: undefined,
                loading: false,
                error: true
            });
        });
    }

    renderEvent(event) {
        return (
            <Grid className="maingrid" container spacing={24}>
                <Grid item xs={12} sm={9}>
                    <div className="paper">
                        <h2>{event.title}</h2>

                        <h3>{event.location}</h3>

                        <ReactMarkdown source={event.description}/>

                        <Paper className="paper">
                            <Form event={this.props.event}/>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Hvor
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary={event.location}/>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Når
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary={formatDate(event.start_dt)}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={formatDate(event.end_dt)}/>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                    {event.price > 0 &&
                    <Card>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Pris
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary={`${event.price} kr.`}/>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                    }
                    <Card>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Kontaktinfo
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary={event.contact_name}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={event.contact_email}/>
                                </ListItem>
                                {event.contact_phone &&
                                <ListItem>
                                    <ListItemText primary={event.contact_phone}/>
                                </ListItem>
                                }
                            </List>
                        </CardContent>
                    </Card>
                    {event.invitation &&
                    <Card>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Informasjon
                            </Typography>
                            <CardActions>
                                <Button dense color="primary" href={event.invitation}>
                                    Last Ned
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                    }
                </Grid>
            </Grid>
        )
    }

    renderState() {
        if (this.state.error) {
            return (
                <Message>
                    <div className="paper">
                        <NoSuchEvent/>
                    </div>
                </Message>
            )
        }

        if (this.state.loading) {
            return (
                <Message>
                    <div className="loader">
                        <Loading/>
                    </div>
                </Message>
            )
        }

        return this.renderEvent(this.state.event)
    }


    render() {
        return this.renderState();
    }
}

Event.propTypes = {
    event: PropTypes.string.isRequired
};

export default Event;
