import React from "react";
import { connect } from 'react-redux';
import { Query } from 'react-apollo'
import { gql } from '@apollo/client'

const GET_ROOM = gql`
   query Room {
     room {
       roomName
     }
   }
 `;

class FindRoom extends React.Component {

  state = {
      name: ''
  }

  goBack = () => {
    this.props.history.goBack()
  }

  onConfirm = (roomList) => {
    const rooms = roomList.room ? roomList.room : []

    const hasRoom = rooms.find(item => item.roomName === this.state.name)
    if (hasRoom) {
        this.props.setRoom(this.state.name)
        this.props.history.push('/chatRoom');
    } else {
        this.setState({ name: '' })
        alert('This room is not found.')
    }
  }

  onChange = (value) => {
      console.log(value)
      this.setState({ name: value })
  }

  render() {
    return(
        <Query query={GET_ROOM}>
          {({ loading, error, data }) => {
            if (loading) return (
              <div className="center">
                <p className="title">Loading...</p>
              </div>
            )
            if (error) return (
              <div className="center">
                <p className="title">Server error</p>
              </div>
            )
            return (
                <div className="center">
                    <p className="title">เข้าร่วมแชท</p>
                    <p><input value={this.state.name} onChange={(e) => this.onChange(e.target.value)} /></p>
                    <p>
                        <button className="text" onClick={this.goBack}>กลับ</button>
                        <button type="submit" onClick={() => this.onConfirm(data)}>เข้าร่วม</button>
                    </p>
                </div>
            );
        }}
        </Query>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.room)
    return {
        user: state.user,
        room: state.room,
        chat: state.chat,
    }
  };
  
  const mapDispatchToProps = dispatch => ({
    createRoom: (name) => dispatch({ type: 'CREATE_ROOM', payload: name }),
    setRoom: (name) => dispatch({ type: 'SET_ROOM', payload: name })
  });
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(FindRoom);