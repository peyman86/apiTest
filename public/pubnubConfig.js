const PubNub = require('pubnub');
const uuid = PubNub.generateUUID();
const pubnub = new PubNub({
    publishKey: "pub-c-991e6c4b-14e7-492d-860f-40be7a4e9fe6",
    subscribeKey: "sub-c-2751d2ee-f683-11ea-afa2-4287c4b9a283",
    uuid: uuid,
    logVerbosity: true,
    ssl: true,
    presenceTimeout: 130
});

const publishConfig = {
    channel: "pubnub_onboarding_channel",
    message: {"sender": uuid, "content": "Hello peyman this is a first message From Node.js SDK"}
}

module.exports={
    pubnub,uuid
}

/*
pubnub.addListener({
    message: function(message) {
        console.log(message);
    },
    presence: function(presenceEvent) {
        console.log(presenceEvent);
    }
})

pubnub.subscribe({
    channels: ["pubnub_onboarding_channel"],
    withPresence: true,
});

pubnub.publish(publishConfig, function(status, response) {
    console.log(status, response);
});*/
