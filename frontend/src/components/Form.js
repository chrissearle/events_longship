import _ from 'lodash'
import Button from 'material-ui/Button'
import {FormControl, FormGroup, FormHelperText, FormLabel} from 'material-ui/Form'
import Select from 'material-ui/Select'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import {objectFor, textFor} from '../formatters'

import EventServices from '../services/EventServices'

import Error from './Error'
import Attending from './fields/Attending'
import Buttons from './fields/Buttons'
import Notes from './fields/Notes'
import Steps from './fields/Steps'
import Summary from './fields/Summary'
import Text from './fields/Text'

import Message from './Message'

class Form extends Component {
    state = {
        delivered: false,
        error: false,
        answer: {
            section: 'SC'
        },
        activeStep: 0,
        stepCount: 0
    };

    handleNext = () => {
        const {activeStep} = this.state

        this.setState({
            activeStep: activeStep + 1
        })
    }

    handleBack = () => {
        const {activeStep} = this.state

        this.setState({
            activeStep: activeStep - 1
        })
    }

    componentWillMount = () => {
        let steps = objectFor("steps.attending")

        if (!this.props.attending) {
            steps = objectFor("steps.not_attending")
        }

        this.setState({
            steps: steps,
            stepCount: steps.length
        })
    }

    stateHasValue(key) {
        return this.state.answer.hasOwnProperty(key) && !!this.state.answer[key]
    }

    sendAnswer = () => {
        const answer = this.state.answer;

        answer.attending = this.props.attending ? 'true' : 'false'

        EventServices.sendAnswer(this.props.event, answer, () => {
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
    }

    setAnswer = (field, value) => {
        const answer = this.state.answer || {section: 'SC'}

        answer[field] = value

        this.setState({
            answer: answer
        })
    }

    hasNameAndSection = () => {
        return this.stateHasValue('name') && this.stateHasValue('section')
    }

    isAdultOrHasContactName = () => {
        return this.isAdult(this.state.answer.section) || this.stateHasValue('main_contact_name')
    }

    hasMainContact = () => {
        return this.stateHasValue('main_contact_email') && this.stateHasValue('main_contact_phone')
    }

    stepComplete(step) {
        switch (step) {
            case 0:
                return true
            case 1:
                return this.hasNameAndSection()
            case 2:
                return this.props.attending && this.isAdultOrHasContactName() && this.hasMainContact()
            case 3:
                return true;
            default:
                return true;
        }
    }

    isComplete = () => {
        if (!this.props.attending) {
            return (
                this.stepComplete(0)
                &&
                this.stepComplete(1)
            )
        }

        return (
            this.stepComplete(0)
            &&
            this.stepComplete(1)
            &&
            this.stepComplete(2)
            &&
            this.stepComplete(3)
        )
    };

    isAdult = (section) => {
        return ['RO', 'LE', 'FR'].includes(section)
    };

    renderTextField = (name, textKey, required, type = 'input') => {
        return <Text
            name={name}
            textKey={textKey}
            required={required}
            type={type}
            value={this.state.answer[name]}
            handleChange={this.handleChange}
        />
    };

    handleSelectChange = name => event => {
        this.setAnswer(name, event.target.value)
    };

    handleChange = (event) => {
        this.setAnswer(event.target.name, event.target.value)
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
        if (this.props.attending) {
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

    renderSubmit = () => {
        const {activeStep, stepCount} = this.state

        if (activeStep === stepCount - 1) {
            const complete = this.isComplete()

            return (
                <Button raised color="primary" disabled={!complete} onClick={this.sendAnswer}>
                    {textFor('form.button.title')}
                </Button>
            )
        }

    }

    renderMove = () => {
        const {activeStep, stepCount} = this.state
        const stepComplete = this.stepComplete(activeStep)
        const complete = this.isComplete()

        return <Buttons activeStep={activeStep} complete={complete} handleBack={this.handleBack}
                        handleNext={this.handleNext} sendAnswer={this.sendAnswer} stepComplete={stepComplete}
                        stepCount={stepCount}
        />
    }


    canShowStep = (step) => {
        return this.state.activeStep === step && this.state.stepCount >= step
    }

    renderSummary = () => {
        const sections = objectFor('sections')

        let sectionName = ''

        if (this.state.answer.section) {
            sectionName = _.find(sections, (s) => {
                return s.value === this.state.answer.section
            }).label
        }

        const isAdult = this.isAdult(this, this.state.answer.section)

        return (
            <Summary isAdult={isAdult} sectionName={sectionName} answer={this.state.answer}/>
        )
    }

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


        const {activeStep} = this.state

        return (
            <div>
                <Steps activeStep={activeStep} attending={this.props.attending} steps={this.state.steps}/>

                {this.canShowStep(0) &&
                <div>
                    <Attending attending={this.props.attending}/>
                    {this.renderMove()}
                </div>
                }

                {this.canShowStep(1) &&
                <div>
                    <h3>Om deg</h3>
                    {this.renderTextField('name', 'form.name', true)}
                    {this.renderSection()}
                    {this.renderMove()}
                </div>
                }

                {this.canShowStep(2) &&
                <div>
                    {this.renderContacts()}
                    {this.renderMove()}
                </div>
                }

                {this.canShowStep(3) &&
                <div>
                    <Notes attending={this.props.attending} handleChange={this.handleChange}
                           notes={this.state.answer.notes}/>
                    {this.renderMove()}
                </div>
                }

                {this.canShowStep(4) &&
                <div>
                    {this.renderSummary()}
                    {this.renderMove()}
                    <div className='centered'>
                        <Typography type="caption">
                            {textFor('form.button.helptext')}
                        </Typography>
                    </div>
                </div>
                }

            </div>
        )
    }
}

Form.propTypes = {
    event: PropTypes.string.isRequired,
    attending: PropTypes.bool.isRequired
}

export default Form
