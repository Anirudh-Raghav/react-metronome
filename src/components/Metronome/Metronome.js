import { Component } from 'react';

import './Metronome.css';

import Counter from '../Counter/Counter';
import Button from '../../Elements/Button/Button';
import InputField from '../../Elements/InputField/InputField';

class Metronome extends Component {
    constructor() {
        super();

        //STATES
        this.state = {
            count: 0,
            bpm: 100,
            isPlaying: false,
            beatsPerMeasure: 4
        };

        //CLASS VARIABLES
        this.click1 = new Audio("/Audio/click1.mp3");
        this.click2 = new Audio("/Audio/click2.mp3");

        //BINDING THE HANDLE FUNCTIONS TO THIS CLASS INSTANCE (THIS)
        this.handleBpmChange = this.handleBpmChange.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.startStop = this.startStop.bind(this);
        this.playOnClick = this.playOnClick.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    };

    handleIncrement(e) {
        if (this.state.isPlaying)
            this.setState({ ...this.state, beatsPerMeasure: (this.state.beatsPerMeasure + 1), count: 0 });
        else
            this.setState({ ...this.state, beatsPerMeasure: (this.state.beatsPerMeasure + 1) });
    };

    handleDecrement(e) {
        if (this.state.beatsPerMeasure > 2) {
            if (this.state.isPlaying)
                this.setState({ ...this.state, beatsPerMeasure: (this.state.beatsPerMeasure - 1), count: 0 });
            else
                this.setState({ ...this.state, beatsPerMeasure: (this.state.beatsPerMeasure - 1) });
        };
    };

    updateInterval() {
        const bpmInterval = 60 * 1000 / this.state.bpm;
        this.timer = setInterval(this.playOnClick, bpmInterval);
    };

    handleBpmChange(e) {
        if (this.state.isPlaying) {
            clearInterval(this.timer);
            this.updateInterval();
            this.setState({ ...this.state, bpm: e.target.value, count: 0 });
        }
        else {
            this.setState({ ...this.state, bpm: e.target.value });
        }

    };

    playOnClick() {
        if (this.state.count % this.state.beatsPerMeasure === 0) this.click2.play();
        else this.click1.play();
        this.setState({
            count: this.state.count + 1
        });
    };

    startStop() {
        if (this.state.isPlaying) {
            clearInterval(this.timer);
            this.setState({ ...this.state, isPlaying: false });
        } else {
            this.updateInterval();
            this.setState({ ...this.state, count: 0, isPlaying: true }, this.playOnClick)
        }
    };

    render() {
        return (
            <div className="Metronome">
                <h1>Metronome</h1>
                <div className='count'>{this.state.bpm} BPM</div>

                <div>
                    <InputField currentState={this.state.bpm} onChange={this.handleBpmChange} />
                </div>

                <h4>Beats per measure</h4>

                <Counter onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} currentState={this.state.beatsPerMeasure} />

                <Button onClick={this.startStop} currentState={this.state.isPlaying} />
            </div>
        )
    };
}


export default Metronome;