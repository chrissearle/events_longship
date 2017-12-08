import {FormGroup, TextField} from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import {textFor} from '../../formatters'

const Notes = (props) => {
    if (props.attending) {
        return (
            <div>
                <h3>{textFor('form.notes.section.title')}</h3>

                <FormGroup className="form-group">
                    <TextField
                        name="notes"
                        label={textFor('form.notes.title')}
                        value={props.notes || ''}
                        onChange={props.handleChange}
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
}

Notes.propTypes = {
    attending: PropTypes.bool.isRequired,
    notes: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}

export default Notes;