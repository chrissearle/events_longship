import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Contacts from 'material-ui-icons/Contacts'
import ContactMail from 'material-ui-icons/ContactMail'
import ContactPhone from 'material-ui-icons/ContactPhone'

import InfoCard from './InfoCard'

import {textFor} from '../../formatters'

class EventCard extends Component {
    render() {
        return (
            <InfoCard
                header={textFor('card.contact.title')}
                body={
                    this.props.phone
                        ?
                        [
                            {
                                body: this.props.name,
                                icon: <Contacts/>
                            },
                            {
                                body: this.props.email,
                                icon: <ContactMail/>
                            },
                            {
                                body: this.props.phone,
                                icon: <ContactPhone/>

                            }
                        ]
                        :
                        [
                            {
                                body: this.props.name,
                                icon: <Contacts/>
                            },
                            {
                                body: this.props.email,
                                icon: <ContactMail/>
                            }
                        ]
                }
            />
        )
    }
}

EventCard.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
}

export default EventCard