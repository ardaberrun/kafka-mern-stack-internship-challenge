const sleep = require("./sleep");
const { producer } = require("./kafka/events");
const moment = require("moment");

const createLog = async (reqType) => {
  const random = Math.random() * 3000;

  const api_log = {
    type: reqType,
    responseTime: (random / 1000).toFixed(2),
    timestamp: moment().unix(),
  };

  await producer(api_log);

  sleep(random);
};

module.exports = createLog;
