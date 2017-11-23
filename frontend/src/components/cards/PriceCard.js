import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Payment from 'material-ui-icons/Payment'

import InfoCard from './InfoCard'
import {textFor} from '../../formatters'

class PriceCard extends Component {
    render() {
        if (this.props.price && this.props.price > 0) {
            return (
                <InfoCard
                    header={textFor('card.price.title')}
                    body={
                        [
                            {
                                body: `${this.props.price} kr.`,
                                icon: <Payment/>
                            }
                        ]
                    }
                    footer={textFor(this.props.billed ? 'card.price.footer.bill' : 'card.price.footer.cash')}
                />
            )
        }

        return null
    }
}

PriceCard.propTypes = {
    price: PropTypes.string,
    billed: PropTypes.bool.isRequired
}

export default PriceCard