import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
import AcronymLike from './AcronymLike';

const styles = {
  badge: {
    top: -6,
    right: -6
  },
  title: {
    display: 'inline'
  },
  subheader: {
    display: 'inline',
    float: 'right'
  }
};

const acronymCategories = (list = []) => {
  return list.map((item) => {
    return (
      <Chip label={item} style={{marginLeft: 10, float: 'right'}} />
    );
  });
};

class AcronymPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acronym: {},
      loading: true
    }
  }

  componentDidMount() {
    axios.get(`/acronyms/${this.props.match.params.id}`).then((res) => {
      this.setState({
        acronym: res.data,
        loading: false
      })
    });
  }

  render() {
    const item = this.state.acronym;
    if (this.state.loading) {
      return 'loading...'
    }

    return (
      <Card className="acronym-card">
        <CardHeader
          title={item.acronym}
          subheader={<div style={{fontSize: 16, paddingTop: 6}}>Top Definition!</div>}
          style={{padding: 10, paddingLeft: 16, paddingRight: 16, backgroundColor: '#b0c4de'}}
          classes={{title: this.props.classes.title, subheader: this.props.classes.subheader}}
        >
        </CardHeader>
        <div style={{display: 'grid', gridTemplateColumns: '6fr 2fr'}}>
          <CardContent style={{fontSize: 18, paddingBottom: 10, gridArea: '1/1/auto/auto'}}>
            {item.definitions && item.definitions[0].name}
          </CardContent>
          <div style={{gridArea: '1/2/auto/auto', paddingTop: 16, paddingRight: 24}}>
            {acronymCategories(item.category)}
          </div>
        </div>
        <CardContent style={{fontSize: 14, paddingTop: 0, paddingBottom: 24}}>
          {item.definitions && item.definitions[0].description}
        </CardContent>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
          <AcronymLike style={{gridArea: '1/1/auto/auto'}} likes={item.definitions[0].likes && item.definitions[0].likes.length} />
          <CardContent style={{fontSize: 14, padding: '30px 24px 16px', gridArea: '1/2/auto/auto', textAlign: 'right'}}>
            Submitted by tory
          </CardContent>
        </div>
      </Card>
    );
  }
}

AcronymPage.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

export default withStyles(styles)(AcronymPage);
