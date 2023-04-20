import React from 'react';
import Button from './Button';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25
    };
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.reset = this.reset.bind(this);
  }

  incrementBreak(){
    if(this.state.breakLength === 60){
      return undefined;
    }
    this.setState({
      breakLength: this.state.breakLength + 1
    })
  }

  decrementBreak(){
    if(this.state.breakLength === 1){
      return undefined;
    }
    this.setState({
      breakLength: this.state.breakLength - 1
    })
  }

  incrementSession(){
    if(this.state.sessionLength === 60){
      return undefined;
    }
    this.setState({
      sessionLength: this.state.sessionLength + 1
    })
  }

  decrementSession(){
    if(this.state.sessionLength === 1){
      return undefined;
    }
    this.setState({
      sessionLength: this.state.sessionLength - 1
    })
  }

  reset(){
    this.setState({
      breakLength: 5,
      sessionLength: 25
    })
  }

  render(){
    return(
      <div className="App">
        <h1>Session Timer</h1>
        <h2 id='break-label'>Break Length</h2>
        <Button buttonId="break-decrement" icon="" clickHandler={this.decrementBreak}/>
        <h2>{this.state.breakLength}</h2>
        <Button buttonId="break-increment" icon="" clickHandler={this.incrementBreak}/>
        <h2 id='session-label'>Session Length</h2>
        <Button buttonId="session-decrement" icon="" clickHandler={this.decrementSession}/>
        <h2>{this.state.sessionLength}</h2>
        <Button buttonId="session-increment" icon="" clickHandler={this.incrementSession}/>
        <div className='timeContainer'>
          <h1 id='timer-label'></h1>
          <div id='time-left'></div>
        </div>
        <div className='controlPanel'>
          <Button buttonId="start-stop" icon="" clickHandler="lol"/>
          <Button buttonId="reset" icon="" clickHandler={this.reset}/>
        </div>
      </div>
    );
  }
}

export default App;