import React, { Component } from 'react'

import "./Counter.css"

class Counter extends Component {
    render() {
        return (
            <div className="counter-container">
                <button className="counter" onClick={this.props.onDecrement}>-</button>
                <span className="number">{this.props.currentState}</span>
                <button className="counter" onClick={this.props.onIncrement}>+</button>
            </div>
        )
    }
}


export default Counter