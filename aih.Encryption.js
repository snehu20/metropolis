import $ from 'jquery';
import aih from './aes';
import CryptoJS from 'crypto-js';

aih.Enc = {};
var encrypted = '';
var decrypted = ''; 
var result = '';
$(function() {
    aih.Enc = {};
    aih.ENK = "A1HS8CUR1TY@9812";
    aih.ENI = "A1HS8CUR1TY@9812";
    aih.Enc.Key = CryptoJS.enc.Utf8.parse(aih.ENK);
    aih.Enc.IV = CryptoJS.enc.Utf8.parse(aih.ENI);

    aih.Enc.Encrypt = function (val) {    
        debugger;  
        //alert(22222);   
        encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(val), aih.Enc.Key,
        {
            keySize: 256 / 8,
            iv: aih.Enc.IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        result = encrypted.toString();
        return result;
    };

    aih.Enc.Decrypt = function (val) {
        //debugger;     
        decrypted = CryptoJS.AES.decrypt(val, aih.Enc.Key,
            {
                keySize: 256 / 8,
                iv: aih.Enc.IV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        var result = decrypted.toString(CryptoJS.enc.Utf8);

        return result;
    };

    aih.Enc.AuthorityHashKey = function (val, key, value) {

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(val), key,
        {
            keySize: 256 / 8,
            iv: value,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var result = encrypted.toString();
        return result;
    };
});