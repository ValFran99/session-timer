import React from 'react';
import Button from './Button';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 25*60,
      active: false,
      intervalId: 0,
      displayMin: 25,
      displaySeg: 0,
      mode: true
    };
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.playPause = this.playPause.bind(this);
    this.countDown = this.countDown.bind(this);
    this.reset = this.reset.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.playBeep = this.playBeep.bind(this);
  }

  incrementBreak(){
    if(this.state.breakLength === 60 || this.state.active){
      return undefined;
    }

    var addOne = this.state.breakLength + 1;
    if(!this.state.mode){
      this.setState({
        displayMin: addOne,
        displaySeg: 0,
        timer: addOne * 60
      })
    }
    this.setState({
      breakLength: addOne,
    })
  }

  decrementBreak(){
    if(this.state.breakLength === 1 || this.state.active){
      return undefined;
    }

    var decOne = this.state.breakLength - 1;
    if(!this.state.mode){
      this.setState({
        displayMin: decOne,
        displaySeg: 0,
        timer: decOne * 60
      })
    }
    this.setState({
      breakLength: decOne
    })
  }

  incrementSession(){
    if(this.state.sessionLength === 60 || this.state.active){
      return undefined;
    }
    var addOne = this.state.sessionLength + 1;
    if(this.state.mode){
      this.setState({
        displayMin: addOne,
        displaySeg: 0,
        timer: addOne * 60
      })
    }
    this.setState({
      sessionLength: addOne
    })
  }

  decrementSession(){
    if(this.state.sessionLength === 1 || this.state.active){
      return undefined;
    }
    var decOne = this.state.sessionLength - 1;
    if(this.state.mode){
      this.setState({
        displayMin: decOne,
        displaySeg: 0,
        timer: decOne * 60
      })
    }
    this.setState({
      sessionLength: decOne,
    })
  }

  playPause(){
    if(this.state.active){
      this.setState({
        active: false
      });
      clearInterval(this.state.intervalId)
      return undefined;
    } else{
      if(this.state.timer === this.state.displayMin * 60){
        this.countDown()
      }
      this.state.intervalId = setInterval(this.countDown, 1000);
      this.setState({
        active: true
      })
    }
  }

  countDown(){
    if(this.state.timer === -1){
      this.changeMode();
      return undefined;
    }
    this.setState({
      timer: this.state.timer - 1,
      displayMin: Math.floor(this.state.timer / 60),
      displaySeg: this.state.timer % 60
    })
  }

  playBeep(){
    let audioFile = document.getElementById("beep");
    audioFile.pause();
    audioFile.currentTime = 0;
    audioFile.play();
  }

  changeMode(){
    this.playBeep();
    if(this.state.mode){
      this.setState({
        mode: !this.state.mode,
        timer: this.state.breakLength*60
      })
    } else{
      this.setState({
        mode: !this.state.mode,
        timer: this.state.sessionLength*60
      })
    }
  }

  reset(){
    clearInterval(this.state.intervalId);
    let audioFile = document.getElementById("beep");
    audioFile.pause();
    audioFile.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timer: 25*60,
      active: false,
      displayMin: 25,
      displaySeg: 0,
      mode: true
    })

  }

  render(){
    return(
      <div className="App">
        <h1 id='title'>Session/Break Timer</h1>
        <div className='controlPanel'>
          <h2 id='break-label'>Break Length</h2>
          <h2 id='session-label'>Session Length</h2>
          <div className='container'>
            <p id='break-length'>{this.state.breakLength}</p>
            <div className='buttonPanel'>
              <Button buttonId="break-increment" icon="fa-solid fa-arrow-up fa-2xl" clickHandler={this.incrementBreak}/>
              <Button buttonId="break-decrement" icon="fa-solid fa-arrow-down fa-2xl" clickHandler={this.decrementBreak}/>
            </div>
          </div>
          <div className='container'>
            <p id='session-length'>{this.state.sessionLength}</p>
            <div className='buttonPanel'>
              <Button buttonId="session-increment" icon="fa-solid fa-arrow-up fa-2xl" clickHandler={this.incrementSession}/>
              <Button buttonId="session-decrement" icon="fa-solid fa-arrow-down fa-2xl" clickHandler={this.decrementSession}/>
            </div>
          </div>
        </div>
        <div className='startStopPanel'>
          <Button buttonId="start_stop" icon={this.state.active ? "fa-solid fa-pause fa-2xl" : "fa-solid fa-play fa-2xl"} clickHandler={this.playPause}/>
          <Button buttonId="reset" icon="fa-solid fa-arrows-spin fa-2xl" clickHandler={this.reset}/>
        </div>
        <div className='timeContainer'>
          <audio id='beep' src="./alarm_sound.mp3"></audio>
          <h1 id='timer-label'>{this.state.mode ? "Session": "Break"}</h1>
          <div id='time-left'>
            {this.state.displayMin.toLocaleString("en-US", { 
            minimumIntegerDigits: 2,
            useGrouping: false}) 
            + ":" + this.state.displaySeg.toLocaleString("en-US", { 
              minimumIntegerDigits: 2,
              useGrouping: false})}
          </div>
        </div>
      </div>
    );
  }
}

export default App;