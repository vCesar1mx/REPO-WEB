const { running_mode } = require('../config.json');
function onRun(res) {
    if (running_mode == "debug") return res.set({ 'Running': 'debug', 'Supervised': 'Vazquez Cesar', 'X-Powered-By': 'Private-Eng.', 'Version': '1.0', 'Showing': 'Real-time' })
}
function firstRun(app, bodyParser, morgan) {
    if (running_mode = "debug") {
        app.use(morgan('dev'), compression());

    } else {
        app.use(morgan('combined'), compression());
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(require('express-status-monitor')());
}

module.exports = { onRun: onRun }