import React, { Component } from 'react'
class SpinnerChart extends Component {
  state = {}
  render() {
    return (
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default SpinnerChart
