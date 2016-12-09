import React from 'react';
import axios from 'axios';
import filesize from 'filesize';

import Status from './status.jsx';
import OcrText from './ocr-text.jsx';
import Editor from './editor.jsx';

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
    this.setImage    = this.setImage.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.submit      = this.submit.bind(this);
    this.submitSuccess = this.submitSuccess.bind(this);
    this.submitFailure = this.submitFailure.bind(this);
    this.tesseractProgress = this.tesseractProgress.bind(this);
    this.tesseractCompleted = this.tesseractCompleted.bind(this);
  }

  submitDisabled() {
    return this.state.disableSubmits || !this.state.image;
  }

  setImage(e) {
    const image = e.target.files[0];
    this.readImageToUrl(image);
    this.setState({
      image: image,
      ocrText: null,
      statusText: ['Image selected, try OCR or send to server..', `${image.name} (${filesize(image.size)})`]
    });
  }

  readImageToUrl(image) {
    const reader = new FileReader();
    reader.onloadend = this.setImageUrl
    reader.readAsDataURL(image);
  }

  setImageUrl(e) {
    this.setState({imageUrl: e.target.result});
  }

  tesseractAvaialble() {
    return (typeof Tesseract !== 'undefined');
  }

  submit(e) {
    e.preventDefault();
    this.setState({disableSubmits: true, ocrText: null, statusText: 'Sending to server..'});

    const formData = new FormData();
    formData.append("image", this.state.image);

    axios.post('/image', formData).then(this.submitSuccess).catch(this.submitFailure);
  }

  submitSuccess(response) {
    const data = response.data;
    this.setState({ocrText: data.ocrText, statusText: data.ocrStatusText, disableSubmits: false});
  }

  submitFailure(error) {
    this.setState({statusText: error.message, disableSubmits: false});
  }

  tryLocalOCR(e) {
    e && e.preventDefault();
    if (this.tesseractAvaialble()) {
      Tesseract.recognize(this.state.image).progress(this.tesseractProgress).then(this.tesseractCompleted);
    } else {
      this.setState({statusText: "local OCR on device failed :/, try sending to server.."});
    }
  }

  tesseractProgress(p) {
    this.setState({statusText: `${p.status} ${Math.round(p.progress * 100)}%`});
  }

  tesseractCompleted(result) {
    this.setState({ocrText: result.text, statusText: "OCR on device completed!"});
  }

  setImageFromEditor(newImage, promise) {
    const blob = this.dataURItoBlob(newImage.toDataURL('img/png'));
    blob.lastModifiedDate = new Date();
    blob.name = this.state.image.name;
    this.setImage({target: {files: [blob]}});
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  renderEditor() {
    if (this.state.imageUrl) {
      return <Editor image={this.state.imageUrl} setImageFromEditor={this.setImageFromEditor.bind(this)} />;
    }
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <Status text={this.state.statusText} />

        <div className="row">
          <div className="col-sm-4">
            <label className="btn btn-primary btn-block mb-1">
              Select image
              <input ref="image" type="file" accept="image/*;capture=camera" hidden onChange={this.setImage} />
            </label>
          </div>
          <div className="col-sm-4">
            <label className="btn btn-primary btn-block mb-1" disabled={this.submitDisabled()} onClick={this.submit}>
              Send to server
            </label>
          </div>
          <div className="col-sm-4">
            <label className="btn btn-primary btn-block mb-1" disabled={this.submitDisabled() || !this.tesseractAvaialble()} onClick={this.tryLocalOCR}>
              OCR on device
            </label>
          </div>
        </div>
        { this.renderEditor() }
        <OcrText text={this.state.ocrText} key={this.state.ocrText} />
      </form>
    );
  }
}

module.exports = ImageForm;
