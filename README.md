# web-service-handler

One of the easiest way to make api call from mobile application that support both android and ios. This package make is a wrapper around **fetch()** api provided by the javascript and also uses **NetInfo** package provided by react native for making extremely easy to make http request from mobile application.  

###### Below are the list of features with this package.

1. checks internet availability before makeing actual http request.
2. Supports GET and POST http request for now.
3. can pass url to make request
4. can pass headers information for http request in json formatted object
5. can pass parameters to http request in json formatted.
6. implemented easy to use promise **success** and **failed**
7. all response with status OK will serve as success
8. all response with other code are considered as failed  with easy to read json message. 

### Installation
`npm install --save react-native-web-service-handler`


![](https://github.com/tigerraj32/web-service-handler/blob/master/images/0.png) ![](https://github.com/tigerraj32/web-service-handler/blob/master/images/1.png)

### Setup iOS
make sure that you have added  you have configure **App Transport Security Settings** in your plist file. This is required because most of the web service still uses **http**  , by default latest version of ios block such request. 

## Snypnosis
```
WebServiceHandler.get(URL,headerParameter,requestParameter)
         .then((val)=>{
           ........
         })
         .catch((error) => ......);
```
## HTTP Get Request 
```
import WebServiceHandler from 'react-native-web-service-handler';

WebServiceHandler.get('https://itunes.apple.com/search',null,{'media':'movie', 'term':'mission'})
         .then((val)=>{
           console.log('callapi: ' + JSON.stringify(val))
         })
         .catch((error) => console.log('callapi:'+ JSON.stringify(error)));
```
## HTTP Post Request 
```
import WebServiceHandler from 'react-native-web-service-handler';

WebServiceHandler.post('https://itunes.apple.com/search',null,{'media':'movie', 'term':'mission'})
         .then((val)=>{
           console.log('callapi: ' + JSON.stringify(val))
         })
         .catch((error) => console.log('callapi:'+ JSON.stringify(error)));
```


## Example

``` javascript 
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
      WebServiceHandler.get('https://itunes.apple.com/search',null,{'media':'movie', 'term':'mission'})
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

```





 
