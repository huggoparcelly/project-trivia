import React, { Component } from 'react';
import Header from '../Components/Header';

class Feedback extends Component {
  feedbackMessage() {
    // capturar a quantidade de questões que acertou (assertions - localStore)
    // capturar o score (score - localStore)
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { assertions, score } = player;
    const MIN_QUESTIONS = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          {assertions < MIN_QUESTIONS ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.feedbackMessage()}
      </div>
    );
  }
}
export default Feedback;
