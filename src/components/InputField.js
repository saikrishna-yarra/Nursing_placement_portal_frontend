import React from "react";
// import "../css/Login.css";
class InputField extends React.Component {
  render() {
    return (
      <input
        className="login__input"
        type={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}

export default InputField;
