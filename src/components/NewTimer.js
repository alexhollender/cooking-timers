import React from 'react';
import _ from 'lodash';
import '../scss/NewTimer.scss';

export default class NewTimer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
    this.state = {
      name: '',
      hours: '',
      minutes: '',
      seconds: '',
      show: true
    };
  }

  // when form button is clicked
  handleSubmit = (e) => {
    e.preventDefault()
    // get time in seconds (if Number evaluates to true)
    const total = Number(this.state.hours * 3600) + Number(this.state.minutes * 60) + Number(this.state.seconds);
    // if there is any amount of time
    if (total) {
      const newTimer = {
        id: _.uniqueId(),
        name: this.state.name,
        duration: total,
        isOn: true
      }
      // call addTimer passing in the object
      this.props.addTimer(newTimer);
      // reset the state/form
      this.setState({name: '', hours: '', minutes: '', seconds: ''});
      // hide the form
      this.setState({ show: false });
    }
  };

  componentDidUpdate(prevProps) {
    // if all timers stop, show the form again
    if (this.props.running !== prevProps.running && this.props.running === false) {
      this.showForm();
    }
  }

  // form field values are stored in the state
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  // show form
  showForm = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <div id="newTimer" className={`${this.state.show ? "show" : "hideForMobile" }`}>
        <form id="form" onSubmit={this.handleSubmit}>

          <div className="input-group">
            <label htmlFor="timerName">Timer name</label>
            <input type="text" id="timerName" name="name" placeholder="Untitled timer" onChange={this.handleChange} value={this.state.name} />
          </div>

          <div className="numberInputsContainer">
            <div className="input-group">
              <label htmlFor="timerHours">Hours</label>
              <input type="number" min="0" id="timerHours" name="hours" placeholder="00" onChange={this.handleChange} value={this.state.hours} />
            </div>

            <div className="colon">:</div>

            <div className="input-group">
              <label htmlFor="timerMinutes">Minutes</label>
              <input type="number" min="0" id="timerMinutes" name="minutes" placeholder="00" onChange={this.handleChange} value={this.state.minutes} autoFocus={true} />
            </div>

            <div className="colon">:</div>

            <div className="input-group">
              <label htmlFor="timerSeconds">Seconds</label>
              <input type="number" min="0" id="timerSeconds" name="seconds" placeholder="00" onChange={this.handleChange} value={this.state.seconds} />
            </div>
          </div>

          <button className={`${this.state.hours || this.state.minutes || this.state.seconds ? "enabled" : "disabled" }`} id="button"> Start timer</button>

        </form>
        {/* when the form is hidden this button shows,
            clicking button shows the form and hides the button
        */}
        <button id="showForm" onClick={this.showForm}>Add timer</button>
      </div>
    )
  }
}
