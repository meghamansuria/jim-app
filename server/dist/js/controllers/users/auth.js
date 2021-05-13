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
exports.register = exports.login = exports.signUp = void 0;
const user_1 = __importDefault(require("../../models/user"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.find({ email });
        if (user.length !== 0)
            res.status(404).json('User already exists');
        if (user.length === 0) {
            const newUser = new user_1.default({ email, password });
            yield newUser.save();
            res.status(201).json(newUser);
        }
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = (yield user_1.default.find({ email }))[0];
        if (!user)
            res.status(404).json({ error: 'User does not exist' });
        if (user.password !== password)
            res.status(404).json({ error: 'Incorrect password' });
        res.status(201).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findById(req.body._id);
        yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.update(Object.assign({}, req.body)));
        const updatedCurrentUser = yield user_1.default.findById(req.body._id);
        console.log(req.body);
        res.status(201).json(updatedCurrentUser);
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
