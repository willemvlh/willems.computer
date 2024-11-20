import mqtt from 'mqtt'

class MqttBedroomClient {
    private _client?: mqtt.MqttClient;
    [Symbol.dispose] = () => {
        console.log('end')
        this._client?.end()
    }
    [Symbol.asyncDispose] = () => {
        console.log('end')
        this._client?.endAsync()
    }

    async connect() {
        if(this._client?.connected){
            return;
        }
        this._client = await mqtt.connectAsync('mqtt://192.168.0.126');
        this._client.on('connect', () => console.log("Connected to MQTT broker"));
        this._client.on("disconnect", () => console.log("Disconnected"))
        this._client.on("reconnect", () => console.log("Reconnected"))
        this._client.on("error", console.error)
    }

    async setColor(color: string) {
        console.log('color: ' + color)
        let colorString = /#[0-9a-fA-F]{6}/.exec(color)?.[0]
        if (!colorString) {
            throw new Error("invalid color: " + color)
        }
        else {
            let colorInt = parseInt(colorString.slice(1), 16);
            const r = (colorInt >> 16) & 0xff;
            const g = (colorInt >> 8) & 0xff;
            const b = colorInt & 0xff;
            if (!this._client) {
                throw new Error("Client has not been instantiated. Call connect() first");
            }
            console.log(`about to publish: ${[r,g,b]}`)
            await this._client.publishAsync('bedroom/colors', Buffer.from([r, g, b]));
        }
    }

}

const theClient = new MqttBedroomClient();
export default theClient;
