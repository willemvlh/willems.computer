import MqttBedroomClient from "./client";
import { describe } from "node:test"
describe("it should send a message", async () => {
    using client = MqttBedroomClient
    await client.connect()
    await client.setColor("#ff2200");
})