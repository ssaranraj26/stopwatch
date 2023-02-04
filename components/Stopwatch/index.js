import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, timeEscaped: 0}

  componentWillUnmount() {
    this.clearInterval()
  }

  clearInterval = () => {
    clearInterval(this.intervalId)
  }

  stopTimer = () => {
    this.clearInterval()
    this.setState({isTimerRunning: false})
  }

  intervalTiming = () => {
    this.setState(prevState => ({timeEscaped: prevState.timeEscaped + 1}))
  }

  startTimer = () => {
    const {timeEscaped} = this.state
    this.intervalId = setInterval(this.intervalTiming, 1000)
    this.setState({isTimerRunning: true})
  }

  resetTimer = () => {
    this.clearInterval()
    this.setState({isTimerRunning: false, timeEscaped: 0})
  }

  getRunningTime = () => {
    const {timeEscaped} = this.state
    const minutes = Math.floor(timeEscaped / 60)
    const seconds = Math.floor(timeEscaped % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const isButtonDisabled = isTimerRunning
    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="title">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-icon-head-container">
              <img
                className="timer-icon"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <h1>Timer</h1>
            </div>
            <h1 className="time">{this.getRunningTime()}</h1>
            <div className="btns-container">
              <button
                className="btn start-btn"
                type="button"
                onClick={this.startTimer}
                disabled={isButtonDisabled}
              >
                Start
              </button>
              <button
                className="btn stop-btn"
                type="button"
                onClick={this.stopTimer}
              >
                Stop
              </button>
              <button
                className="btn reset-btn"
                type="button"
                onClick={this.resetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
