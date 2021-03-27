const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "kafka",
    brokers: ["YOUR_IP_ADDRESS:9092"],
  });


module.exports = kafka;
