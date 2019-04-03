import React from 'react';
import axios from 'axios';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorView from './common/ErrorView';
import AcronymList from './AcronymList';

class UserAcronyms extends React.Component {
  state = {
    loading: true,
    error: false,
    data: []
  }

  componentDidMount() {
    this.fetchUserAcronyms();
  }

  fetchUserAcronyms = () => {
    this.setState({ loading: true });

    axios.get(`users/${this.props.auth.userProfile.sub}/acronyms`).then((res) => {
      this.setState({
        data: res.data,
        loading: false
      })
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    if (this.state.error) {
      return <ErrorView onRetry={this.fetchUserAcronyms} />;
    }

    return (
      <AcronymList
        list={this.state.data}
        isAuthenticated={this.props.auth.isAuthenticated()}
        addToLikes={this.props.addToLikes}
        likesIds={this.props.likesIds}
      />
    );
  }
}

export default UserAcronyms;