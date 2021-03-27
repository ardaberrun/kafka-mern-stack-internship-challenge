const kafka = require("./Kafka");
const Log = require("../../model/Log");

const producer = async (api_log) => {
  try {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "api-logs",
      messages: [
        {
          value: JSON.stringify(api_log),
          partition: 0,
        },
      ],
    });
    await producer.disconnect();
  } catch (e) {
    console.log(e);
  }
};

const consumer = async () => {
  try {
    const consumer = kafka.consumer({
      groupId: "logs",
    });

    await consumer.connect();

    await consumer.subscribe({
      topic: "api-logs",
      fromBegginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        const { type, responseTime, timestamp } = await JSON.parse(
          result.message.value
        );
        console.log(`Burdayim: ${type},${responseTime},${timestamp}`);
        const log = new Log({ type, responseTime, timestamp });

        await log.save();
      },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { producer, consumer };
