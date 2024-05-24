import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../QuizComponent.css';

class ResultComponent extends Component {
    handlePlayAgain = () => {
        this.props.onPlayAgain();
    }

    handleBackToHome = () => {
        this.props.onBackToHome();
    }

    render() {
        const { totalQuestions, attemptedQuestions, correctAnswers } = this.props;
        const wrongAnswers = attemptedQuestions - correctAnswers;
        const scorePercentage = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0;

        return (
            <div className="qst-pad">
                <h1>Result</h1>
                <h2>{scorePercentage >= 50 ? 'Congratulations! You passed the quiz.' : 'You need more practice'}</h2>
                <h1>Your score is {scorePercentage.toFixed(2)}%</h1>
                <h3>Total number of questions: {totalQuestions}</h3>
                <h3>Number of attempted questions: {attemptedQuestions}</h3>
                <h3>Number of correct answers: {correctAnswers}</h3>
                <h3>Number of wrong answers: {wrongAnswers}</h3>
                <button className="btn-1" onClick={this.handlePlayAgain}>Play Again</button>
                <button className="btn-2" onClick={this.handleBackToHome}>Back to Home</button>
            </div>
        );
    }
}

ResultComponent.propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    attemptedQuestions: PropTypes.number.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    onBackToHome: PropTypes.func.isRequired
};

export default ResultComponent;
