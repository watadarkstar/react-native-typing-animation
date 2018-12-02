import React from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';

import Dot from "./Dot";
import styles from "./styles";

const centerY = 6;

class TypingAnimation extends React.Component {
  constructor(props) {
    super(props);

    const { dotAmplitude } = props;
    this.state = {
      currentAnimationTime: 0
    };

    this._animation = () => {
      this.setState(prevState => ({
        y1: centerY + dotAmplitude * Math.sin(prevState.currentAnimationTime),
        y2: centerY + dotAmplitude * Math.sin(prevState.currentAnimationTime - 1),
        y3: centerY + dotAmplitude * Math.sin(prevState.currentAnimationTime - 2),
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
    const { dotStyles, style, dotColor, dotMargin, dotRadius } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Dot x={12 - dotRadius - dotMargin} y={this.state.y1} radius={dotRadius} style={dotStyles} dotColor={dotColor} />
        <Dot x={12} y={this.state.y2} radius={dotRadius} style={dotStyles} dotColor={dotColor} />
        <Dot x={12 + dotRadius + dotMargin} y={this.state.y3} radius={dotRadius} style={dotStyles} dotColor={dotColor} />
      </View>
    );
  }
}

TypingAnimation.defaultProps = {
  style: {},
  dotStyles: {},
  dotColor: "black",
  dotMargin: 3,
  dotAmplitude: 3,
  dotRadius: 2.5
};

TypingAnimation.propTypes = {
  style: PropTypes.object,
  dotStyles: PropTypes.object,
  dotColor: PropTypes.string,
  dotMargin: PropTypes.number,
  dotAmplitude: PropTypes.number,
  dotRadius: PropTypes.number
};

export default TypingAnimation;
