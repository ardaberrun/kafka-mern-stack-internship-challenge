const moment = require("moment");
const Log = require("../model/Log");

const emitDatabase = async (socket) => {
  try {
    await Log.find(
      {
        $and: [
          {
            timestamp: {
              $gte: moment().unix() - 3600,
            },
          },
          {
            timestamp: {
              $lte: moment().unix(),
            },
          },
        ],
      },
      (err, docs) => {
        if (err) throw err;
        socket.emit("chart-datas", docs);
      }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = emitDatabase;
