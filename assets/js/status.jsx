import React from 'react';

class Status extends React.Component {
  statusText() {
    return this.props.text || "ready to work, waiting for image..";
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
