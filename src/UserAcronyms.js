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
  };

  componentDidMount() {
    this.fetchUserAcronyms();
  }

  fetchUserAcronyms = () => {
    this.setState({ loading: true, error: false });

    axios
      .get(`users/${this.props.auth.userProfile.sub}/acronyms`)
      .then(res => {
        this.setState({
          data: res.data,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  };

  like = (itemId, definitionId, liked) => {
    if (!liked) {
      // safety net, liked should always be true on profile page
      return;
    }

    axios.delete(`/definitions/${definitionId}/likes`, {}).then(() => {
      this.setState(prevState => ({
        data: prevState.data.filter(({ acronym }) => acronym.id !== definitionId)
      }));

      this.props.removeFromLikes(definitionId);
    });
  };

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
        like={this.like}
        likesIds={this.props.likesIds}
      />
    );
  }
}

export default UserAcronyms;
