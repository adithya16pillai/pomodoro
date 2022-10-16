import React, { Component } from 'react';
import Timer from './Timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSync, faPause } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class App extends Component {
  state = {
    breakCount: 5,
    studyCount: 45,
    clockCount: 45 * 60,
    currentTimer: 'Study',
    isPlaying: false,
    loop: undefined
  };
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  componentWillUnmount() {
    clearInterval(this.loop);
  }
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    seconds = seconds < 10 ? ('0' + seconds) : seconds;
    return `${minutes}:${seconds}`;
  }
  handleLengthChange = (count, timerType) => {
    const {
      studyCount,
      breakCount,
      isPlaying,
      currentTimer
    } = this.state;
    let newCount;
    if (timerType === 'study') {
      newCount = studyCount + count;
    } else {
      newCount = breakCount + count;
    }
    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({[`${timerType}Count`]: newCount });
      if (currentTimer.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60
        });
      }
    }
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      });
    } else {
      this.setState({
        isPlaying: true
      });
      this.loop = setInterval(() => {
        const { clockCount, currentTimer, studyCount, breakCount } = this.state;
        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === 'Study' ? 'Break' : 'Study',
            clockCount: currentTimer === 'Study' ? breakCount * 60 : studyCount * 60,
          });
          if (currentTimer === 'Study') {
            document.querySelector('body').classList.add("background-black");
            document.querySelector('.clock-container h1').style.backgroundColor = '#000000';
          } else {
            document.querySelector('body').classList.remove("background-orange");
            document.querySelector('.clock-container h1').style.backgroundColor = '#0984e3';
          }
        } else {
          this.setState({
            clockCount: clockCount - 1
          });
        }
      }, 1000);
    }
  }
  handleReset = () => {
    this.setState({
      breakCount: 5,
      studyCount: 45,
      clockCount: 45 * 60,
      currentTimer: 'Study',
      isPlaying: false,
    });
    clearInterval(this.loop);
  }
  render() {
    const { 
      breakCount,
      studyCount,
      clockCount,
      currentTimer,
      isPlaying 
    } = this.state;
    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, 'break'),
      handleIncrease: () => this.handleLengthChange(1, 'break')
    }
    const studyProps = {
      title: 'Study',
      count: studyCount,
      handleDecrease: () => this.handleLengthChange(-1, 'study'),
      handleIncrease: () => this.handleLengthChange(1, 'study'),
    }

    return (
      <div className="App">
        <div className="container">
          <div className="clock-container">
            <h1>{currentTimer}</h1> 
            <span>{this.convertToTime(clockCount)}</span>
            <div className="set-timer-f">
              <button onClick={this.handlePlayPause}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <button onClick={this.handleReset}>
                <FontAwesomeIcon icon={faSync} />
              </button>
            </div>
          </div>
          <div className="set-timer">
            <Timer {...breakProps} />
            <Timer {...studyProps} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;