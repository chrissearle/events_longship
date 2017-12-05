import _ from 'lodash'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'

import logo from '../assets/logo.png'

import {textFor} from '../formatters'

import EventServices from '../services/EventServices'
import ContactCard from './cards/ContactCard'
import DeadlineCard from './cards/DeadlineCard'
import DownloadCard from './cards/DownloadCard'
import ImageCard from './cards/ImageCard'
import LocationCard from './cards/LocationCard'
import PriceCard from './cards/PriceCard'
import TimeCard from './cards/TimeCard'
import Form from './Form'

import Loading from './Loading'
import Message from './Message'
import NoSuchEvent from './NoSuchEvent'


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
            })
        }).catch(() => {
            this.setState({
                event: undefined,
                loading: false,
                error: true
            })
        })
    }

    isOpen(deadline) {
        if (!deadline) {
            return true
        }

        return moment().isBefore(moment(deadline))
    }

    attending = () => {
        this.setState({
            attending: true
        })
    }

    notAttending = () => {
        this.setState({
            attending: false
        })
    }

    renderConditionalButtons(event) {
        if (this.isOpen(event.deadline_dt)) {
            return (
                <div class="centered">
                    <Button raised color="primary" onClick={this.attending}>
                        {textFor('event.button.attending')}
                    </Button>
                    <Button raised color="secondary" onClick={this.notAttending}>
                        {textFor('event.button.not_attending')}
                    </Button>
                </div>
            )
        } else {
            return (
                <Message>
                    <h2>{textFor('error.passed_deadline.title')}</h2>

                    <p>{textFor('error.passed_deadline.body')}</p>
                </Message>
            )
        }
    }

    renderEventDetails(event) {
        if (_.isBoolean(this.state.attending)) {
            return (
                <Form event={this.props.event} attending={this.state.attending}/>
            )
        } else {
            return (
                <div>
                    <h3>{event.location}</h3>

                    <ReactMarkdown source={event.description}/>

                    {this.renderConditionalButtons(event)}
                </div>
            )
        }
    }

    renderEvent(event) {
        return (
            <Grid className="maingrid" container spacing={8}>
                <Grid item xs={12} sm={7} md={8} lg={9} xl={10}>
                    <div className="paper">
                        <h2 className="header">
                            <Avatar src={logo} className="logo"/>
                            {event.title}
                        </h2>

                        {this.renderEventDetails(event)}
                    </div>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                    <ImageCard image={event.image}/>

                    <LocationCard location={event.location}/>

                    <TimeCard start_dt={event.start_dt} end_dt={event.end_dt}/>

                    <DeadlineCard deadline={event.deadline_dt}/>

                    <PriceCard price={event.price} billed={event.billed}/>

                    <ContactCard name={event.contact_name} email={event.contact_email} phone={event.contact_phone}/>

                    <DownloadCard link={event.invitation}/>
                </Grid>
            </Grid>
        )
    }

    render() {
        if (this.state.error) {
            return (
                <NoSuchEvent/>
            )
        }

        if (this.state.loading) {
            return (
                <Loading/>
            )
        }

        return this.renderEvent(this.state.event)
    }
}

Event.propTypes = {
    event: PropTypes.string.isRequired
}

export default Event
