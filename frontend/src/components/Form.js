import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import Radio, {RadioGroup} from 'material-ui/Radio'
import PropTypes from 'prop-types'
import {FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from 'material-ui/Form'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import EventServices from '../services/EventServices'

import Error from './Error'
import Message from './Message'

import {textFor, objectFor} from '../formatters'

class Form extends Component {
    state = {
        delivered: false,
        error: false,
        answer: {
            section: 'SC'
        }
    };

    stateHasValue(key) {
        return this.state.answer.hasOwnProperty(key) && !!this.state.answer[key]
    }

    sendAnswer = () => {
        EventServices.sendAnswer(this.props.event, this.state.answer, () => {
            this.setState({
                delivered: true,
                error: false
            })
        }).catch(() => {
            this.setState({
                delivered: false,
                error: true
            })
        })
    };

    setAnswer = (field, value) => {
        const answer = this.state.answer || {section: 'SC'}

        answer[field] = value

        this.setState({
            answer: answer
        })
    };

    isComplete = () => {
        return (
            this.stateHasValue('name')
            &&
            this.stateHasValue('section')
            &&
            (
                this.state.attending === 'true'
                    ?
                    this.stateHasValue('main_contact_email')
                    &&
                    this.stateHasValue('main_contact_phone')
                    &&
                    this.isAdult(this.state.answer.section)
                        ?
                        true
                        :
                        this.stateHasValue('main_contact_name')
                    :
                    true
            )
        )

    };

    isAdult = (section) => {
        return ['RO', 'LE', 'FR'].includes(section)
    };

    renderTextField = (name, textKey, required, type = 'input') => {
        return (
            <FormGroup className="form-group">
                <TextField
                    name={name}
                    label={textFor(`${textKey}.title`)}
                    helperText={textFor(`${textKey}.helptext`)}
                    value={this.state.answer[name] || ''}
                    required={required}
                    onChange={this.handleChange}
                    fullWidth
                    type={type}
                />
            </FormGroup>
        )
    };

    handleSelectChange = name => event => {
        this.setAnswer(name, event.target.value)
    };

    handleChange = (event) => {
        this.setAnswer(event.target.name, event.target.value)
    };

    renderAttending = () => {
        return (
            <FormGroup className="form-group">
                <FormControl component="fieldset" required>
                    <FormLabel component="legend">{textFor('form.attending.title')}</FormLabel>
                    <RadioGroup
                        name="attending"
                        value={this.state.answer.attending}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="true" control={<Radio/>} label={textFor('form.attending.yes')}/>
                        <FormControlLabel value="false" control={<Radio/>} label={textFor('form.attending.no')}/>
                    </RadioGroup>
                </FormControl>
            </FormGroup>

        )
    };

    renderName = () => {
        return this.renderTextField('name', 'form.name', true)
    };

    renderSection = () => {
        const sections = objectFor('sections')

        return (
            <FormGroup className="form-group">
                <FormControl component="fieldset" required>
                    <FormLabel component="legend">{textFor('form.section.title')}</FormLabel>
                    <Select
                        name="section"
                        native
                        value={this.state.answer.section}
                        onChange={this.handleSelectChange('section')}
                        className="section-select"
                        fullWidth
                    >
                        {sections.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    <FormHelperText>{textFor('form.section.helptext')}</FormHelperText>
                </FormControl>
            </FormGroup>
        )
    };

    renderContacts = () => {
        if (this.state.answer.attending === 'true') {
            if (this.isAdult(this.state.answer.section)) {
                return (
                    <div>
                        <h3>{textFor('form.contactdetails.title')}</h3>

                        {this.renderTextField('main_contact_email', 'form.contact.email', true, 'email')}
                        {this.renderTextField('main_contact_phone', 'form.contact.tel', true, 'tel')}

                        <h3>{textFor('form.homecontact.title')}</h3>
                        <p>{textFor('form.homecontact.body.optional')}</p>

                        {this.renderTextField('alt_contact_name', 'form.home.name', false)}
                        {this.renderTextField('alt_contact_email', 'form.home.email', false, 'email')}
                        {this.renderTextField('alt_contact_phone', 'form.home.tel', false, 'tel')}
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>{textFor('form.homecontact.title')}</h3>
                        <p>{textFor('form.homecontact.body.mandatory')}</p>

                        {this.renderTextField('main_contact_name', 'form.homecontact1.name', true)}
                        {this.renderTextField('main_contact_email', 'form.homecontact1.email', true, 'email')}
                        {this.renderTextField('main_contact_phone', 'form.homecontact1.tel', true, 'tel')}

                        {this.renderTextField('alt_contact_name', 'form.homecontact2.name', false)}
                        {this.renderTextField('alt_contact_email', 'form.homecontact2.email', false, 'email')}
                        {this.renderTextField('alt_contact_phone', 'form.homecontact2.tel', false, 'tel')}
                    </div>
                )
            }
        }
    };

    renderNotes = () => {
        if (this.state.answer.attending === 'true') {
            return (
                <div>
                    <h3>Annet</h3>
                    <FormGroup className="form-group">
                        <TextField
                            name="notes"
                            label={textFor('form.notes.title')}
                            value={this.state.answer.notes || ''}
                            onChange={this.handleChange}
                            helperText={textFor('form.notes.helptext')}
                            multiline={true}
                            rows={1}
                            rowsMax={20}
                            fullWidth
                        />
                    </FormGroup>
                </div>
            )
        }
    };

    render() {
        if (this.state.error) {
            return (
                <Error/>
            )
        }

        if (this.state.delivered) {
            return (
                <Message>
                    <div className="paper">
                        <h2>{textFor('form.delivered.title')}</h2>

                        <p>{textFor('form.delivered.body')}</p>
                    </div>
                </Message>
            )
        }

        const complete = this.isComplete()

        return (
            <div>
                {this.renderAttending()}
                <h3>Om deg</h3>
                {this.renderName()}
                {this.renderSection()}
                {this.renderContacts()}
                {this.renderNotes()}
                <Button raised color="primary" disabled={!complete} onClick={this.sendAnswer}>
                    {textFor('form.button.title')}
                </Button>
                <Typography type="caption">
                    {textFor('form.button.helptext')}
                </Typography>
            </div>
        )
    }
}

Form.propTypes = {
    event: PropTypes.string.isRequired
}

export default Form
