import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateRange from 'material-ui-icons/DateRange';

import InfoCard from './InfoCard';

import {formatDuration, textFor} from '../../formatters';

class TimeCard extends Component {
    render() {
        return (
            <InfoCard
                header={textFor('card.time.title')}
                body={
                    [
                        {
                            body: formatDuration(this.props.start_dt, this.props.end_dt),
                            icon: <DateRange/>
                        }
                    ]
                }
            />
        )
    }
}

TimeCard.propTypes = {
    start_dt: PropTypes.string.isRequired,
    end_dt: PropTypes.string.isRequired
};

export default TimeCard;