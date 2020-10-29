import { WebSocketLink } from '@apollo/client/link/ws';

 const wsLink = new WebSocketLink({
   uri: `ws://localhost:5000/`,
   options: {
     reconnect: true
   }
 });

 export default wsLink