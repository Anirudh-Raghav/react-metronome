import React, { Component } from 'react'

import "./InputField.css"

class InputField extends Component {
    render() {
        return (
            <input type="range" name="bpm" id="bpm" min="20" max="300" value={this.props.currentState} onChange={this.props.onChange} />
        )
    }
}


export default InputField