import React, { Component } from 'react';
import ModelViewer from 'metamask-logo';


class MetamaskLogo extends Component {
  
  componentDidMount() {
    this.viewer = ModelViewer({
      pxNotRatio: true,
      width: this.props.width,
      height: this.props.height,
      followMouse: true
    });
    this.el.appendChild(this.viewer.container);
  }

  componentWillUnmount() {
    this.viewer.stopAnimation();
  }

  render() {
    return (
      <div
        ref={el => (this.el = el)}
        
      />
    );
  }
}
export default MetamaskLogo;