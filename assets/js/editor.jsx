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
    const canvas = this.refs.editor.getImageScaledToCanvas();
    this.props.setImageFromEditor(canvas);
    this.setState({scale: 1.0});
  }

  render() {
     return (
      <div className="mt-2">
        <div className='row'>
          <div className="col-sm-4 mb-1">
            <div className="btn-group btn-group-justified">
              <label className="btn btn-primary" onClick={this.changeWidth.bind(this, -1)}>-</label>
              <label className="btn">{this.state.width}</label>
              <label className="btn btn-primary" onClick={this.changeWidth.bind(this, 1)}>+</label>
            </div>
          </div>
          <div className="col-sm-4 mb-1">
            <div className="btn-group btn-group-justified">
              <label className="btn btn-primary" onClick={this.changeScale.bind(this, -0.1)}>-</label>
              <label className="btn">{Math.round(this.state.scale * 100) / 100 }</label>
              <label className="btn btn-primary" onClick={this.changeScale.bind(this, 0.1)}>+</label>
            </div>
          </div>
          <div className="col-sm-4 mb-1">
            <label className="btn btn-primary btn-block" onClick={this.setImage.bind(this)}>Switch</label>
          </div>
        </div>
        <div className='mt-1'>
          <AvatarEditor ref="editor" image={this.props.image} width={this.getWidth()} height={this.getHeight()} scale={this.state.scale} />
        </div>
      </div>
    );
  }
}

module.exports = Editor;
