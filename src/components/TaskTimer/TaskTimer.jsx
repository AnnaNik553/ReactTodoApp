/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react'

import getFormatTime from '../../utils/getFormatTime'
import './TaskTimer.css'

const TaskTimer = ({ time }) => {
  const [timer, setTime] = useState(time)
  const [isCounting, setIsCounting] = useState(false)
  const [isSetTime, setIsSetTime] = useState(Boolean(time))

  useEffect(() => {
    let intervalId
    if (isCounting) {
      intervalId = isSetTime
        ? setInterval(() => {
            if (timer === 0) {
              setIsCounting(false)
              setIsSetTime(false)
              return
            }
            setTime(timer - 1)
          }, 1000)
        : setInterval(() => setTime(timer + 1), 1000)
    }
    return () => clearInterval(intervalId)
  }, [timer, isCounting])

  return (
    <span className="description">
      <button type="button" className="icon-play" onClick={() => setIsCounting(true)} />
      <button type="button" className="icon-pause" onClick={() => setIsCounting(false)} />
      <span className="timer">{getFormatTime(timer)}</span>
    </span>
  )
}

export default TaskTimer
