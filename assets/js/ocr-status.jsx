import React from 'react';

class OcrStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {status: props.status || 'ready', customText: props.customText};
  }

  statusText() {
    const status = this.state.status;
    if (status == 'inprogress' || status == 'completed' || status == 'failed') {
      return this.state.customText;
    }
    return "ready, waiting for image..";
  }

  render() {
    return (
      <div className="ocr-status alert alert-info" style={{"font-size": "2rem"}}>
       <strong>Status: </strong>
       {this.statusText()}
      </div>
    );
  }
}

module.exports = OcrStatus;
