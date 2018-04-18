import React from 'react';

class Profile extends React.Component {
  componentDidMount() {
    if (!this.props.auth.userProfile || !this.props.auth.userProfile.sub) {
      this.props.getProfile();
    }
  }

  render() {
    return <div>hi</div>
  }
}

export default Profile;