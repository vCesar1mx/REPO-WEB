const { running_mode } = require('../config.json');
function onRun(res) {
    if (running_mode == "debug") return res.set({ 'Running': 'debug', 'Supervised': 'Vazquez Cesar', 'X-Powered-By': 'Private-Eng.', 'Version': '1.0', 'Showing': 'Real-time' })
}

module.exports = { onRun: onRun }