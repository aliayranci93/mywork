

exports.decode64 = (token) =>{
    let buffer = new Buffer.from(token, 'base64');
    let decodedToken = buffer.toString('ascii'); 
    return decodedToken;
}

exports.encode64 = (str) =>{
    let buffer = new Buffer.from(str);
    let encryptedToken = buffer.toString('base64');
    return encryptedToken;
}