import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Payment from 'material-ui-icons/Payment';

import InfoCard from './InfoCard';

class PriceCard extends Component {
    render() {
        if (this.props.price && this.props.price > 0) {
            return (
                <InfoCard
                    header={"Pris"}
                    body={
                        [
                            {
                                body: `${this.props.price} kr.`,
                                icon: <Payment/>
                            }
                        ]
                    }
                />
            )
        }

        return null;
    }
}

PriceCard.propTypes = {
    price: PropTypes.string
};

export default PriceCard;