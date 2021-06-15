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
    this.changePageMode = this.changePageMode.bind(this);
    this.state = {
      mode: 'initialpage',
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

  changePageMode() {
    this.setState({ mode: 'game' });
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
    console.log(triviaQuestions);
    const { counter } = this.state;
    const questionToBeRendered = triviaQuestions[counter];
    const { category, question, correct_answer, incorrect_answers } = questionToBeRendered;
    const incorrectAnswersObject = incorrect_answers.map((answer) => ({ answer, correct: false }));
    const allAnswers = [
      ...incorrectAnswersObject,
      { answer: correct_answer, correct: true },
    ];
    return (
      <div>
        <Header />
        <h1>JOGO AQUI</h1>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.toString()}</p>
        {allAnswers.sort(() => (Math.random() < +'0.5' ? 1 : -'1'))
          .map((answer, index) => (
            <p
              key={ index }
              data-testid={ answer.correct ? 'correct-answer' : `wrong-answer-${index}` }
            >
              {answer.answer}
            </p>
          ))}
      </div>
    );
  }

  render() {
    const { mode } = this.state;
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
  triviaQuestions: state.triviaReducer.trivia.results,
});

Game.propTypes = {
  XVIDEOS: PropTypes.number.isRequired,
  triviaQuestions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  dispatchTrivia: PropTypes.func.isRequired,
  XVIDEOS: PropTypes.func.isRequired,
  XVIDEOS: PropTypes.func.isRequired,
  XVIDEOS: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
