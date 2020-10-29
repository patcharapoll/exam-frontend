import React from "react";
import { connect } from 'react-redux';

class ChatRoom extends React.Component {

  state = {
      name: ''
  }

  onChange = (value) => {
      this.setState({ name: value })
  }

  onConfirm = () => {
    if (this.state.name === '') {
      alert('กรุณาใส่ชื่อ')
    } else {
      this.props.createUser(this.state.name)
      this.props.history.push('/joinRoom');
    }
  }

  render() {
    return (
      <div className="center">
        <p className="title">ชื่อของคุณ</p>
            <p><input onChange={e => this.onChange(e.target.value)} /></p>
            <button onClick={this.onConfirm}>ยืนยัน</button>
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
    createUser: (name) => dispatch({ type: 'CREATE_USER', payload: name })
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ChatRoom);