import React from 'react';
import axios from 'axios';
import OcrStatus from './ocr-status.jsx';

class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      ocrText: '',
      ocrStatus: 'ready',
      customStatusText: null,
      disableAllSubmits: false
    };

    this.setImage = this.setImage.bind(this);
    this.submit   = this.submit.bind(this);
  }

  submitDisabled() {
    return this.state.disableAllSubmits || !this.state.image;
  }


  setImage(e) {
    this.setState({image: this.refs.image.files[0], ocrText: ''});
    setTimeout(() => this.tryLocalOCR(), 0);
  }

  getCSRF() {
    return document.getElementById('csrf').getAttribute('value');
  }

  submit(e) {
    this.setState({disableAllSubmits: true, ocrText: null, ocrStatus: 'inprogress', customStatusText: 'Sending to server..'});
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.image);
    console.log(this.state.image);

    axios.post(
      '/image', formData, {headers: {"X-CSRF-Token": this.getCSRF()}}
    ).then((response) => {
      const data = response.data;
      console.log(data);
      this.setState({ocrStatus: data.ocrStatus, ocrText: data.ocrText, customStatusText: data.ocrStatusText, disableAllSubmits: false});
    }).catch((error) => {
      this.setState({ocrStatus: 'failed', customStatusText: error.message, disableAllSubmits: false});
    });
  }

  tryLocalOCR(e) {
    e && e.preventDefault();
    if (typeof Tesseract !== 'undefined') {
      Tesseract.recognize(this.state.image).progress((p) => {
        this.setState({ocrStatus: 'inprogress', customStatusText: p.status});
      }).then((result) => {
        this.setState({ocrText: result.text, ocrStatus: 'completed', customStatusText: "local OCR completed!"});
      });
    } else {
      this.setState({ocrStatus: 'failed', customStatusText: "local OCR on device failed :/, try sending to server.."});
    }
  }

  renderOcrResult() {
    if (this.state.ocrText) {
      return (
        <div>
          <br /><br />
          <strong>OCR Text: </strong>{this.state.ocrText}
        </div>
      );
    }
  }

  render() {
    const { ocrStatus, customStatusText } = this.state;
    return (
      <form onSubmit={this.submit}>
        <OcrStatus status={ocrStatus} customText={customStatusText} key={`${ocrStatus}-${customStatusText}`} />
        <input ref="image" type="file" accept="image/*;capture=camera" onChange={this.setImage}/>
        <button type="submit" value="submit-image" disabled={this.submitDisabled()}>
          Submit image
        </button>
        { " or " }
        <button type="submit" value="local-ocr" disabled={this.submitDisabled() || typeof Tesseract === 'undefined'} onClick={this.tryLocalOCR.bind(this)} >
          Try local OCR {typeof Tesseract}
        </button>
        {this.renderOcrResult()}
      </form>
    );
  }
}

module.exports = ImageUploadForm;
