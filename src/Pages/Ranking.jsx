import React, { Component } from 'react';
import fetchGravatarImage from '../services/fetchGravatarImage';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.getPlayers = this.getPlayers.bind(this);
    this.state = {
      allPlayers: [],
    };
  }

  componentDidMount() {
    this.savePlayerInRanking();
    this.getPlayers();
  }

  getPlayers() {
    const allPlayers = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ allPlayers });
  }

  savePlayerInRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const rankingTest = localStorage.getItem('ranking');
    if (rankingTest === null) localStorage.setItem('ranking', JSON.stringify([]));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const newPlayer = {
      name: player.name,
      score: player.score,
      picture: fetchGravatarImage(player.gravatarEmail),
    };
    ranking.push(newPlayer);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  renderInitialPage() {
    window.location.href = '/';
  }

  render() {
    const { allPlayers } = this.state;
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <ul>
          {allPlayers.sort((a,b) => b.score - a.score)
            .map((player, index) => (
              <li
                key={ index }
              >
                <img
                  src={ player.picture }
                  alt="your avatar"
                />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </li>))}
        </ul>
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
