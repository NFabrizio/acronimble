import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserAcronyms from './UserAcronyms';
import LoadingSpinner from './common/LoadingSpinner';

class Profile extends React.Component {
  state = { value: 0, loading: true };

  componentDidMount() {
    if (!this.props.auth.userProfile || !this.props.auth.userProfile.sub) {
      return this.props.getProfile().then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({ loading: false });
  }

  render() {
    const { userProfile } = this.props.auth;

    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <Paper style={{ width: '80%', margin: '15px auto', padding: '20px' }} elevation={3}>
          <div className="text-fields">
            Profile Picture:
            {userProfile && (
              <img
                src={userProfile.picture}
                alt="Profile"
                style={{ height: '50px', width: '50px', display: 'block', margin: '5px 15px' }}
              />
            )}
          </div>
          <div className="text-fields">Name: {userProfile && userProfile.name}</div>
          <div className="text-fields">Nickname: {userProfile && userProfile.nickname}</div>
        </Paper>
        <div style={{ width: '80%', margin: '15px auto' }}>
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={(event, value) => this.setState({ value })}>
              <Tab label="Created" />
              <Tab label="Liked" />
            </Tabs>
          </AppBar>
          {userProfile && (
            <div>
              {this.state.value === 0 && (
                <UserAcronyms
                  auth={this.props.auth}
                  likesIds={this.props.likesIds}
                  addToLikes={this.props.addToLikes}
                  removeFromLikes={this.props.removeFromLikes}
                />
              )}
              {this.state.value === 1 && <div>Coming Soon</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
