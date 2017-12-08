import {Button} from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import {textFor} from '../../formatters'

const Buttons = (props) => {
    const renderSubmit = () => {
        if (props.activeStep === props.stepCount - 1) {
            return (
                <Button raised color="primary" disabled={!props.complete} onClick={props.sendAnswer}>
                    {textFor('form.button.title')}
                </Button>
            )
        }
    }

    return (
        <div className="centered">
            {props.activeStep > 0 &&
            <Button raised color="secondary" onClick={props.handleBack}>
                {textFor('form.steps.back')}
            </Button>
            }
            {props.activeStep < props.stepCount - 1 &&
            <Button raised color="primary" disabled={!props.stepComplete} onClick={props.handleNext}>
                {textFor('form.steps.forward')}
            </Button>
            }
            {renderSubmit()}
        </div>
    )
}

Buttons.propTypes = {
    activeStep: PropTypes.number.isRequired,
    stepCount: PropTypes.number.isRequired,
    complete: PropTypes.bool.isRequired,
    stepComplete: PropTypes.bool.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    sendAnswer: PropTypes.func.isRequired
}

export default Buttons