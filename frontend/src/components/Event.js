import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Card, {CardContent, CardActions, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText} from 'material-ui/List';
import moment from 'moment';

import EventServices from '../services/EventServices';

import Loading from './Loading';
import NoSuchEvent from './NoSuchEvent';
import Form from './Form';
import Message from './Message';

import {formatDate} from '../formatters';

class InfoCard extends Component {
    render() {
        return (
            <Card>
                {this.props.media &&
                <CardMedia
                    className="img-wrapper"
                    image={this.props.media}
                />
                }
                {(this.props.header || this.props.body) &&
                <CardContent>
                    {this.props.header &&
                    <Typography type="headline" component="h2">
                        {this.props.header}
                    </Typography>
                    }
                    {this.props.body &&
                    <List>
                        {this.props.body.map(body => (
                            <ListItem key={body}>
                                <ListItemText primary={body}/>
                            </ListItem>
                        ))}
                    </List>
                    }
                </CardContent>
                }
                {this.props.actions &&
                <CardActions>
                    <Button dense color="primary" href={this.props.actions.href}>
                        {this.props.actions.text}
                    </Button>
                </CardActions>
                }
            </Card>
        )
    }
}

InfoCard.propTypes = {
    media: PropTypes.string,
    header: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
    })
};

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

    isOpen(deadline) {
        if (!deadline) {
            return true;
        }

        return moment().isBefore(moment(deadline));
    }

    renderEvent(event) {
        return (
            <Grid className="maingrid" container spacing={24}>
                <Grid item xs={12} sm={9}>
                    <div className="paper">
                        <h2>{event.title}</h2>

                        <h3>{event.location}</h3>

                        <ReactMarkdown source={event.description}/>

                        {this.isOpen(event.deadline_dt) ? (
                                <Paper className="paper">
                                    <Form event={this.props.event}/>
                                </Paper>
                            )
                            :
                            (
                                <Message>
                                    <h2>Beklager - men det er nå etter påmeldingsfristen.</h2>

                                    <p>Du kan prøve å ta kontakt med arrangør men det er muligens for seint.</p>
                                </Message>
                            )
                        }
                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                    {event.image &&
                    <InfoCard media={event.image}/>
                    }
                    <InfoCard header={"Hvor"} body={[event.location]}/>
                    <InfoCard header={"Når"} body={[formatDate(event.start_dt), formatDate(event.end_dt)]}/>
                    {event.deadline_dt &&
                    <InfoCard header={"Påmeldingsfrist"} body={[formatDate(event.deadline_dt)]}/>
                    }
                    {event.price > 0 &&
                    <InfoCard header={"Pris"} body={[`${event.price} kr.`]}/>
                    }
                    <InfoCard header={"Kontakt"} body={
                        event.contact_phone
                            ?
                            [event.contact_name, event.contact_email, event.contact_phone]
                            :
                            [event.contact_name, event.contact_email]
                    }/>
                    {event.invitation &&
                    <InfoCard header={"Informasjon"} actions={{text: "Last Ned", href: event.invitation}}/>
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
