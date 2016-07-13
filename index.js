

import {
  NetInfo,
} from 'react-native';


export default class WebServiceHandler {

 // HTTP Header Generator.
  static header(headerParam: Object){
    console.log('Header Parameter:' + JSON.stringify(headerParam));
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    Object.keys(headerParam).forEach(function (key) {
      headers.append(key, headerParam[key]);
    });
    return headers;
  }

  // HTTP request parameter Generator.
  static parameter(parameter: Object){
    if (!parameter) {
      return "";
    }
    var urlParameter = '?'
    Object.keys(parameter).forEach(function (key) {
      let value = parameter[key];
      //console.log('key:-' +key +'  value:-'+value);
      urlParameter = urlParameter + key + '=' + value + '&';
    });
    urlParameter = urlParameter.replace(/\&$/, '');
    //console.log('urlParameter: '+ urlParameter);
    return urlParameter;
  }

 // HTTP Get Request
  static get(url: String, headerParam: Object, parameter: Object){
    console.log('WebServiceHandler:Initiating GET request');

    return new Promise(function(success, failed){
      NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('WebServiceHandler: Network Connectivity status: ' + isConnected);
            if (!isConnected) {
              failed({name:'503',message:"No Internet connection"});
            }else {
              let URL = url + WebServiceHandler.parameter(parameter);
              console.log('URL:-' + URL);
              fetch(URL,{
                method: 'get',
                'headers': WebServiceHandler.header(headerParam)
              })
              .then(function(response) {
                console.log(response.status);
                  if (!response.ok) {
                    throw {name:response.status,message:"http request failed", value:response.json()};
                  }
                  return response.json();

              })
              .then(function(jsonResponse) {
                console.log('************************ HTTP GET Succes ************************ ');
                success(jsonResponse);
              })
              .catch(function(err) {
                  console.log('************************ HTTP GET Failed **************************');
                    failed(err)
              });
            }
         });
    });
  }

  // HTTP POST Request
   static post(url: String, headerParam: Object, parameter: Object){
     console.log('WebServiceHandler:Initiating POST request');

     return new Promise(function(success, failed){
       NetInfo.isConnected.fetch().done((isConnected) => {
             console.log('WebServiceHandler: Network Connectivity status: ' + isConnected);
             if (!isConnected) {
                console.log('************************ HTTP POST Failed **************************');
               failed({name:'503',message:"No Internet connection"});
             }else {

               console.log('URL:-' + url);
               fetch(url,{
                 method: 'post',
                 'headers': WebServiceHandler.header(headerParam),
                 body: JSON.stringify(parameter)
               })
               .then(function(response) {
                 console.log(response.status);
                   if (!response.ok) {
                     throw {name:response.status,message:"http request failed", value:response.json()};
                   }
                   return response.json();

               })
               .then(function(jsonResponse) {
                 console.log('************************ HTTP POST Succes ************************ ');
                 success(jsonResponse);
               })
               .catch(function(err) {
                   console.log('************************ HTTP POST Failed **************************');
                     failed(err)
               });
             }
          });
     });
   }

}
