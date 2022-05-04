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

    cordova.epos2.setLang("EPOS2_MODEL_ANK", "EPOS2_LANG_EN");
    
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
        console.log('Printing done!');

        // Barcodes
        cordova.epos2.printBarCode128("11111", 0,0,2,70, true).then(res => console.debug(res)).catch(e => console.error(e))
        cordova.epos2.printBarCode("1234567", "EPOS2_BARCODE_EAN8", 0,0,2,70, true).then(res => console.debug(res)).catch(e => console.error(e))
        cordova.epos2.printBarCode("123456789011", "EPOS2_BARCODE_EAN13", 0,0,2,70, true).then(res => console.debug(res)).catch(e => console.error(e))

        // QR Code
        cordova.epos2.printSymbol("https://github.com/NiklasMerz", "EPOS2_SYMBOL_QRCODE_MODEL_2", "EPOS2_PARAM_DEFAULT", 5,5,0, true).then(res => console.debug(res)).catch(e => console.error(e))
        cordova.epos2.printSymbol("https://github.com/NiklasMerz", "EPOS2_SYMBOL_DATAMATRIX_SQUARE", "EPOS2_PARAM_DEFAULT", 5,5,0, true).then(res => console.debug(res)).catch(e => console.error(e))

    }).catch((error) => {
        // error callback
        alert('Printing failed:' + error);
    });

    }).catch((err) => console.error(err));
}