import {Typography} from 'material-ui'
import {ContactMail, ContactPhone, Contacts} from 'material-ui-icons'
import PropTypes from 'prop-types'
import React from 'react'
import {textFor} from '../../formatters'
import InfoCard from '../cards/InfoCard'


const Summary = (props) => {

    const renderAbout = () => {
        const body = [
            {
                body: props.answer.name
            },
            {
                body: props.sectionName
            }
        ]

        return (
            <div className='padded'>
                <InfoCard header={textFor('summary.heading.about_you')} body={body}/>
            </div>
        )
    }

    const renderContactAdult = () => {
        const body = [
            {
                body: props.answer.main_contact_email,
                icon: <ContactMail/>
            },
            {
                body: props.answer.main_contact_phone,
                icon: <ContactPhone/>
            }
        ]

        return (
            <div className='padded'>
                <InfoCard header={textFor('summary.heading.contact_adult')} body={body}/>
            </div>
        )
    }

    const renderContactChild = () => {
        const mainBody = [
            {
                body: props.answer.main_contact_name,
                icon: <Contacts/>
            },
            {
                body: props.answer.main_contact_email,
                icon: <ContactMail/>
            },
            {
                body: props.answer.main_contact_phone,
                icon: <ContactPhone/>
            }
        ]

        const altBody = [
            {
                body: props.answer.alt_contact_name,
                icon: <Contacts/>
            },
            {
                body: props.answer.alt_contact_email,
                icon: <ContactMail/>
            },
            {
                body: props.answer.alt_contact_phone,
                icon: <ContactPhone/>
            }
        ]

        return (
            <div className='padded'>
                <InfoCard header={textFor('summary.heading.contact_1_child')} body={mainBody}/>
                <InfoCard header={textFor('summary.heading.contact_2_child')} body={altBody}/>
            </div>
        )
    }

    const renderNotes = () => {
        const body = [
            {
                body: props.answer.notes
            }
        ]

        return (
            <div className='padded'>
                <InfoCard header={textFor('summary.heading.notes')} body={body}/>
            </div>
        )
    }

    return (
        <div>
            <div className="padded">
                <Typography type="headline">
                    {textFor('summary.heading')}
                </Typography>
                <Typography type="body1">
                    {textFor('summary.body')}
                </Typography>
            </div>

            {renderAbout()}

            {props.isAdult && renderContactAdult()}

            {!props.isAdult && renderContactChild()}

            {renderNotes()}
        </div>
    )
}

Summary.propTypes = {
    answer: PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            main_contact_name: PropTypes.string,
            main_contact_email: PropTypes.string.isRequired,
            main_contact_phone: PropTypes.string.isRequired,
            alt_contact_name: PropTypes.string,
            alt_contact_email: PropTypes.string,
            alt_contact_phone: PropTypes.string,
            notes: PropTypes.string
        }
    ),
    isAdult: PropTypes.bool.isRequired,
    sectionName: PropTypes.string.isRequired
}

export default Summary;