import React from 'react';

class OcrText extends React.Component {
  render() {
    if (this.props.text) {
      return (
        <div className="card">
          <h4 className="card-header">OCR Text</h4>
          <div className="card-block">
            {this.props.text}
          </div>
        </div>
      );
    }
    return null;
  }
}

module.exports = OcrText;
