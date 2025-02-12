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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const client = new ioredis_1.default();
const app = (0, express_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedVal = yield client.get('todos');
    if (cachedVal)
        return res.json(JSON.stringify(JSON.parse(cachedVal)));
    const { data } = yield axios_1.default.get('https://jsonplaceholder.typicode.com/todos');
    yield client.set('todos', JSON.stringify(data));
    return res.json(data);
}));
app.listen(9000, () => {
    console.log('Your server is runnning on 9000');
});
