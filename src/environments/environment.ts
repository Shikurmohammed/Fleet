// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
     //apiBaseUrl:'http://10.36.30.249:8888'
   apiBaseUrl:'http://localhost:8888'//Change this to the IP address of the machine hosting the backend
  //apiBaseUrl:'http://192.168.177.212:8888'
  // apiBaseUrl:'http://10.37.30.159:8888'//Change this to the IP address of the machine hosting the backend
  //apiBaseUrl:'http://localhost:4200/fmsbackend'
  // apiBaseUrl:'https://10.10.12.191:8443/fmsbackend'
    // apiBaseUrl:'https://10.10.101.98:8443/fmsbackend'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
