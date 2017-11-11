import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Radio, {RadioGroup} from 'material-ui/Radio';
import PropTypes from 'prop-types';
import {FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import EventServices from '../services/EventServices';

import Error from './Error';

class Form extends Component {
    state = {
        delivered: false,
        error: false,
        answer: {
            section: 'SC'
        }
    };

    stateHasValue(key) {
        return this.state.answer.hasOwnProperty(key) && !!this.state.answer[key];
    };

    sendAnswer = () => {
        EventServices.sendAnswer(this.props.event, this.state.answer, () => {
            this.setState({
                delivered: true,
                error: false
            });
        }).catch(() => {
            this.setState({
                delivered: false,
                error: true
            });
        });
    };

    setAnswer = (field, value) => {
        const answer = this.state.answer || {section: 'SC'};

        answer[field] = value;

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
        return ['RO', 'LE', 'FR'].includes(section);
    };

    renderTextField = (name, label, helpText, required, type = 'input') => {
        return (
            <FormGroup className="form-group">
                <TextField
                    name={name}
                    label={label}
                    helperText={helpText}
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
        this.setAnswer(name, event.target.value);
    };

    handleChange = (event) => {
        this.setAnswer(event.target.name, event.target.value);
    };

    renderAttending = () => {
        return (
            <FormGroup className="form-group">
                <FormControl component="fieldset" required>
                    <FormLabel component="legend">Blir du med?</FormLabel>
                    <RadioGroup
                        name="attending"
                        value={this.state.answer.attending}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="true" control={<Radio/>} label="Ja - jeg blir med"/>
                        <FormControlLabel value="false" control={<Radio/>} label="Nei - dessverre kan jeg ikke"/>
                    </RadioGroup>
                </FormControl>
            </FormGroup>

        )
    };

    renderName = () => {
        return this.renderTextField("name", "Navn", "Navn på deltaker", true);
    };

    renderSection = () => {
        const sections = [
            {
                value: 'FL',
                label: 'Flokken',
            },
            {
                value: 'PI',
                label: 'Pionerene',
            },
            {
                value: 'SC',
                label: 'Troppen',
            },
            {
                value: 'RO',
                label: 'Roverlaget',
            },
            {
                value: 'LE',
                label: 'Leder',
            },
            {
                value: 'FR',
                label: 'Friend',
            },
        ];

        return (
            <FormGroup className="form-group">
                <FormControl component="fieldset" required>
                    <FormLabel component="legend">Enhet</FormLabel>
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
                    <FormHelperText>Hvilken enhet tilhører du (velg Venn hvis ingen andre passer)</FormHelperText>
                </FormControl>
            </FormGroup>
        )
    };

    renderContacts = () => {
        if (this.state.answer.attending === 'true') {
            if (this.isAdult(this.state.answer.section)) {
                return (
                    <div>
                        <h3>Kontaktdetaljer</h3>

                        {this.renderTextField("main_contact_email", "E-post", "", true, 'email')}
                        {this.renderTextField("main_contact_phone", "Tlf/Mob", "", true, 'tel')}

                        <h3>Hjemmekontakt</h3>
                        <p>Du kan oppgi et hjemmekontakt</p>

                        {this.renderTextField("alt_contact_name", "Navn", "Navn på hjemmekontakt", false)}
                        {this.renderTextField("alt_contact_email", "E-post", "", false, 'email')}
                        {this.renderTextField("alt_contact_phone", "Tlf/Mob", "", false, 'tel')}
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>Hjemmekontakt</h3>
                        <p>Vi trenger minst en hjemmekontakt, men du kan oppgi inntil 2</p>

                        {this.renderTextField("main_contact_name", "Navn", "Navn på hjemmekontakt #1", true)}
                        {this.renderTextField("main_contact_email", "E-post", "", true, 'email')}
                        {this.renderTextField("main_contact_phone", "Tlf/Mob", "", true, 'tel')}

                        {this.renderTextField("alt_contact_name", "Navn", "Navn på hjemmekontakt #2", false)}
                        {this.renderTextField("alt_contact_email", "E-post", "", false, 'email')}
                        {this.renderTextField("alt_contact_phone", "Tlf/Mob", "", false, 'tel')}
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
                            label="Annet informasjon"
                            value={this.state.answer.notes || ''}
                            onChange={this.handleChange}
                            helperText="Annet informasjon som lederne bør vite - f.eks. matallergier osv"
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
                <Grid className="maingrid" container spacing={24}>
                    <Grid item xs={12}>
                        <div className="paper">
                            <Error/>
                        </div>
                    </Grid>
                </Grid>
            )
        }

        if (this.state.delivered) {
            return (
                <Grid className="maingrid" container spacing={24}>
                    <Grid item xs={12}>
                        <div className="paper">
                            <h2>Tusen Takk</h2>

                            <p>Vi har nå mottatt ditt svar.</p>
                        </div>
                    </Grid>
                </Grid>
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
                    Send svar
                </Button>
                <Typography type="caption">
                    All informasjon oppgitt vil be slettet etter at arrangementet er ferdig
                </Typography>
            </div>
        );
    }
}

Form.propTypes = {
    event: PropTypes.string.isRequired
};

export default Form;
