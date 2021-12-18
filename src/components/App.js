import React from 'react';
import Header from './Header';
import NewTimer from './NewTimer';
import Timer from './Timer';
import '../scss/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTimer = this.addTimer.bind(this);
    this.updateTimers = this.updateTimers.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.checkIfAllTimersEnded = this.checkIfAllTimersEnded.bind(this);
    this.state = {
      data: [],
      timer: null,
      running: false
    };
  }

  // add new timer (called in <NewTimer />)
  addTimer = (newTimer) => {
    this.setState((currState) => {
      return {
        data: currState.data.concat(newTimer)
      }
    });
    // if there are no timers currently start updateTimers
    if (!this.state.running) {
      this.setState({
        timer: setInterval(this.updateTimers, 1000),
        running: true
      });
    }
  }

  // called from <Timer />
  deleteTimer = (id) => {
    // make new array with elements that
    var newOjb = this.state.data.filter((element) =>
      // id is not equal to the id the function was called with
      // (coming from the delete button)
      element.id !== id
    );
    // update state
    this.setState({ data:newOjb });
  }

  // runs every second whenever a timer is running
  updateTimers = () => {
    this.setState((currState) => {
      return {
        // set data equal to a mapped array of current state
        data: currState.data.map((item) => {
          if (item.duration > 0) {
            return {
              ...item, duration: item.duration - 1
            }
          } else {
            return {
              ...item, isOn: false
            }
          }
        })
      }
    });
    this.checkIfAllTimersEnded(this.state.data);
  }

  // called in updateTimers()
  // checks if all timers are on === false
  checkIfAllTimersEnded = (array) => {
    const ifAllEnded = (item) => item.isOn === false;
    if (array.every(ifAllEnded)) {
      clearInterval(this.state.timer);
      this.setState({
        running: false
      });
    }
  }

  render() {
    return (
      <>
        <div id="top" className={`${this.state.data.length ? "compact" : "default" }`}>
          <Header />
          <NewTimer addTimer={this.addTimer} running={this.state.running} />
        </div>
        <div id="timersContainer">
          {
            // map current state out into an array of <Timer /> components
            this.state.data.map((item, index) =>
              <Timer key={item.id} id={item.id} name={item.name} duration={item.duration} deleteTimer={this.deleteTimer} isOn={item.isOn} />
            )
          }
        </div>
      </>
    );
  }
}

export default App;
