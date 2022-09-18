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

    var time = new Date(this.props.duration * 1000).toISOString();
    var formattedTime;

    if (this.props.duration < 60) {
      formattedTime = time.substring(15, 19);
    } else if (this.props.duration < 3600) {
      formattedTime = time.substring(14, 19);
    } else {
      formattedTime = time.substring(11, 19);
    }


    return (
      <div className={`timer ${this.props.isOn ? "" : "off"}`}>
        <p className="title">{this.props.name ? this.props.name : 'untitled timer'}</p>
        <time className="time">{formattedTime}</time>
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
