import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Warning from 'material-ui-icons/Warning';

import InfoCard from './InfoCard';

import {formatDate, textFor} from '../../formatters';

class DeadlineCard extends Component {
    render() {
        if (this.props.deadline) {
            return (
                <InfoCard
                    header={textFor('card.deadline.title')}
                    body={
                        [
                            {
                                body: formatDate(this.props.deadline),
                                icon: <Warning/>
                            }
                        ]
                    }
                />
            )
        }

        return null;
    }
}

DeadlineCard.propTypes = {
    deadline: PropTypes.string
};

export default DeadlineCard;