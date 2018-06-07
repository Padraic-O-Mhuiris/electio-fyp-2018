import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.css'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 5
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    if (seconds === 0) { 
      clearInterval(this.timer);
      this.props.moveNextStage()
    }
  }

  componentDidMount() {
    var x = this.props.endTime - Math.floor(new Date().getTime() / 1000) + 2 
    let timeLeftVar = this.secondsToTime(x);
    this.setState({ 
      time: timeLeftVar,
      seconds: x
    });

    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
      
  render() {
    return (
        <div>
        <i className="fa fa-clock-o"></i>
        <p className="timer">{this.state.time.h} hours : {this.state.time.m} minutes : {this.state.time.s} seconds</p>
        </div>
      )
    }
}

export default Timer

