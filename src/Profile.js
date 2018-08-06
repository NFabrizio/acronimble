import Paper from 'material-ui/Paper';
import React from 'react';

class Profile extends React.Component {
  componentDidMount() {
    if (!this.props.auth.userProfile || !this.props.auth.userProfile.sub) {
      this.props.getProfile();
    }
  }

  render() {
    const { userProfile } = this.props.auth;

    return (
      <Paper style={{ width: '80%', margin: '15px auto', padding: '20px' }} elevation={3}>
        <div className="text-fields">
          Profile Picture: { userProfile &&
            <img src={userProfile.picture} alt="Profile" style={{height: '50px', width: '50px', display: 'block', margin: '5px 15px' }} /> }
        </div>
        <div className="text-fields">
          Name: { userProfile && userProfile.name }
        </div>
        <div className="text-fields">
          Nickname: { userProfile && userProfile.nickname }
        </div>
      </Paper>
    );
  }
}

export default Profile;
