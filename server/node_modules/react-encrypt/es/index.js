var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import CryptoJS from 'crypto-js';

var ReactEncryptProvider = (_temp = _class = function (_Component) {
  _inherits(ReactEncryptProvider, _Component);

  function ReactEncryptProvider() {
    _classCallCheck(this, ReactEncryptProvider);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ReactEncryptProvider.prototype.getChildContext = function getChildContext() {
    var _this2 = this;

    return {
      encrypt: function encrypt(text) {
        return _this2.encrypt(text);
      },
      decrypt: function decrypt(text) {
        return _this2.decrypt(text);
      }
    };
  };

  ReactEncryptProvider.prototype.encrypt = function encrypt(text) {
    var encryptKey = this.props.encryptKey;


    var ciphertext = void 0;

    if (text && encryptKey) {

      try {

        ciphertext = CryptoJS.AES.encrypt(text, encryptKey);
      } catch (e) {

        console.error(e);
      };
    }

    return ciphertext;
  };

  ReactEncryptProvider.prototype.decrypt = function decrypt(text) {
    var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CryptoJS.enc.Utf8;
    var encryptKey = this.props.encryptKey;


    var plaintext = void 0;

    if (text) {

      try {

        var bytes = CryptoJS.AES.decrypt(text.toString(), encryptKey);
        plaintext = bytes.toString(encoding);
      } catch (e) {

        console.error(e);
      };
    }

    return plaintext;
  };

  ReactEncryptProvider.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        other = _objectWithoutProperties(_props, ['children']);

    return children ? React.createElement(children.type, _extends({}, children.props, other)) : null;
  };

  return ReactEncryptProvider;
}(Component), _class.childContextTypes = {
  encrypt: PropTypes.func,
  decrypt: PropTypes.func
}, _temp);
export { ReactEncryptProvider as default };
ReactEncryptProvider.propTypes = process.env.NODE_ENV !== "production" ? {
  encryptKey: PropTypes.string.isRequired
} : {};