"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary modules
var amqplib = require("amqplib");
function connectToRabbitMQ() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, channel, queueName, message, sendMessages, consumer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, amqplib.connect('amqp://luminosityleds:Lumi-123@localhost:5672')];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.createChannel()];
                case 2:
                    channel = _a.sent();
                    queueName = 'myQueue';
                    return [4 /*yield*/, channel.assertQueue(queueName)];
                case 3:
                    _a.sent();
                    message = 'Hello, RabbitMQ!';
                    channel.sendToQueue(queueName, Buffer.from(message));
                    sendMessages = function (channel) {
                        for (var i = 0; i < 10; i++) {
                            channel.sendToQueue('myQueue', Buffer.from("message ".concat(i)));
                        }
                    };
                    // Send some messages to the queue
                    sendMessages(channel);
                    consumer = function (channel) { return function (msg) {
                        if (msg !== null) {
                            console.log('Received message:', msg.content.toString());
                            // Acknowledge the message
                            channel.ack(msg);
                        }
                    }; };
                    // Close the channel and the connection when done
                    return [4 /*yield*/, channel.close()];
                case 4:
                    // Close the channel and the connection when done
                    _a.sent();
                    return [4 /*yield*/, connection.close()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error connecting to RabbitMQ:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Call the function to connect to RabbitMQ
connectToRabbitMQ();
