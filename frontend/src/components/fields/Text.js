import {FormGroup, TextField} from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import {textFor} from '../../formatters'

const Text = (props) => {
    return (
        <FormGroup className="form-group">
            <TextField
                name={props.name}
                label={textFor(`${props.textKey}.title`)}
                helperText={textFor(`${props.textKey}.helptext`)}
                value={props.value || ''}
                required={props.required}
                onChange={props.handleChange}
                fullWidth
                type={props.type}
            />
        </FormGroup>
    )
}

Text.propTypes = {
    name: PropTypes.string.isRequired,
    textKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}

export default Text;