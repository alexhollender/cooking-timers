import React from 'react';
import '../scss/Timer.scss';
import ogg from '../audio/alarm.ogg';
import mp3 from '../audio/alarm.mp3';

class Timer extends React.Component {
  handleDelete = (e) => {
    // get timer id from clicked button
    var timerId = e.target.getAttribute('timer-id');
    // call delete timer with timer id
    this.props.deleteTimer(timerId);
  }

  componentDidUpdate(prevProps) {
    // if the state of on changed
    if (this.props.isOn !== prevProps.isOn) {
      document.getElementById(`${this.props.id}-alarm`).play();
    }
  }

  render() {
    return (
      <div className={`timer ${this.props.isOn ? "" : "off"}`}>
        <p className="title">{this.props.name ? this.props.name : 'untitled timer'}</p>
        <p className="time">{new Date(this.props.duration * 1000).toISOString().substr(11, 8)}</p>
        <button timer-id={this.props.id} onClick={this.handleDelete}>✕</button>
        <audio id={`${this.props.id}-alarm`}>
          <source src={ogg} type="audio/ogg" />
          <source src={mp3} type="audio/mpeg" />
        </audio>
      </div>
    )
  }
}

export default Timer;
