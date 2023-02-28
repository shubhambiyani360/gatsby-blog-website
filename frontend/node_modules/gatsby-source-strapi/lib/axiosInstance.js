"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

const createInstance = config => {
  const headers = { ...(config === null || config === void 0 ? void 0 : config.headers)
  };

  if (config.accessToken) {
    headers.authorization = `Bearer ${config.accessToken}`;
  }

  const instance = _axios.default.create({
    baseURL: config.apiURL,
    headers
  });

  return instance;
};

var _default = createInstance;
exports.default = _default;