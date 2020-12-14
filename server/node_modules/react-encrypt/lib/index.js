'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

        ciphertext = _cryptoJs2.default.AES.encrypt(text, encryptKey);
      } catch (e) {

        console.error(e);
      };
    }

    return ciphertext;
  };

  ReactEncryptProvider.prototype.decrypt = function decrypt(text) {
    var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _cryptoJs2.default.enc.Utf8;
    var encryptKey = this.props.encryptKey;


    var plaintext = void 0;

    if (text) {

      try {

        var bytes = _cryptoJs2.default.AES.decrypt(text.toString(), encryptKey);
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

    return children ? _react2.default.createElement(children.type, _extends({}, children.props, other)) : null;
  };

  return ReactEncryptProvider;
}(_react.Component), _class.childContextTypes = {
  encrypt: _propTypes2.default.func,
  decrypt: _propTypes2.default.func
}, _temp);
exports.default = ReactEncryptProvider;
ReactEncryptProvider.propTypes = process.env.NODE_ENV !== "production" ? {
  encryptKey: _propTypes2.default.string.isRequired
} : {};
module.exports = exports['default'];