import React from 'react';
import ReactDOM from 'react-dom';

import ImageForm from './image-form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Bez-E OCR App!</h1>
        <ImageForm />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
