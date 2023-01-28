import { Component } from 'react'

export default class Timer extends Component {
  state = {
    time: '',
    interval: null,
  }

  componentDidMount() {
    this.setState({
      time: this.props.time,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time !== this.state.time) {
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      const idx = tasks.findIndex((el) => el.id === this.props.id)
      tasks[idx].time = this.state.time
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  parseTime(time) {
    if (time <= 0) return 'Конец'

    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
    const minutesLength = String(minutes).length
    const secondsLength = String(seconds).length

    const zeroMinutes = minutesLength > 1 ? '' : '0'
    const zeroSeconds = secondsLength > 1 ? '' : '0'

    return `${zeroMinutes}${minutes}:${zeroSeconds}${seconds}`
  }

  timerStart = () => {
    this.setState({
      interval: setInterval(() => {
        this.setState(({ time }) => {
          return {
            time: +time - +1,
          }
        })
      }, 1000),
    })
  }

  timerPause = () => {
    clearInterval(this.state.interval)
  }

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.timerStart}></button>
        <button style={{ marginRight: '10px' }} className="icon icon-pause" onClick={this.timerPause}></button>
        {this.parseTime(this.state.time)}
      </span>
    )
  }
}
