import {Step, StepLabel, Stepper} from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'


const Steps = (props) => {
    return (
        <Stepper activeStep={props.activeStep}>
            {props.steps.map((step) => {
                    return (
                        <Step key={step.key}>
                            <StepLabel>{step.prompt}</StepLabel>
                        </Step>
                    )
                }
            )}
        </Stepper>
    )
}

Steps.propTypes = {
    attending: PropTypes.bool.isRequired,
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        prompt: PropTypes.string.isRequired
    }))
}

export default Steps;