import React from 'react'
import request from 'superagent'
import colorcolor from 'colorcolor'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import '../assets/styles/App.scss'

function getRandomPastelColor() {
  return 'hsl(' + Math.round(360 * Math.random()) + ',' +
             (Math.round(25 + 70 * Math.random())) + '%,' + 
             (Math.round(55 + 10 * Math.random())) + '%)'
}

function sendMessage(obj) {
  request
    .post('/spawn')
    .send(obj)
    .end(function(err, res){
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log('yay got ' + res.text);
      }
    })
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: 1,
      id: Math.round(Math.random() * 100000000),
      color: getRandomPastelColor()
    }
    console.log('color', this.state.color)
    console.log('converted', colorcolor(this.state.color, 'hex'))
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.state.color;

    window.addEventListener('click', (e) => {
      const pctX = e.clientX / e.view.innerWidth
      const pctY = e.clientY / e.view.innerHeight
      console.log(`Percentage click: ${pctX}% horizontal, ${pctY}% vertical`)

      const payload = {
        text: `option${this.state.selectedOption}`,
        sender: this.state.id,
        color: colorcolor(this.state.color, 'hex'),
        timestamp: Date.now(),
        x: pctX,
        y: pctY
      }

      sendMessage(payload)
      sendMessage({...payload, x: payload.x + 0.1, y: payload.y + 0.1})
      sendMessage({...payload, x: payload.x + 0.2, y: payload.y + 0.2})
      sendMessage({...payload, x: payload.x + 0.3, y: payload.y + 0.3})
      sendMessage({...payload, x: payload.x + 0.4, y: payload.y + 0.4})
    })
  }

  handleChange(event, index, value) {
    this.setState({selectedOption: value})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Altogether">
          </AppBar>
          <DropDownMenu
            value={this.state.selectedOption}
            onChange={this.handleChange.bind(this)}
          >
            <MenuItem value={1} primaryText="Object" />
            <MenuItem value={2} primaryText="Food" />
            <MenuItem value={3} primaryText="Animal" />
          </DropDownMenu>
          <div>
            <h1>Click to spawn! The location of where you click will determine where the object will drop from.</h1>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
