import React, { Component } from 'react';
import QuizComponent from './QuizComponent';
import ResultComponent from './ResultComponent';
import questions from '../resources/quizQuestion.json';
import '../QuizComponent.css';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 'quiz', // can be 'quiz' or 'result'
            cur_Ques_Idx: 0,
            selectedOption: null,
            isAnswered: false,
            isCorrect: null,
            attemptedQuestions: 0,
            correctAnswers: 0
        };
    }

    handleOptionClick = (option) => {
        const { cur_Ques_Idx } = this.state;
        const isCorrect = questions[cur_Ques_Idx].answer === option;

        this.setState(prevState => ({
            selectedOption: option,
            isAnswered: true,
            isCorrect: isCorrect,
            attemptedQuestions: prevState.attemptedQuestions + 1,
            correctAnswers: isCorrect ? prevState.correctAnswers + 1 : prevState.correctAnswers
        }));
    }

    handleNextQues = () => {
        this.setState(prevState => {
            const nextIdx = prevState.cur_Ques_Idx + 1;
            if (nextIdx >= questions.length) {
                return { currentStep: 'result' };
            }
            return {
                cur_Ques_Idx: nextIdx,
                selectedOption: null,
                isAnswered: false,
                isCorrect: null
            };
        });
    }

    handlePreviousQues = () => {
        this.setState(prevState => ({
            cur_Ques_Idx: Math.max(prevState.cur_Ques_Idx - 1, 0),
            selectedOption: null,
            isAnswered: false,
            isCorrect: null
        }));
    }

    handleQuit = () => {
        if (window.confirm('Are you sure you want to quit?')) {
            window.location.reload(false);
        }
    }

    handlePlayAgain = () => {
        this.setState({
            currentStep: 'quiz',
            cur_Ques_Idx: 0,
            selectedOption: null,
            isAnswered: false,
            isCorrect: null,
            attemptedQuestions: 0,
            correctAnswers: 0
        });
    }

    handleBackToHome = () => {
        // Implement navigation to home page
    }

    render() {
        const { currentStep, cur_Ques_Idx, selectedOption, isAnswered, isCorrect, attemptedQuestions, correctAnswers } = this.state;

        if (currentStep === 'quiz') {
            return (
                <QuizComponent 
                    cur_Ques_Idx={cur_Ques_Idx}
                    questions={questions}
                    selectedOption={selectedOption}
                    isAnswered={isAnswered}
                    isCorrect={isCorrect}
                    onOptionClick={this.handleOptionClick}
                    onPreviousQues={this.handlePreviousQues}
                    onNextQues={this.handleNextQues}
                    onQuit={this.handleQuit}
                />
            );
        }

        if (currentStep === 'result') {
            return (
                <ResultComponent 
                    totalQuestions={questions.length}
                    attemptedQuestions={attemptedQuestions}
                    correctAnswers={correctAnswers}
                    onPlayAgain={this.handlePlayAgain}
                    onBackToHome={this.handleBackToHome}
                />
            );
        }

        return null;
    }
}

export default MainComponent;
