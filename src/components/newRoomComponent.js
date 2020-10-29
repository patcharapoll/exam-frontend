import React from "react";
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo'
import { gql } from '@apollo/client'

const GET_ROOM = gql`
   query Room {
     room {
       roomName
     }
   }
 `;

 const CREATE_ROOM = gql`
   mutation CreateRoom($roomName: String!) {
     createRoom(roomName: $roomName) {
       successful
     }
   }
 `;

class CreateRoom extends React.Component {

  state = {
      roomName: ''
  }

  goBack = () => {
    this.props.history.goBack()
  }

  onConfirm = (roomList, createRoom) => {
    const rooms = roomList.room ? roomList.room : []
    console.log('rooms: ', rooms)
    const hasRoom = rooms.find(item => item.roomName === this.state.roomName)

    if (!hasRoom) {
        createRoom({ variables: { roomName: this.state.roomName } });
        this.props.createRoom(this.state.roomName)
        this.props.history.push('/chatRoom');
    } else {
        this.setState({ roomName: '' })
        alert('This room is already exists.')
    }
  }

  onChange = (value) => {
      this.setState({ roomName: value })
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
            <p className="title">สร้างห้องใหม่</p>
            <p><input value={this.state.roomName} onChange={(e) => this.onChange(e.target.value)} /></p>
            <p>
              <button type="button" className="text" onClick={this.goBack}>กลับ</button>
              <Mutation mutation={CREATE_ROOM}>
                {(createRoom) => (
                  <button type="button" onClick={() => this.onConfirm(data, createRoom)}>ยืนยัน</button>
                )}
              </Mutation>
            </p>
          </div>
        );
      }}
      </Query>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        room: state.room,
        chat: state.chat,
    }
  };
  
  const mapDispatchToProps = dispatch => ({
    createRoom: (name) => dispatch({ type: 'CREATE_ROOM', payload: name }),
    setRoomList: (list) => dispatch({ type: 'SET_LIST_ROOM', payload: list })
  });
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(CreateRoom);