/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   NetInfo,
   TouchableHighlight
 } from 'react-native';

 import WebServiceHandler from 'react-native-web-service-handler';

 class Example extends Component {

   constructor(){
     super();
     this.state = {
       data: null,
     }
   }


   componentDidMount() {
     NetInfo.isConnected.addEventListener(
       'change',
       this._handleConnectivityChange
     );
   }
   componentWillUnmount() {
     NetInfo.isConnected.removeEventListener(
       'change',
       this._handleConnectivityChange
     );
   }
   _handleConnectivityChange(status) {
     console.log('*********_handleConnectivityChange: Network Connectivity status *******: ' + status);

   }

   callapi(){
     //https://itunes.apple.com/search
     //https://itunes.apple.com/search?media=movie&term=miss
     //http://private-9a68f1-photoosdotnet.apiary-mock.com/demo
      WebServiceHandler.get('http://photoos.uatboondrive.com:3000/api/collections/getAllEventCollections',
      {'x-auth-token': '836a921ba30d9ba28a5d06b9430ac93a3209810e9c9e6ec14553193041adc3903cce9dfb071eb067a1fa63f2d5bc412e14626fad304aaa63dbc82da30972e1c7'},
      {'path':''})
         .then((val)=>{
           console.log('callapi: ' + JSON.stringify(val))
           this.setState({data:val})          
         })
         .catch((error) => console.log('callapi:'+ JSON.stringify(error)));
   }

   render() {

     return (
       <View style={styles.container}>
       <Text>{this.state.data ? this.state.data.resultCount : 'No data to display' } entries found</Text>
       <TouchableHighlight onPress={()=>this.callapi()}>
       <Text> Make HTTP Get Request </Text>
       </TouchableHighlight>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   instructions: {
     textAlign: 'center',
     color: '#333333',
     marginBottom: 5,
   },
 });
AppRegistry.registerComponent('Example', () => Example);
