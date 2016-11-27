// import '../css/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import ImageUploadForm from './image-upload-form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="image-upload-container">
        <h1>BezE OCR App!</h1>
        <ImageUploadForm />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
