import React, { Component } from "react";
import '../QuizComponent.css';
import questions from '../resources/quizQuestion.json';
import ResultComponent from "./ResultComponent";

class QuizComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_Ques_Idx: 0,
            questions: questions,
            selectedOption: null,
            isAnswered: false,
            isCorrect: null,
            isQuizCompleted: false
        };
    }

    render() {
        const { cur_Ques_Idx, questions, selectedOption, isAnswered, isCorrect, isQuizCompleted } = this.state;
        const cur_Ques = questions[cur_Ques_Idx];

        if (isQuizCompleted) {
            return (
                <ResultComponent
                    totalQuestions={questions.length}
                    attemptedQuestions={cur_Ques_Idx + 1}
                    correctAnswers={this.calculateCorrectAnswers()}
                    onPlayAgain={this.handlePlayAgain}
                    onBackToHome={this.handleBackToHome}
                />
            );
        }

        return (
            <div className="qst-pad">
                <h2>Question</h2>
                <span>{cur_Ques_Idx + 1} of {questions.length}</span>
                <h2 className="quiz-question">{cur_Ques.question}</h2>
                <ul className="quiz-options">
                    {Object.values(cur_Ques).slice(1, 5).map((option, index) => (
                        <li
                            key={index}
                            className={`quiz-opt ${selectedOption === option ? 'selected' : ''}`}
                            onClick={() => this.handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                {isAnswered && (
                    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                        {isCorrect ? "Correct!" : `Incorrect! The correct answer is ${cur_Ques.answer}.`}
                    </div>
                )}
                <div className="quiz-buttons">
                    <button className="btn-1" onClick={this.handlePreviousQues} disabled={cur_Ques_Idx === 0}>Previous</button>
                    <button className="btn-2" onClick={this.handleNextQues} disabled={cur_Ques_Idx === questions.length - 1}>Next</button>
                    <button className="btn-3" onClick={this.handleQuit}>Quit</button>
                </div>
            </div>
        );
    }

    calculateCorrectAnswers = () => {
        return this.state.questions.filter(question => question.answer === question.selectedOption).length;
    }

    handleOptionClick = (option) => {
        const { cur_Ques_Idx, questions } = this.state;
        const updatedQuestions = questions.map((q, idx) => idx === cur_Ques_Idx ? { ...q, selectedOption: option } : q);
        const isCorrect = questions[cur_Ques_Idx].answer === option;

        this.setState({
            questions: updatedQuestions,
            selectedOption: option,
            isAnswered: true,
            isCorrect: isCorrect
        }, () => {
            if (cur_Ques_Idx === questions.length - 1) {
                this.setState({ isQuizCompleted: true });
            }
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

    handleNextQues = () => {
        this.setState(prevState => ({
            cur_Ques_Idx: Math.min(prevState.cur_Ques_Idx + 1, prevState.questions.length - 1),
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
            cur_Ques_Idx: 0,
            questions: questions.map(q => ({ ...q, selectedOption: null })),
            selectedOption: null,
            isAnswered: false,
            isCorrect: null,
            isQuizCompleted: false
        });
    }

    handleBackToHome = () => {
    }
}

export default QuizComponent;
