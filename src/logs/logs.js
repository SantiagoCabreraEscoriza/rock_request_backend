const fs = require('fs');
const path = require('path');

const logsTypes = {
    error: { color: "\x1b[31m", label: "error"},
    warn: {color: "\x1b[33m", label: "warn"},
    info: {color: "\x1b[32m", label: "info"},
}

const getTimeStamp = () => {
    return new Date().toLocaleString()
}

const writeLog = (type, message) => {
    const logDir  = path.join(__dirname, "logs");
    if(!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    const logMessage = `${getTimeStamp()} [${type}]: ${message}\n`;
    fs.appendFileSync(path.join(logDir, "combined.log"), logMessage);

    if(type == "error"){
        fs.appendFileSync(path.join(logDir, "errors.log"), logMessage);
    }
}

const log = (type, message) => {
    const {color, label} = logsTypes[type];

    const formattedMessage = `${getTimeStamp()} [${label}]: ${message}\x1b[0m`;

    console.log(`${color}${formattedMessage}`);

    writeLog(type, message);
}


module.exports = {
    error: (msg) => log("error", msg),
    warn: (msg) => log("warn", msg),
    info: (msg) => log("info", msg),
}