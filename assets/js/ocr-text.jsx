import React from 'react';

class OcrText extends React.Component {
  render() {
    if (this.props.text) {
      return (
        <div className="well m-t-l">
          <strong>OCR Text: </strong>
          {this.props.text}
        </div>
      );
    }
    return null;
  }
}

module.exports = OcrText;
