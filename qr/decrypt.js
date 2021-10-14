// Decrypt a salted msg using a password.
// Inspired by https://github.com/adonespitogo

 var keySize = 256;
 var iterations = 1000;
 function decrypt (encryptedMsg, pass) {
     var salt = CryptoJS.enc.Hex.parse(encryptedMsg.substr(0, 32));
     var iv = CryptoJS.enc.Hex.parse(encryptedMsg.substr(32, 32))
     var encrypted = encryptedMsg.substring(64);

     var key = CryptoJS.PBKDF2(pass, salt, {
         keySize: keySize/32,
         iterations: iterations
     });

     var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
         iv: iv,
         padding: CryptoJS.pad.Pkcs7,
         mode: CryptoJS.mode.CBC
     }).toString(CryptoJS.enc.Utf8);
     return decrypted;
 }

 document.getElementById('staticrypt-form').addEventListener('submit', function(e) {
     e.preventDefault();

     var passphrase = document.getElementById('staticrypt-password').value,
         encryptedMsg = '8bbbe44c3dd7b3b6e9102f9fdd4a97880041906bc9adddf38e179f59ef3c1029bd8e5043b861daa2925727cb6f59986bb3a53df251d08d1a6e85884d99ed166fYv6q6+P35KvcFBtsmGpmV24zp+tPyNqN7S5nXaDQUJbKJsrv1BRj7cK88k3GaO8j8hyqh4urcyqT6pD2Nw5wYLgC5jwwV6viWt432JGU25RrHLXBICPq9FGAxaRJlI23SvAfB007z/DKnnA5jUthnQ94gh4ysQq71jMad4mZitoHFf03mBg1wM1pN5t524KEW3TthGWMk6CUzoTFPK+GViWrW/NIryYj/PskkcjRSeRMuV2pclGClh3FHKaAulZlyhw0r7MAtoa/Q0OwGZEmiq5CwdztLfmZrfEBx53z4+y/g/woCWrqgh2N1adcf9Q9WxDZ0Vn9uASk9b7iMBGPNH9lAa6BqZY0t8xGSZxXxl73Cel1NTENAzgjNyz/ChSqQJ+MKIKgkzASKK5UsJeHkovSxze1zYKBWLXKcRbs4hr47Tm5+O/ctIS2jEx1mL8L3I1UR4kllKMEVrYiFjnuFHt9soLTmDSZUVMup9ZNA0xDkZICMX5Qp07OlnvDeBZZS2Cm89+EC3SZehbdK3SQiicp5Wbq03DFCdCSARJlxgj1jrPFmC6CttPyRp1stpLfwY6qqxvBvh8LqC436MSU9Qf337FHQC1VariE4Gz+KlLGjBdb/hhaDARuk94ui7AWIhPOKHALU/qBmsNth33nqwRZhUEfARL62+R20X2TOUw=',
         encryptedHMAC = encryptedMsg.substring(0, 64),
         encryptedHTML = encryptedMsg.substring(64),
         decryptedHMAC = CryptoJS.HmacSHA256(encryptedHTML, CryptoJS.SHA256(passphrase).toString()).toString();

     if (decryptedHMAC !== encryptedHMAC) {
         alert('Wrong secret, try again');
         return;
     }

     var plainHTML = decrypt(encryptedHTML, passphrase);

     document.write(plainHTML);
     document.close();
 });
