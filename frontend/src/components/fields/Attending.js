import {Typography} from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import {textFor} from '../../formatters'

const Attending = (props) => {
    let title = 'form.heading.attending'
    let body = 'form.body.attending'

    if (!props.attending) {
        title = 'form.heading.notattending'
        body = 'form.body.notattending'
    }

    return (
        <div className="padded">
            <Typography type="headline">
                {textFor(title)}
            </Typography>
            <Typography type="body1">
                {textFor(body)}
            </Typography>
        </div>
    )
}

Attending.propTypes = {
    attending: PropTypes.bool.isRequired
}

export default Attending;