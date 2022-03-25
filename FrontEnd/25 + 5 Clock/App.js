const accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
  };

class Timer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            breakTime: 5,
            sessionTime: 25,
            timerState: "stopped",
            timerType: "session",
            timer: 1500,
            intervalId: "",
            alarm: {
                color: "white"
            }
        }

        this.control = this.control.bind(this);
        this.decrement = this.decrement.bind(this);
        this.setBreak = this.setBreak.bind(this);
        this.setSession = this.setSession.bind(this);
        this.timerControl = this.timerControl.bind(this);
        this.beginCount = this.beginCount.bind(this);
        this.phaseControl = this.phaseControl.bind(this)
        this.warning = this.warning.bind(this)
        this.buzzer = this.buzzer.bind(this)
        this.switchTimer = this.switchTimer.bind(this)
        this.clock = this.clock.bind(this)
        this.reset = this.reset.bind(this)
    }

    setBreak(e) {
        this.control(
            "breakTime",
            e.currentTarget.value,
            this.state.breakTime,
            "session"
        )
    }

    setSession(e) {
        this.control(
            "sessionTime",
            e.currentTarget.value,
            this.state.sessionTime,
            "break"
        )
    }

    control(stateToChange, sign, currentLength, timerType) {
        if (this.state.timerState === "running") {
            return;
        }

        if (this.state.timerType === timerType) {
            if (sign === "-" && currentLength !== 1) {
                this.setState({
                    [stateToChange]: currentLength - 1
                })
            } else if (sign === "+" && currentLength !== 60) {
                this.setState({
                    [stateToChange]: currentLength + 1
                })
            }
        } else if (sign === "-" && currentLength !== 1) {
            this.setState({
                [stateToChange]: currentLength - 1,
                timer: currentLength * 60 - 60
            })
        } else if (sign === "+" && currentLength !== 60) {
            this.setState({
                [stateToChange]: currentLength + 1,
                timer: currentLength * 60 + 60
            })
        }
    }

    timerControl() {
        if (this.state.timerState === "stopped") {
            this.beginCount()
            this.setState({
                timerState: "running"
            })
        } else {
            this.setState({
                timerState: "stopped"
            })

            if (this.state.intervalId) {
                this.state.intervalId.cancel();
              }
        }
    }

    beginCount() {
        this.setState({
            intervalId: accurateInterval(() => {
                this.decrement();
                this.phaseControl();
            }, 1000)
        })
    }

    decrement() {
        this.setState({
            timer: this.state.timer - 1
        })
    }

    phaseControl() {
        let timer = this.state.timer;
        this.warning(timer);
        this.buzzer(timer)

        if (timer < 0) {
            if (this.state.intervalId) {
                this.state.intervalId.cancel();
            }

            if (this.state.timerType === "session") {
                this.beginCount();
                this.switchTimer(this.state.breakTime * 60, "break")
            } else {
                this.beginCount();
                this.switchTimer(this.state.sessionTime * 60, "session")
            }
        }
    }

    warning(_timer) {
        if (_timer < 61) {
            this.setState({
                alarmColor: {
                    color: '#a50d0d'
                }
            })
        } else {
            this.setState({
                alarmColor: {
                    color: 'white'
                }
            })
        }
    }

    buzzer(_timer) {
        if (_timer === 0) {
            this.audioBeep.play();
        }
    }

    switchTimer(num, str) {
        this.setState({
            timer: num,
            timerType: str,
            alarmColor: {color: "white"}
        })
    }

    clock() {
        let m = Math.floor(this.state.timer / 60)
        let s = Math.floor(this.state.timer - m * 60);
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s
        return `${m}:${s}`
    }

    reset() {
        this.setState({
            breakTime: 5,
            sessionTime: 25,
            timerState: 'stopped',
            timerType: 'session',
            timer: 1500,
            intervalId: '',
            alarmColor: { color: 'white' }
          });

          if (this.state.intervalId) {
              this.state.intervalId.cancel()
          }

          this.audioBeep.pause();
          this.audioBeep.currentTime = 0;
    }


    render() {
        return (
            <div className="timer">
                <div className="title" style={{"opacity": this.state.timerState === "running" ? "0" : "1"}}>
                    <h1> 25 + 5 Clock </h1>
                </div>
                <div className="label" style={{"opacity": this.state.timerState === "running" ? "0" : "1"}}>
                    <TimerLengthControls
                    label="break-label"
                    title="Break Length"
                    labelInc="break-increment"
                    labelDec="break-decrement"
                    labelLength="break-length"
                    lengthTime={this.state.breakTime}
                    onClick={this.setBreak}
                    />
                    <TimerLengthControls
                    label="session-label"
                    title="Session Length"
                    labelInc="session-increment"
                    labelDec="session-decrement"
                    labelLength="session-length"
                    lengthTime={this.state.sessionTime}
                    onClick={this.setSession}
                    />
                </div>

                <Timers 
                labelTime={this.state.timerType}
                stop={this.state.timerState}
                time={this.clock()}
                reset={this.reset}
                style={this.state.alarmColor}
                timerControl={this.timerControl}
                />

                <div className={this.state.timerState === "running" ? "line active" : "line"} />
                <audio 
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
                id="beep"
                preload="auto"
                ref={audio => this.audioBeep = audio}
                />
            </div>
        )
    }
}

let Timers = props => {
    return (
        <div className={props.stop === "running" ? "timers active" : "timers"}>
            <div id="timer-label">
                {props.labelTime}
            </div>
            <div id="time-left" style={props.style}>
                {props.time}
            </div>
            <div className="act">
                <button
                id="start_stop"
                onClick={props.timerControl}
                >
                <div>
                    {props.stop === "stopped" ? <i className="bx bx-play" /> : <i className="bx bx-pause" />}
                </div>
                </button>
                <button
                id="reset"
                onClick={props.reset}
                >
                <div>
                    <i class="bx bx-reset"></i>
                </div>
                </button>
            </div>
        </div>
    )
}

let TimerLengthControls = props => {
    return (
        <div id={props.label}>
            <p>{props.title}</p>
            <button
            id={props.labelInc}
            onClick={props.onClick}
            value="+"
            >
            <div>
                <i class="bx bx-up-arrow-alt"></i>
            </div>
            </button>
            <div id={props.labelLength}>
                {props.lengthTime}
            </div>
            <button
            id={props.labelDec}
            onClick={props.onClick}
            value="-"
            >
            <div>
                <i class="bx bx-down-arrow-alt"></i>
            </div>
            </button>
        </div>
    )
}

ReactDOM.render(<Timer />, document.getElementById("App"))