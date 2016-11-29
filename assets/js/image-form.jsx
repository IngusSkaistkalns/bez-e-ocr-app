import React from 'react';
import axios from 'axios';

import Status from './status.jsx';
import OcrText from './ocr-text.jsx';

class ImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      ocrText: '',
      statusText: null,
      disableSubmits: false
    };

    this.tryLocalOCR = this.tryLocalOCR.bind(this);
    this.setImage = this.setImage.bind(this);
    this.submit   = this.submit.bind(this);
  }

  submitDisabled() {
    return this.state.disableSubmits || !this.state.image;
  }

  setImage(e) {
    this.setState({
      image: e.target.files[0],
      ocrText: null,
      statusText: 'Image selected, try OCR or send to server'
    });
  }

  tesseractAvaialble() {
    return (typeof Tesseract !== 'undefined');
  }

  getCSRF() {
    return document.getElementById('csrf').getAttribute('value');
  }

  submit(e) {
    e.preventDefault();
    this.setState({disableSubmits: true, ocrText: null, statusText: 'Sending to server..'});

    const formData = new FormData();
    formData.append("image", this.state.image);

    axios.post(
      '/image', formData, {headers: {"X-CSRF-Token": this.getCSRF()}}
    ).then((response) => {
      const data = response.data;
      this.setState({ocrText: data.ocrText, statusText: data.ocrStatusText, disableSubmits: false});
    }).catch((error) => {
      this.setState({statusText: error.message, disableSubmits: false});
    });
  }

  tryLocalOCR(e) {
    e && e.preventDefault();
    if (this.tesseractAvaialble()) {
      Tesseract.recognize(this.state.image).progress((p) => {
        this.setState({statusText: `${p.status} ${Math.round(p.progress * 100)}%`});
      }).then((result) => {
        this.setState({ocrText: result.text, statusText: "OCR on device completed!"});
      });
    } else {
      this.setState({statusText: "local OCR on device failed :/, try sending to server.."});
    }
  }

  render() {
    console.log(this.state.ocrText);
    return (
      <form onSubmit={this.submit}>
        <Status text={this.state.statusText} />

        <div className="btn-group btn-group-justified btn-group-lg">
          <label className="btn btn-primary">
            Select image
            <input ref="image" type="file" accept="image/*;capture=camera" className="hidden" onChange={this.setImage} />
          </label>
          <label className="btn btn-primary" disabled={this.submitDisabled()} onClick={this.submit}>
            Send to server
          </label>
          <label className="btn btn-primary" disabled={this.submitDisabled() || !this.tesseractAvaialble()} onClick={this.tryLocalOCR}>
            OCR on device
          </label>
        </div>

        <OcrText text={this.state.ocrText} key={this.state.ocrText} />
      </form>
    );
  }
}

module.exports = ImageForm;
