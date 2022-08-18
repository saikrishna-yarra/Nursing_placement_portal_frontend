import React from "react";
// import "../css/Login.css";
class SubmitButton extends React.Component {
  render() {
    return (
      // <div className="submitButton">
      <button
        class="button login__submit"
        disabled={this.props.disabled}
        onClick={() => this.props.onClick()}
      >
        {this.props.text}
        <i class="button__icon fas fa-chevron-right"></i>
      </button>
      // </div>
    );
  }
}
export default SubmitButton;
