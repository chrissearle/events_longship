import React, {Component} from 'react'
import PropTypes from 'prop-types'

import InfoCard from './InfoCard'

class ImageCard extends Component {
    render() {
        if (this.props.image) {
            return (
                <InfoCard media={this.props.image}/>
            )
        }

        return null
    }
}

ImageCard.propTypes = {
    image: PropTypes.string
}

export default ImageCard

