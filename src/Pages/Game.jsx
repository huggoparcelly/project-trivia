import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { trivia } from '../actions';
import fetchTrivia from '../services/fetchTrivia';

class Game extends Component {
  constructor(props) {
    super(props);
    this.saveTriviaOnGlobalState = this.saveTriviaOnGlobalState.bind(this);
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    this.saveTriviaOnGlobalState();
  }

  async saveTriviaOnGlobalState() {
    const { dispatchTrivia } = this.props;
    const triviaToDispatch = await fetchTrivia();
    dispatchTrivia(triviaToDispatch);
    // this.setState({mode: 'game'});
  }

  renderInitialPage() {
    return (
      <div>
        <Header />
        <h1>JOGO</h1>
        <button type="button" onClick={ this.changePageMode }>Começar</button>
      </div>
    );
  }

  renderGame() {
    const { triviaQuestions } = this.props;
    const { counter } = this.state;
    const questionToBeRendered = triviaQuestions[counter];
    console.log(questionToBeRendered);
    const { category, question } = questionToBeRendered;
    const incorrectAnswersObject = questionToBeRendered.incorrect_answers
      .map((answer) => ({ answer, correct: false }));
    const allAnswers = [
      ...incorrectAnswersObject,
      { answer: questionToBeRendered.correct_answer, correct: true },
    ];
    return (
      <div>
        <Header />
        <h1>JOGO AQUI</h1>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.toString()}</p>
        {allAnswers.sort(() => (Math.random() < +'0.5' ? 1 : -'1'))
          .map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ answer.correct ? 'correct-answer' : `wrong-answer-${index}` }
            >
              {answer.answer}
            </button>
          ))}
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
  triviaQuestions: state.trivia.results,
});

Game.propTypes = {
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchTrivia: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
