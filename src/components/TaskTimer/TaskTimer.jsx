/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react'

import getFormatTime from '../../utils/getFormatTime'

import './TaskTimer.css'

export default class TaskTimer extends Component {
  state = {
    time: this.props.time,
    isCounting: false,
    isSetTime: Boolean(this.props.time),
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  countingTime = () => {
    if (this.state.isCounting) return
    const { isSetTime } = this.state
    function tickIncrement() {
      this.setState(({ time }) => {
        return { time: time + 1 }
      })
    }
    function tickDecrement() {
      const { time } = this.state
      if (time === 0) {
        clearInterval(this.intervalId)
        this.setState({ isSetTime: false, isCounting: false })
        return
      }
      this.setState(() => {
        return { time: time - 1 }
      })
    }
    this.intervalId = isSetTime
      ? setInterval(tickDecrement.bind(this), 1000)
      : setInterval(tickIncrement.bind(this), 1000)
    this.setState({ isCounting: true })
  }

  countingPause = () => {
    clearInterval(this.intervalId)
    this.setState({ isCounting: false })
  }

  render() {
    const { time } = this.state

    return (
      <span className="description">
        <button type="button" className="icon-play" onClick={this.countingTime} />
        <button type="button" className="icon-pause" onClick={this.countingPause} />
        <span className="timer">{getFormatTime(time)}</span>
      </span>
    )
  }
}
