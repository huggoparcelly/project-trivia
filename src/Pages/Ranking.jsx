import React, { Component } from 'react';

export default class Ranking extends Component {
  renderInitialPage() {
    window.location.href = '/';
  }

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.renderInitialPage }
        >
          Inicio
        </button>
      </div>
    );
  }
}
