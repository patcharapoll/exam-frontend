import React from "react";
import { connect } from 'react-redux';

class JoinRoom extends React.Component {

  createRoom = () => {
    this.props.history.push('/createRoom');
  }

  joinRoom = () => {
    this.props.history.push('/findRoom');
  }

  render() {
    return (
      <div className="center">
        <p className="title">คุณ {this.props.user.name}</p>
        <p><button onClick={this.createRoom}>สร้างห้องใหม่</button></p>
        <p><button className="text" onClick={this.joinRoom}>เข้าร่วมแชท</button></p>
      </div>
    );

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user
  }
};

const mapDispatchToProps = dispatch => ({
  createRoom: (name) => dispatch({ type: 'CREATE_ROOM', payload: name }),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(JoinRoom);