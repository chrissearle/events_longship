import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileDownload from 'material-ui-icons/FileDownload'

import InfoCard from './InfoCard'
import {textFor} from '../../formatters'

class DownloadCard extends Component {
    render() {
        if (this.props.link) {
            return (
                <InfoCard
                    header={textFor('card.info.title')}
                    actions={
                        {
                            text: textFor('card.info.download.title'),
                            href: this.props.link,
                            icon: <FileDownload/>
                        }
                    }
                />
            )
        }

        return null
    }
}

DownloadCard.propTypes = {
    link: PropTypes.string
}

export default DownloadCard