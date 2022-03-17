const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.handlePress = this.handlePress.bind(this)
    this.playSound = this.playSound.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handlePress);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handlePress);
  }

  handlePress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound() {
    if (this.props.power) {
      const sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      sound.volume = this.props.clipVol
      sound.play();
      this.props.updateDisplay(this.props.clipId)
      this.setState({
      active: true
      })
      setTimeout(() => this.setState({
      active: false
    }), 100)
  }
}
  
  render() {
    return (
      <div 
        id={this.props.clipId}
        onClick={this.playSound}
        className={this.state.active ? "drum-pad active" : "drum-pad"}
      >
        <audio src={this.props.url} id={this.props.keyTrigger} className="clip" />
        {this.props.keyTrigger}
      </div>
    )
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let padBank;
    if (this.props.power) {
      padBank = this.props.currentBank.map((x, i) => {
        return (
          <DrumPad 
          clipId={x.id}
          url={x.url}
          keyCode={x.keyCode}
          keyTrigger={x.keyTrigger}
          power={this.props.power}
          updateDisplay={this.props.updateDisplay}
          clipVol={this.props.clipVol}
          />
        )
      })
    } else {
      padBank = this.props.currentBank.map((x, i) => {
        return (
          <DrumPad 
          clipId="#"
          url={x.url}
          keyCode={x.keyCode}
          keyTrigger={x.keyTrigger}
          power={this.props.power}
          updateDisplay={this.props.updateDisplay}
          clipVol={this.props.clipVol}
          />
          )
    })
  }
  return <div className="left">{padBank}</div>
}
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    power: true,
    display: "On",
    currentBank: bankOne,
    currentBankId: "Heater Kit",
    vol: 0.3
  }

  this.displayClipName = this.displayClipName.bind(this)
  this.selectBank = this.selectBank.bind(this)
  this.volume = this.volume.bind(this)
  this.powerControl = this.powerControl.bind(this)
}

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: this.state.power ? "Off" : "On"
    })
  }

  selectBank() {
    if (this.state.power) {
      if (this.state.currentBankId === "Heater Kit") {
        this.setState({
          currentBank: bankTwo,
          display: "Smooth Piano",
          currentBankId: "Smooth Piano"
        })
      } else {
        this.setState({
          currentBank: bankOne,
          display: "Heater Kit",
          currentBankId: "Heater Kit"
        })
      }
    }
  }

  volume(e) {
    if (this.state.power) {
      this.setState({
        vol: e.target.value,
        display: "Volume " + Math.round(e.target.value * 100)
      })
    }
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name,
      })
    }
  }
  render() {
    return (
      <div id="drum-machine" className="container">
        <div className="drum">
        <PadBank
        clipVolume={this.state.vol}
        currentBank={this.state.currentBank}
        power={this.state.power}
        updateDisplay={this.displayClipName}
        clipVol={this.state.vol}
        />

        <div className="right">
          <div className="power">
            <p>Power</p>
            <label className={this.state.power ? "switch active" : "switch"} onClick={this.powerControl}>
                  <span></span>
            </label>
          </div>

          <div className="display" id="display">
            {this.state.display}
          </div>

          <input type="range" min="0" max="1" step="0.01" value={this.state.vol} onChange={this.volume} onInput={this.volume} />

          <div className="bank">
            <p>Bank</p>
            <label className={this.state.currentBankId == "Heater Kit" ? "switch" : "switch active"} onClick={this.selectBank}>
              <span></span>
              </label>
          </div>
        </div>
        </div>
      </div>
    )
}
  }

ReactDOM.render(<App />, document.getElementById("root"))