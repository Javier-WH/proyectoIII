const os = require('os');

function getIp() {
    let osInterfaces = os.networkInterfaces();
    let networkData = Object.keys(osInterfaces).filter(key => key != "Loopback Pseudo-Interface 1")[0];
    return osInterfaces[networkData].filter(key => key.family == 'IPv4')[0].address;
}

module.exports = { getIp };