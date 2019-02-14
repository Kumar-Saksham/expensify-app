"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//MAIN APP COMPONENT
var DecisionApp = function (_React$Component) {
  _inherits(DecisionApp, _React$Component);

  function DecisionApp() {
    _classCallCheck(this, DecisionApp);

    var _this = _possibleConstructorReturn(this, (DecisionApp.__proto__ || Object.getPrototypeOf(DecisionApp)).call(this));

    _this.state = {
      options: ["op1", "op2", "op3"]
    };
    return _this;
  }

  _createClass(DecisionApp, [{
    key: "handleOptionsRemove",
    value: function handleOptionsRemove() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: "handleOptionAdder",
    value: function handleOptionAdder(newOption) {
      if (newOption.length === 0) {
        return "Enter valid option";
      }
      if (this.state.options.indexOf(newOption) > -1) {
        return "This option already exits";
      }
      this.setState(function (p) {
        return { options: p.options.concat(newOption) };
      });
    }
  }, {
    key: "handleOptionRemove",
    value: function handleOptionRemove(option) {
      this.setState(function (p) {
        return { options: p.options.filter(function (o) {
            return o !== option;
          }) };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("fetching saved data!");
      try {
        var savedState = JSON.parse(localStorage.getItem("decision-state"));
        if (!savedState) {
          throw new Error("empty");
        }
        this.setState(function () {
          return savedState;
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        console.log("componentDidUpdate!");
        localStorage.setItem("decision-state", JSON.stringify(this.state));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(Header, null),
        React.createElement(OptionsList, {
          options: this.state.options,
          removeThis: function removeThis(op) {
            return _this2.handleOptionRemove(op);
          }
        }),
        React.createElement(OptionsRemover, { removeAll: function removeAll() {
            return _this2.handleOptionsRemove();
          } }),
        React.createElement(OptionAdder, { addThis: function addThis(op) {
            return _this2.handleOptionAdder(op);
          } })
      );
    }
  }]);

  return DecisionApp;
}(React.Component);

//HEADER COMPONENT


var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      "h1",
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = { title: "Decision App" };

//OPTIONS-LIST COMPONENT
var OptionsList = function OptionsList(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      "# of options: ",
      props.options.length
    ),
    props.options.length === 0 && React.createElement(
      "p",
      null,
      "Add a new option to get started."
    ),
    React.createElement(
      "div",
      null,
      props.options.map(function (option) {
        return React.createElement(Option, {
          removeThis: function removeThis() {
            return props.removeThis(option);
          },
          optionText: option
        });
      })
    )
  );
};

//OPTION COMPONENT
var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "span",
      null,
      props.optionText
    ),
    React.createElement(
      "button",
      { onClick: props.removeThis },
      "Remove This!"
    )
  );
};

//OPTIONS-REMOVER COMPONENT
var OptionsRemover = function OptionsRemover(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.removeAll },
      "Remove All"
    )
  );
};

//OPTION-ADDER COMPONENT

var OptionAdder = function (_React$Component2) {
  _inherits(OptionAdder, _React$Component2);

  function OptionAdder() {
    _classCallCheck(this, OptionAdder);

    var _this3 = _possibleConstructorReturn(this, (OptionAdder.__proto__ || Object.getPrototypeOf(OptionAdder)).call(this));

    _this3.state = {
      error: undefined
    };
    return _this3;
  }

  _createClass(OptionAdder, [{
    key: "sendNewOption",
    value: function sendNewOption(e) {
      e.preventDefault();

      var error = this.props.addThis(e.target.newOption.value.trim());
      if (error) {
        this.setState(function () {
          return { error: error };
        });
      } else {
        this.setState(function () {
          return { error: undefined };
        });
        e.target.newOption.value = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { onSubmit: function onSubmit(e) {
              return _this4.sendNewOption(e);
            } },
          React.createElement("input", { type: "text", name: "newOption" }),
          React.createElement(
            "button",
            null,
            "Add Option"
          )
        ),
        this.state.error && React.createElement(
          "h1",
          null,
          this.state.error
        )
      );
    }
  }]);

  return OptionAdder;
}(React.Component);

ReactDOM.render(React.createElement(DecisionApp, null), document.getElementById("app"));
