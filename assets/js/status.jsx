import React from 'react';

class Status extends React.Component {
  statusText() {
    if (Array.isArray(this.props.text)) {
      return this.props.text.map((e) => [e, <br/>]);
    } else {
      return this.props.text || "ready to work, waiting for image.."
    }
  }

  render() {
    return (
      <div className="alert alert-info">
        <strong>Status: </strong>
        {this.statusText()}
      </div>
    );
  }
}

module.exports = Status;
