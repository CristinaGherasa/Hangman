import React, { Component } from 'react';
import '../components/hangman.css';
import randomWord from './Words';


import step0 from "./images/Hangman-01.png";
import step1 from "./images/Hangman-02.png";
import step2 from "./images/Hangman-03.png";
import step3 from "./images/Hangman-04.png";
import step4 from "./images/Hangman-05.png";
import step5 from "./images/Hangman-06.png";
import step6 from "./images/Hangman-07.png";

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [step0, step1, step2, step3, step4, step5, step6]
    }

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord()
        }
    }

    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.word.includes(letter) ? 0 : 1)
        }));
    }

    guessedWord() {
        let str = this.state.answer.word.toString();
        return str.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
                className='btn-letter'
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord()
        });
    }

    render() {
        const gameOver = this.state.mistake >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer.word;
        let gameStat = this.generateButtons();

        if (isWinner) {
            gameStat = "You Won!!!"
        }

        if (gameOver) {
            gameStat = "You Lost!!!"
        }

        return (
            <div className="container">
                <h1 className="title">Hangman</h1>
                <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
                <div>
                    <p id="category">The chosen category is {this.state.answer.category}</p>
                </div>
                <div className="container-hangman">
                    <img src={this.props.images[this.state.mistake]} className="image" alt="hangman" />
                </div>
                <div className="container-game">
                    <p>
                        {!gameOver ? this.guessedWord() : this.state.answer.word}
                    </p>
                    <p>{gameStat}</p>
                    <button className='btn-reset' onClick={this.resetButton}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Hangman;
