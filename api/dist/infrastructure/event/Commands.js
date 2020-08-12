"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var Command;
(function (Command) {
    Command[Command["UserRegister"] = 0] = "UserRegister";
    Command[Command["NormalizeAddress"] = 1] = "NormalizeAddress";
    Command[Command["ApplicationError"] = 2] = "ApplicationError";
    Command[Command["GetForms"] = 3] = "GetForms";
    Command[Command["GetClient"] = 4] = "GetClient";
    Command[Command["StoreJson"] = 5] = "StoreJson";
})(Command = exports.Command || (exports.Command = {}));
