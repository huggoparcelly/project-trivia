import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { trivia } from '../actions';
import fetchTrivia from '../services/fetchTrivia';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.saveTriviaOnGlobalState = this.saveTriviaOnGlobalState.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.state = {
      counter: 0,
      showColor: false,
      timerIsOver: false,
      seconds: 30,
      score: 0,
    };
  }

  componentDidMount() {
    this.saveTriviaOnGlobalState();
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => (
        {
          seconds: prevState.seconds - 1,
        }
      ));
      this.getTimer();
    }, ONE_SECOND);
  }

  getTimer() {
    const { seconds } = this.state;
    if (seconds <= 0) {
      this.setState({
        timerIsOver: true,
      });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { showColor } = nextState;
  //   return !showColor;
  // }

  savePoints(scoreToAdd) {
    const { seconds, score } = this.state;
    const actualPlayer = JSON.parse(localStorage.getItem('player'));
    const { score: actualScore } = actualPlayer;
    const newScore = actualScore + scoreToAdd;
  }

  inicialLocalStorage() {
    const save = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      }
    }

  }

  async saveTriviaOnGlobalState() {
    const { dispatchTrivia } = this.props;
    const triviaToDispatch = await fetchTrivia();
    dispatchTrivia(triviaToDispatch);
  }

  nextQuestion() {
    const INITIAL_SECONDS = 30;
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      showColor: false,
      timerIsOver: false,
      seconds: INITIAL_SECONDS,
    }));
  }

  nextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={this.nextQuestion}
      >
        Próxima
      </button>
    );
  }

  colorButton() {
    this.setState({
      showColor: true,
      timerIsOver: true,
    });
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
    const { triviaQuest } = this.props;
    const { counter, seconds, timerIsOver, showColor } = this.state;
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
    console.log(allAnswers);
    return (
      <div>
        <Header />
        <h1>JOGO AQUI</h1>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.toString()}</p>
        {allAnswers.sort()
          .map((answer, index) => (
            <button
              className={this.correctQuestion(answer === rightAnswer)}
              type="button"
              key={index}
              data-testid={answer === rightAnswer
                ? 'correct-answer' : `wrong-answer-${index}`}
              onClick={this.colorButton}
            >
              {answer}
            </button>
          ))}
        <p>{seconds > 0 ? seconds : 0}</p>
        { showColor || timerIsOver ? this.nextButton() : null}
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
});

Game.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchTrivia: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
