import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { trivia } from '../actions';
import fetchTrivia from '../services/fetchTrivia';
import './Game.css';
import Chronometre from '../Components/Chronometre';

class Game extends Component {
  constructor(props) {
    super(props);
    this.saveTriviaOnGlobalState = this.saveTriviaOnGlobalState.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.state = {
      counter: 0,
      showColor: false,

    };
  }

  componentDidMount() {
    this.saveTriviaOnGlobalState();
  }

  async saveTriviaOnGlobalState() {
    const { dispatchTrivia } = this.props;
    const triviaToDispatch = await fetchTrivia();
    dispatchTrivia(triviaToDispatch);
  }

  colorButton() {
    this.setState({ showColor: true });
  }

  correctQuestion(isCorrect) {
    const { showColor } = this.state;
    if (showColor && isCorrect) {
      return 'correct';
    }
    if (showColor && isCorrect === false) {
      return 'wrong';
    }
    return 'test';
  }

  renderGame() {
    const { triviaQuest, timerIsOver } = this.props;
    const { counter } = this.state;
    const carregando = {
      category: 'Carregando',
      question: 'Carregando',
      correct_answer: 'Carregando',
      incorrect_answers: ['Carregand'],
    };
    const questionToBeRendered = triviaQuest[counter] ? triviaQuest[counter] : carregando;
    const { category, question } = questionToBeRendered;
    const incorrectAnswersObject = questionToBeRendered.incorrect_answers;
    const rightAnswer = questionToBeRendered.correct_answer;
    const allAnswers = [
      ...incorrectAnswersObject,
      rightAnswer,
    ];
    return (
      <div>
        <Header />
        <h1>JOGO AQUI</h1>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.toString()}</p>
        {allAnswers.sort()
          .map((answer, index) => (
            <button
              disabled={ timerIsOver }
              className={ this.correctQuestion(answer === rightAnswer) }
              type="button"
              key={ index }
              data-testid={ answer === rightAnswer
                ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ this.colorButton }
            >
              {answer}
            </button>
          ))}
        <Chronometre />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderGame()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (state) => dispatch(trivia(state)),
});

const mapStateToProps = (state) => ({
  triviaQuest: state.trivia.results,
  timerIsOver: state.timer.timerIsOver,
});

Game.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchTrivia: PropTypes.func.isRequired,
  timerIsOver: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
