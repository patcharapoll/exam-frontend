import React from "react";
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo'
import { gql } from '@apollo/client'

const GET_MESSAGES = gql`
   query messages($roomName: String!) {
      messages(roomName: $roomName) {
        body
        image
        from
     }
   }
 `;

const SEND_MESSAGE = gql`
   mutation SentMessage($roomName: String!, $body: String!, $image: String, $from: String!, $timestamp: String!) {
     sendMessage(roomName: $roomName, body: $body, image: $image, from: $from, timestamp: $timestamp) {
       successful
     }
   }
 `;

const COMMENTS_SUBSCRIPTION = gql`
 subscription NewMessage($roomName: String!) {
   newMessage(roomName: $roomName) {
     id
     body
     from
     roomName
   }
 }
`;

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToNewMessage();
  }
  render() {
    const { data, user } = this.props;
    console.log('dddd: ', data)
    return (
      <div>
      {data.map((item, key) => {
        return (
          <span key={key}>
            <p className={"chat-from"}>คุณ {item.from}</p>
            <span className="chat-message">{item.body}</span>
            {/* <p className={user === item.from ? "chat-from" : "chat-from-right"}>คุณ {item.from}</p> */}
            {/* <span className={user === item.from ? "chat-message" : "chat-message-right"}>{item.body}</span> */}
          </span>
        );
      })} 
      </div>
    );
  }
};

class ChatRoom extends React.Component {

  state = {
    message: ''
  }
  
  onChange = (value) => {
      this.setState({ message: value })
  }

  sendMessages = (value, sendMessage) => {
    console.log(value)
    sendMessage({ variables: {
      body: value,
      roomName: this.props.room.roomName,
      from: this.props.user.name,
      timestamp: new Date(),
    } });
    this.setState({ message: '' })
  }
  
  render() {
    return(
      <Query query={GET_MESSAGES}  variables={{ roomName: this.props.room.roomName }}>
        {({ loading, error, data, subscribeToMore }) => {
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
            <div>
            <p className="title chat-title">ห้อง {this.props.room.roomName}</p>
            <div className="chat-blog">
                <MessageListView user={this.props.user.name} data={data.messages} subscribeToNewMessage={() => {
                  subscribeToMore({
                    document: COMMENTS_SUBSCRIPTION,
                    variables: { roomName: this.props.room.roomName }, 
                    updateQuery: (prev, { subscriptionData }) => {
                      console.log('subscriptionData: ', subscriptionData)
                      if (!subscriptionData.data) return prev;
                      return {
                        messages: subscriptionData.data.newMessage
                      };
                    }
                  });
                }}/>
             </div>
             <Mutation mutation={SEND_MESSAGE}>
                  {(sendMessage) => (
                    <input
                      className="chat-box"
                      value={this.state.message}
                      onChange={(e) => this.onChange(e.target.value)}
                      onKeyUp={(e) =>
                      e.key === "Enter" ? this.sendMessages(e.target.value, sendMessage) : null
                      }
                    />
                  )}
                </Mutation>
                <p className="description">Enter เพื่อส่ง</p>
            </div>
          );   
        }}
      </Query>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
      user: state.user,
      room: state.room,
      chat: state.chat,
  }
};

const mapDispatchToProps = dispatch => ({
  createRoom: (name) => dispatch({ type: 'CREATE_ROOM', payload: name })
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ChatRoom);