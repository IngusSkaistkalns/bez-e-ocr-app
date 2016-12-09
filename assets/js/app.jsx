import React from 'react';
import ReactDOM from 'react-dom';

import ImageForm from './image-form.jsx';

const css = require("!css-loader!sass-loader!../css/style.scss");

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app" className="container">
        <h1>Bez-E OCR App!</h1>
        <ImageForm />
      </div>
    );
  }
};

try {
  ReactDOM.render(<App />, document.getElementById('root'));
} catch(e) {
  ReactDOM.render(e, document.getElementById('root'));
}
