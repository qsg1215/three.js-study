import React, { Component } from 'react';
import Test from './Test/index.jsx'



export default class THREEDemo1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  callbacks(val) {
    if (val.data && val.data.type && val.data.type === 'answerResult') {
      let data = JSON.parse(val.data.data)
      this.setState({
        name: data.name
      })


    }

  }


  componentDidMount() {
    window.addEventListener('message', this.callbacks.bind(this))

  }

  componentWillUnmount() {
    window.removeEventListener('message', this.callbacks.bind(this))
  }
  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <Test></Test>
      </div>
    );
  }



}
