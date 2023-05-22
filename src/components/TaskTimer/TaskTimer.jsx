/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react'

import './TaskTimer.css'

export default class TaskTimer extends Component {
  state = {
    time: 0,
    isCounting: false,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getFormatTime = () => {
    const { time } = this.state
    const hours = Math.floor(time / 60 / 60)
    const minutes = Math.floor(time / 60 - hours * 60)
    const seconds = time - hours * 60 * 60 - minutes * 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  countingTime = () => {
    if (this.state.isCounting) return
    function tick() {
      this.setState(({ time }) => {
        return { time: time + 1 }
      })
    }
    this.intervalId = setInterval(tick.bind(this), 1000)
    this.setState({ isCounting: true })
  }

  countingPause = () => {
    clearInterval(this.intervalId)
    this.setState({ isCounting: false })
  }

  render() {
    return (
      <span className="description">
        <button type="button" className="icon-play" onClick={this.countingTime} />
        <button type="button" className="icon-pause" onClick={this.countingPause} />
        <span className="timer">{this.getFormatTime()}</span>
      </span>
    )
  }
}
