// This Function inserts a key-value pair {"hello":"world"} in the message and publishes
// it to a new channel: ‘hello_universe’
// For testing: you can use the following test payload: {"foo":"bar"}

// Below is the code with inline explanations

// Declare the Function with the export syntax. The incoming message is called request
export default (request) => {

    // Require console module to display variables for troubleshooting
    var console = require("console");
    var pubnub = require("pubnub");

    try {
        // Add to the message a key ‘hello’ with the value ‘world’
        request.message.hello = "world";
        // Remove the existing key ‘foo’ and its value in the message
        delete request.message.foo;

        // This is where it differs from the Before Publish or Fire. Since it’s an After Publish or Fire, we need
        // to publish the mutated message to a channel. In this example, we choose the channel "hello_universe".

        var forwardingMessage = JSON.parse(JSON.stringify(request.message));
        pubnub.publish({channel: "hello_universe", message: forwardingMessage});

        // The result is a promise resolution for the message request.
        return Promise.resolve(request);
    }
    catch (e) {
        // Handle error
        console.error("Uncaught exception:", e);
    }
};
