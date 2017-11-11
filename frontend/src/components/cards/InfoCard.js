import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

class InfoCard extends Component {
    render() {
        return (
            <Card>
                {this.props.media &&
                <CardMedia
                    className="img-wrapper"
                    image={this.props.media}
                />
                }
                {(this.props.header || this.props.body) &&
                <CardContent>
                    {this.props.header &&
                    <Typography type="headline" component="h2">
                        {this.props.header}
                    </Typography>
                    }
                    {this.props.body &&
                    <List>
                        {this.props.body.map(body => (
                            <ListItem key={body.body}>
                                {body.icon &&
                                <ListItemIcon>
                                    {body.icon}
                                </ListItemIcon>
                                }
                                <ListItemText primary={body.body}/>
                            </ListItem>
                        ))}
                    </List>
                    }
                </CardContent>
                }
                {this.props.actions &&
                <CardActions>
                    <Button dense color="primary" href={this.props.actions.href}>
                        {this.props.actions.icon && this.props.actions.icon}
                        {this.props.actions.text}
                    </Button>
                </CardActions>
                }
            </Card>
        )
    }
}

InfoCard.propTypes = {
    media: PropTypes.string,
    header: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.shape({
        body: PropTypes.string.isRequired,
        icon: PropTypes.object
    })),
    actions: PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        icon: PropTypes.object
    })
};

export default InfoCard;