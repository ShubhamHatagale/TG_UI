(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "styled-components"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("styled-components"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.styledComponents);
    global.index = mod.exports;
  }
})(this, function (_exports, _react, _styledComponents) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Cell = _exports.Row = _exports.Table = _exports.StickyTable = void 0;
  _react = _interopRequireDefault(_react);
  _styledComponents = _interopRequireWildcard(_styledComponents);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _templateObject5() {
    var data = _taggedTemplateLiteral(["", ""]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    var data = _taggedTemplateLiteral(["\n  position: relative;\n  overflow: auto;\n  height: 100%;\n  box-sizing: border-box;\n\n  & ", ":not(:nth-last-child(-n+", ")) ", " {\n    border-bottom: ", ";\n  }\n\n  & ", ":nth-child(", ") ", " {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0px;\n    z-index: ", ";\n  }\n  & ", ":nth-last-child(-n+", ") ", " {\n    position: -webkit-sticky;\n    position: sticky;\n    bottom: 0px;\n    z-index: ", ";\n    border-top: ", ";\n  }\n  & ", " ", ":nth-child(-n+", ") {\n    position: -webkit-sticky;\n    position: sticky;\n    left: 0px;\n    z-index: ", ";\n    border-right: ", ";\n  }\n  & ", " ", ":nth-last-child(-n+", ") {\n    position: -webkit-sticky;\n    position: sticky;\n    right: 0px;\n    z-index: ", ";\n    border-left: ", ";\n  }\n\n  ", "\n\n  & ", ":nth-child(-n+", ") ", ":nth-child(-n+", ") {\n    z-index: ", ";\n  }\n  & ", ":nth-child(-n+", ") ", ":nth-last-child(-n+", ") {\n    z-index: ", ";\n  }\n  & ", ":nth-last-child(-n+", ") ", ":nth-child(-n+", ") {\n    z-index: ", ";\n  }\n  & ", ":nth-last-child(-n+", ") ", ":nth-last-child(-n+", ") {\n    z-index: ", ";\n  }\n"]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = _taggedTemplateLiteral(["\n  display: table-row;\n"]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = _taggedTemplateLiteral(["\n  display: table-cell;\n  box-sizing: border-box;\n  padding: 0.5rem 0.75rem;\n  background-color: #fff;\n"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  display: table;\n  box-sizing: border-box;\n"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var getBorder = function getBorder(props) {
    return "".concat(props.borderWidth === undefined ? '2px' : props.borderWidth || '0px', " solid ").concat(props.borderColor || '#e5e5e5');
  };

  var Table = (0, _styledComponents["default"])('div').attrs(function () {
    return {
      className: 'sticky-table-table'
    };
  })(_templateObject());
  _exports.Table = Table;
  Table.displayName = 'Table';
  var Cell = (0, _styledComponents["default"])('div').attrs(function () {
    return {
      className: 'sticky-table-cell'
    };
  })(_templateObject2());
  _exports.Cell = Cell;
  Cell.displayName = 'Cell';
  var Row = (0, _styledComponents["default"])('div').attrs(function () {
    return {
      className: 'sticky-table-row'
    };
  })(_templateObject3());
  _exports.Row = Row;
  Row.displayName = 'Row';
  var Wrapper = (0, _styledComponents["default"])('div').attrs(function () {
    return {
      className: 'sticky-table'
    };
  })(_templateObject4(), Row, function (props) {
    return (props.stickyFooterCount || 0) + 1;
  }, Cell, getBorder, Row, function (props) {
    return "-n+".concat(props.stickyHeaderCount);
  }, Cell, function (props) {
    return props.headerZ || 2;
  }, Row, function (props) {
    return props.stickyFooterCount;
  }, Cell, function (props) {
    return props.footerZ || 2;
  }, getBorder, Row, Cell, function (props) {
    return props.leftStickyColumnCount;
  }, function (props) {
    return props.leftColumnZ || 2;
  }, getBorder, Row, Cell, function (props) {
    return props.rightStickyColumnCount;
  }, function (props) {
    return props.rightColumnZ || 2;
  }, getBorder, function (props) {
    var insets = props.stickyInsets;
    var styles = '';
    var i;

    for (i = 0; i < insets.header.length; i++) {
      styles += "& ".concat(Row, ":nth-child(").concat(i + 1, ") ").concat(Cell, " { top: ").concat(insets.header[i], "px; }");
    }

    for (i = 0; i < insets.footer.length; i++) {
      styles += "& ".concat(Row, ":nth-last-child(").concat(i + 1, ") ").concat(Cell, " { bottom: ").concat(insets.footer[i], "px; }");
    }

    for (i = 0; i < insets.leftColumn.length; i++) {
      styles += "& ".concat(Row, " ").concat(Cell, ":nth-child(").concat(i + 1, ") { left: ").concat(insets.leftColumn[i], "px; }");
    }

    for (i = 0; i < insets.rightColumn.length; i++) {
      styles += "& ".concat(Row, " ").concat(Cell, ":nth-last-child(").concat(i + 1, ") { right: ").concat(insets.rightColumn[i], "px; }");
    }

    return (0, _styledComponents.css)(_templateObject5(), styles);
  }, Row, function (props) {
    return props.stickyHeaderCount;
  }, Cell, function (props) {
    return props.leftStickyColumnCount;
  }, function (props) {
    return Math.max(props.headerZ || 2, props.leftColumnZ || 2) + 1;
  }, Row, function (props) {
    return props.stickyHeaderCount;
  }, Cell, function (props) {
    return props.rightStickyColumnCount;
  }, function (props) {
    return Math.max(props.headerZ || 2, props.rightColumnZ || 2) + 1;
  }, Row, function (props) {
    return props.stickyFooterCount;
  }, Cell, function (props) {
    return props.leftStickyColumnCount;
  }, function (props) {
    return Math.max(props.footerZ || 2, props.leftColumnZ || 2) + 1;
  }, Row, function (props) {
    return props.stickyFooterCount;
  }, Cell, function (props) {
    return props.rightStickyColumnCount;
  }, function (props) {
    return Math.max(props.footerZ || 2, props.rightColumnZ || 2) + 1;
  });
  Wrapper.displayName = 'Wrapper';

  var StickyTable =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(StickyTable, _React$Component);

    var _super = _createSuper(StickyTable);

    function StickyTable() {
      var _this;

      _classCallCheck(this, StickyTable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", {
        stickyInsets: {
          header: [],
          footer: [],
          leftColumn: [],
          rightColumn: []
        }
      });

      _defineProperty(_assertThisInitialized(_this), "setTableNodeRef", function (tableNode) {
        _this.tableNode = tableNode;
      });

      return _this;
    }

    _createClass(StickyTable, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.considerSchedulingMultipleStickiesInterval();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.considerSchedulingMultipleStickiesInterval();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearMultipleStickiesInterval();
      } //HINT schedule an interval to poll cell sizes for changes at 60fps
      //WARNING avoid doing this unless user has at least 2 stickies somewhere

    }, {
      key: "considerSchedulingMultipleStickiesInterval",
      value: function considerSchedulingMultipleStickiesInterval() {
        var p = this.props;
        var shouldSchedule = [p.stickyHeaderCount, p.stickyFooterCount, p.leftStickyColumnCount, p.rightStickyColumnCount].some(function (count) {
          return count > 1;
        }); //HINT clear out stickyInsets of a new interval won't be set

        if (!shouldSchedule && this.multipleStickiesInterval) {
          this.setState({
            stickyInsets: {
              header: [],
              footer: [],
              leftColumn: [],
              rightColumn: []
            }
          });
        }

        this.clearMultipleStickiesInterval();

        if (shouldSchedule) {
          this.multipleStickiesInterval = setInterval(this.checkForStickySizeChanges.bind(this), 1000 / 60);
        }
      }
    }, {
      key: "clearMultipleStickiesInterval",
      value: function clearMultipleStickiesInterval() {
        if (this.multipleStickiesInterval) {
          clearInterval(this.multipleStickiesInterval);
          delete this.multipleStickiesInterval;
        }
      }
    }, {
      key: "checkForStickySizeChanges",
      value: function checkForStickySizeChanges() {
        var s,
            stickyInsets = {};
        var props = this.props,
            tableNode = this.tableNode;
        var rowNodes = tableNode.querySelectorAll('.sticky-table-row');
        var cellNodes = tableNode.querySelectorAll('.sticky-table-cell');
        [['header', 'height', 'stickyHeaderCount'], ['footer', 'height', 'stickyFooterCount'], ['leftColumn', 'width', 'leftStickyColumnCount'], ['rightColumn', 'width', 'rightStickyColumnCount']].forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
              stickyKey = _ref2[0],
              sizeKey = _ref2[1],
              countPropKey = _ref2[2];

          var insets = [];

          if (props[countPropKey] > 1) {
            insets = [0];
            var count = props[countPropKey];
            var netInset = 0; // HINT we only want this loop for the second sticky and up

            for (s = 1; s < count; s++) {
              var node = undefined;

              switch (stickyKey) {
                case 'header':
                  node = rowNodes[s - 1].childNodes[0];
                  break;

                case 'footer':
                  node = rowNodes[rowNodes.length - s].childNodes[0];
                  break;

                case 'leftColumn':
                  node = cellNodes[s - 1];
                  break;

                case 'rightColumn':
                  node = cellNodes[cellNodes.length - s];
                  break;
              }

              if (node) {
                var boundingRect = node.getBoundingClientRect();
                netInset += boundingRect[sizeKey];
              }

              insets.push(netInset);
            }
          }

          stickyInsets[stickyKey] = insets;
        }); //HINT avoid a render unless there's actually a change

        if (JSON.stringify(stickyInsets) !== JSON.stringify(this.state.stickyInsets)) {
          this.setState({
            stickyInsets: stickyInsets
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            _this$props$leftStick = _this$props.leftStickyColumnCount,
            leftStickyColumnCount = _this$props$leftStick === void 0 ? 1 : _this$props$leftStick,
            _this$props$stickyHea = _this$props.stickyHeaderCount,
            stickyHeaderCount = _this$props$stickyHea === void 0 ? 1 : _this$props$stickyHea,
            wrapperRef = _this$props.wrapperRef,
            children = _this$props.children,
            restProps = _objectWithoutProperties(_this$props, ["leftStickyColumnCount", "stickyHeaderCount", "wrapperRef", "children"]);

        return (
          /*#__PURE__*/
          _react["default"].createElement(Wrapper, _extends({
            ref: wrapperRef,
            leftStickyColumnCount: leftStickyColumnCount,
            stickyHeaderCount: stickyHeaderCount,
            stickyInsets: this.state.stickyInsets
          }, restProps),
          /*#__PURE__*/
          _react["default"].createElement(Table, {
            ref: this.setTableNodeRef
          }, children))
        );
      }
    }]);

    return StickyTable;
  }(_react["default"].Component);

  _exports.StickyTable = StickyTable;
});