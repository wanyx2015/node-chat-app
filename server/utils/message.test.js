var expect = require("expect");
var generateMessage = require("./message").generateMessage;

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var from = "Mike";
        var text = "How are you!";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({
            from,
            text
        });

    })
})