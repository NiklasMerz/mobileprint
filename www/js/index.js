/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function print() {
    const text = document.getElementById('textfield').value;
    
    cordova.epos2.connectPrinter("BT:00:01:90:7C:06:1D", "TM-P20")
    .then((res) => { 
    
    console.debug(res);

    cordova.epos2.getPrinterStatus()
    .then(function(status) {
        console.debug(status);
    })
    .catch(function(error) {
       console.error(error);
    });

    cordova.epos2.printText(text, 0, 1, 2, true)
    .then((result) => {
        console.debug(result);
        // success callback
        alert('Printing done!');
    }).catch((error) => {
        // error callback
        alert('Printing failed:' + error);
    });

    }).catch((err) => console.error(err));
}