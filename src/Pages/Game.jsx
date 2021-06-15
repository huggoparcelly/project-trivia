import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../Components/Header';
import trivia from '../actions';
import fetchTrivia from '../services/fetchTrivia';

class Game extends Component {
  constructor(props){
    super(props);
    this.saveTriviaOnGlobalState = this.saveTriviaOnGlobalState.bind(this);
    this.changePageMode = this.changePageMode.bind(this);
    this.state={
      mode: 'initialpage',
    }
  }

  componentDidMount(){
    this.saveTriviaOnGlobalState();
  }

  async saveTriviaOnGlobalState() {
    const {dispatchTrivia} = this.props;
    const trivia = await fetchTrivia();
    dispatchTrivia(trivia);
  }

  changePageMode() {
    this.setState({mode: 'game'});
  }

  renderInitialPage() {
    return (
      <div>
        <Header />
        <h1>JOGO</h1>
        <button type="button">Começar</button>
      </div>
    )
  }

  renderGame() {
    return(
      <div>
        <h1>JOGO AQUI</h1>
      </div>
    )
  }

  render() {
    const {mode} = this.state
    return (
      <div>
        {mode === 'game' ? this.renderGame : this.renderInitialPage}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia = (state) => dispatch(trivia(state)),
});

export default connect(null, mapDispatchToProps)(Game);
