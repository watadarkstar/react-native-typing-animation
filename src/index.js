import React from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';

import Dot from "./Dot";
import styles from "./styles";

const centerY = 6;
const amplitude = 3;
const radius = 2.5;
const padding = 3;

class TypingAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnimationTime: 0
    };

    this._animation = () => {
      this.setState(prevState => ({
        y1: centerY + amplitude * Math.sin(prevState.currentAnimationTime),
        y2: centerY + amplitude * Math.sin(prevState.currentAnimationTime - 1),
        y3: centerY + amplitude * Math.sin(prevState.currentAnimationTime - 2),
        currentAnimationTime: prevState.currentAnimationTime + 0.15
      }));
      this.frameAnimationRequest = requestAnimationFrame(this._animation);
    };
    this.frameAnimationRequest = requestAnimationFrame(this._animation);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameAnimationRequest);
  }

  render() {
    const { dotStyles, style, dotColor } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Dot x={12 - radius - padding} y={this.state.y1} radius={radius} style={dotStyles} dotColor={dotColor} />
        <Dot x={12} y={this.state.y2} radius={radius} style={dotStyles} dotColor={dotColor} />
        <Dot x={12 + radius + padding} y={this.state.y3} radius={radius} style={dotStyles} dotColor={dotColor} />
      </View>
    );
  }
}

TypingAnimation.defaultProps = {
  style: {},
  dotStyles: {},
  dotColor: "black"
};

TypingAnimation.propTypes = {
  style: PropTypes.object,
  dotStyles: PropTypes.object,
  dotColor: PropTypes.string
};

export default TypingAnimation;
