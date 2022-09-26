const os = require('os');

function getIp() {
    try {
        let osInterfaces = os.networkInterfaces();
        let networkData = Object.keys(osInterfaces).filter(key => key != "Loopback Pseudo-Interface 1")[0];
        return osInterfaces[networkData].filter(key => key.family == 'IPv4')[0].address;
    } catch (error) {
        return "localhost";
    }
}

module.exports = { getIp };