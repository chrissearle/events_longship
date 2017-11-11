import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FileDownload from 'material-ui-icons/FileDownload';

import InfoCard from './InfoCard';

class DownloadCard extends Component {
    render() {
        if (this.props.link) {
            return (
                <InfoCard
                    header="Informasjon"
                    actions={
                        {
                            text: "Last Ned",
                            href: this.props.link,
                            icon: <FileDownload/>
                        }
                    }
                />
            )
        }

        return null;
    }
}

DownloadCard.propTypes = {
    link: PropTypes.string
};

export default DownloadCard;