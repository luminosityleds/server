// TODO: Remove, deprecate, or archive unused commented out code

// import { Request, Response } from 'express';
// import mqtt, { MqttClient } from 'mqtt';
// import { v1 as uuidv1 } from 'uuid';
// import dotenv from 'dotenv';
// dotenv.config();

// const options = {
//   username: process.env.ACTIVE_MQ_USERNAME,
//   password: process.env.ACTIVE_MQ_PASSWORD,
//   clientId: `publish_${uuidv1()}`,
//   port: 1883,
// };
// const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

// // Publish message to MQTT
// export const publishMessage = async (req: Request, res: Response) => {
//   const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options);

//   const event = {
//     id: req.params.id,
//     message: "From Publish Service",
//   };

//   client.on('connect', () => {
//     console.log("Broker connected");
//     client.publish(topic, JSON.stringify(event), {}, (err) => {
//       if (err) {
//         console.error(`Error publishing message: ${err}`);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         client.end();
//         res.json(event);
//       }
//     });
//   });

//   client.on('error', (error) => {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   });
// };