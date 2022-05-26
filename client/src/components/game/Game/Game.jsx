import React, { useEffect } from 'react';
import './Game.css';
import Counter from '../Counter/Counter';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GoalAndToolButtons from '../GoalAndToolButtons/GoalAndToolButtons';
import ChoiceStainedGlass from '../playersZone/ChoiceStainedGlass/ChoiceStainedGlass';
import { useDispatch, useSelector } from 'react-redux';
import RollDiceBtn from '../RollDiceBtn/RollDiceBtn';
import PlayerZone from '../playersZone/PlayerZone/PlayerZone';
import socket from '../../../features/socket';
import {
  setPlayers,
  setRounds,
  setDroppedСubes,
  setActivePlayer,
  setPlayerPattern,
  removeGame,
  setCommonGoals,
} from '../../../store/actions/game';
import {
  resetRaisedCube,
  setCurrentPlayerPattern,
  removePlayer,
  setPersonalGoal,
} from '../../../store/actions/player';
import { removeLobby } from '../../../store/actions/lobby';
import Scoring from '../Scoring/Scoring';

const Game = () => {
  const stateStainedGlass = useSelector((state) => state.player.stainedGlass);
  const params = useParams();
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);
  const gamePlayers = useSelector((state) => state.game.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rounds = useSelector((state) => state.game.rounds);
  let gameOver;

  useEffect(() => {
    socket.join('game_' + params.id, (message) => {
      if (message.type === 'PLAYERS_SELECTED_PATTERNS') {
        dispatch(
          setPlayers(
            message.data.players
              .filter((player) => player.id !== user.id)
              .map((player) => {
                return {
                  ...player,
                  pattern: message.data.patterns[player.id],
                };
              })
          )
        );
        message.data.players.forEach((player) => {
          if (player.id === user.id) {
            dispatch(setPersonalGoal(player.personalGoal));
          }
        });
        dispatch(setCommonGoals(message.data.commonGoals));

        dispatch(setRounds(message.data.rounds));
        dispatch(setDroppedСubes(message.data.reserve));
        dispatch(setActivePlayer(message.data.activePlayer));
      }
      if (message.type === 'PUT_CUBE_FOR_STAINED_GLASS') {
        const { pattern, activePlayer, reserve, rounds } = message.data;
        const player = message.initiator;
        if (player === user.id) {
          dispatch(setCurrentPlayerPattern(pattern));
          dispatch(resetRaisedCube());
        } else {
          dispatch(setPlayerPattern({ player, pattern }));
        }

        dispatch(setActivePlayer(activePlayer));
        dispatch(setDroppedСubes(reserve));
        dispatch(setRounds(rounds));
      }
      if (message.type === 'GAME_OVER') {
        console.log('GAME_OVER', message.data);
        dispatch(setRounds(message.data.rounds));
        dispatch(setDroppedСubes(message.data.reserve));
        if (message.initiator === user.id) {
          dispatch(setCurrentPlayerPattern(message.data.pattern));
        } else {
          dispatch(
            setPlayerPattern({
              player: message.initiator,
              pattern: message.data.pattern,
            })
          );
        }
        // return <Scoring></Scoring>;
      }
    });
  }, []);

  const handleExitGame = () => {
    dispatch(removeGame());
    dispatch(removePlayer());
    dispatch(removeLobby());
    navigate('/');
  };

  return (
    <>
      <div className="game-page">
        <div className="game-img-div">
          {/* <img src={img} alt="sagrada-img" className={classes.gameImg} /> */}
          <div className="nav">
            <div onClick={handleExitGame}>Выйти из игры</div>
            <p>{lobby ? `Игра: ${lobby.id}` : 'id игры'}</p>
            <p>{user.login}</p>
          </div>
          <Counter />
          {/* <ButtonCommonGoals />
          <ButtonPersonalGoal /> */}
          <GoalAndToolButtons />
          {/* <ActivePlayerCaption /> */}
          <RollDiceBtn />
          {!stateStainedGlass ? <ChoiceStainedGlass /> : <PlayerZone />}
          {rounds.length === 10 ? <Scoring></Scoring> : ''}
        </div>
      </div>
    </>
  );
};

export default Game;
