import React from 'react';
import AvatarEditor from 'react-avatar-editor';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appWidth: document.getElementById('app').offsetWidth,
      scale: 1.0,
      width: 16.0,
      height: 9.0,
      border: 40.0
    }

    this.updateAppWidth = this.updateAppWidth.bind(this);
  }

  componentDidMount() {
    this.updateAppWidth();
    window.addEventListener("resize", this.updateAppWidth);
  }

  updateAppWidth() {
    this.setState({appWidth: document.getElementById('app').offsetWidth});
  }

  getWidth() {
    return this.state.appWidth - (this.state.border * 2);
  }

  getHeight() {
    return this.getWidth() / this.state.width * this.state.height;
  }

  changeWidth(increment){
    this.setState({width: Math.max((this.state.width + increment), 1)});
  }

  changeScale(increment){
    this.setState({scale: Math.max((this.state.scale + increment), 0.1)});
  }

  setImage() {
    this.props.setImageFromEditor(this.refs.editor.getImageScaledToCanvas());
  }

  render() {
     return (
      <div className='mt-2'>
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={this.changeWidth.bind(this, -1)}>-</button>
          <button type="button" className="btn btn-primary">{this.state.width}</button>
          <button type="button" className="btn btn-primary" onClick={this.changeWidth.bind(this, 1)}>+</button>
        </div>
        &nbsp;
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={this.changeScale.bind(this, -0.1)}>-</button>
          <button type="button" className="btn btn-primary">{this.state.scale}</button>
          <button type="button" className="btn btn-primary" onClick={this.changeScale.bind(this, 0.1)}>+</button>
        </div>
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={this.setImage.bind(this)}>Switch</button>
        <div className='mt-1'>
          <AvatarEditor ref="editor" image={this.props.image} width={this.getWidth()} height={this.getHeight()} scale={this.state.scale} />
        </div>
      </div>
      );
  }
}

module.exports = Editor;
