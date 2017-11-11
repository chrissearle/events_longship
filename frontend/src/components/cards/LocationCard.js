import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Place from 'material-ui-icons/Place';

import InfoCard from './InfoCard';

class LocationCard extends Component {
    render() {
        if (this.props.location) {
            return (
                <InfoCard
                    header={"Hvor"}
                    body={
                        [
                            {
                                body: this.props.location,
                                icon: <Place/>
                            }
                        ]
                    }
                />
            )
        }

        return null;
    }
}

LocationCard.propTypes = {
    location: PropTypes.string
};

export default LocationCard;