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
  }

  incrementBreak(){
    if(this.state.breakLength === 60 || this.state.active){
      return undefined;
    }

    var addOne = this.state.breakLength + 1;
    this.setState({
      breakLength: addOne,
      timer: addOne * 60,
      displayMin: addOne,
      displaySeg: 0
    })
  }

  decrementBreak(){
    if(this.state.breakLength === 1 || this.state.active){
      return undefined;
    }

    var decOne = this.state.breakLength - 1;
    this.setState({
      breakLength: decOne,
      timer: decOne * 60,
      displayMin: decOne,
      displaySeg: 0
    })
  }

  incrementSession(){
    if(this.state.sessionLength === 60 || this.state.active){
      return undefined;
    }
    var addOne = this.state.sessionLength + 1;
    this.setState({
      sessionLength: addOne,
      timer: addOne * 60,
      displayMin: addOne,
      displaySeg: 0
    })
  }

  decrementSession(){
    if(this.state.sessionLength === 1 || this.state.active){
      return undefined;
    }
    var decOne = this.state.sessionLength - 1;
    this.setState({
      sessionLength: decOne,
      timer: decOne * 60,
      displayMin: decOne,
      displaySeg: 0
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
      this.state.intervalId = setInterval(this.countDown, 100);
      this.setState({
        active: true
      })
    }
  }

  countDown(){
    if(this.state.timer === -1){
      // Acá yo debería meter un método que cree el contador contrario
      this.changeMode();
      return undefined;
    }
    this.setState({
      timer: this.state.timer - 1,
      displayMin: Math.floor(this.state.timer / 60),
      displaySeg: this.state.timer % 60
    })
  }

  changeMode(){
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
        <h1>Session Timer</h1>
        <h2 id='break-label'>Break Length</h2>
        <Button buttonId="break-decrement" icon="" clickHandler={this.decrementBreak}/>
        <h2 id='break-length'>{this.state.breakLength}</h2>
        <Button buttonId="break-increment" icon="" clickHandler={this.incrementBreak}/>
        <h2 id='session-label'>Session Length</h2>
        <Button buttonId="session-decrement" icon="" clickHandler={this.decrementSession}/>
        <h2 id='session-length'>{this.state.sessionLength}</h2>
        <Button buttonId="session-increment" icon="" clickHandler={this.incrementSession}/>
        <div className='timeContainer'>
          <h1 id='timer-label'>{this.state.mode ? "Session": "Break"}</h1>
          <div id='time-left'>{this.state.displayMin.toLocaleString("en-US", { 
            minimumIntegerDigits: 2,
            useGrouping: false}) 
            + ":" + this.state.displaySeg.toLocaleString("en-US", { 
              minimumIntegerDigits: 2,
              useGrouping: false})}</div>
        </div>
        <div className='controlPanel'>
          <Button buttonId="start_stop" icon="" clickHandler={this.playPause}/>
          <Button buttonId="reset" icon="" clickHandler={this.reset}/>
        </div>
      </div>
    );
  }
}

export default App;