import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import socket from '../../../features/socket';
import { loadLobby } from '../../../store/actions/lobby';
import Game from '../Game/Game';
import classes from './Players.module.css';
import axios from 'axios';
import {
  setstainedGlassForChoice,
  setLogin,
} from '../../../store/actions/player';
import { setPlayers } from '../../../store/actions/game';

const Players = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);
  console.log(user);

  const exitFromLobby = () => {
    const response = axios.post(
      'http://localhost:3001/game/lobby/exit',
      { id: Number(params.id) },
      { withCredentials: true }
    );
  };

  useEffect(() => {
    console.log('params', params);
    dispatch(loadLobby(params.id));
    socket.join('lobby_' + params.id, (message) => {
      if (message.type === 'GAME_STARTED') {
        console.log(message);
        const { players, patternsForSelection } = message.data;
        const otherGames = players.filter((gamer) => gamer.id !== user.id);
        dispatch(setstainedGlassForChoice(patternsForSelection[user.id]));
        console.log(otherGames.length);
        if (otherGames.length) {
          dispatch(setPlayers(otherGames));
        }
        dispatch(setLogin(user.login));
        navigate('/game/' + params.id);
      }
      if (message.type === 'UPDATE_LOBBY') {
        if (message.initiator !== user.id) {
          dispatch(loadLobby(params.id));
        }
      }
    });

    return () => {
      socket.exit('lobby_' + params.id);
      exitFromLobby();
    };
  }, []);

  if (!lobby.players) return <div>Not Found</div>;

  const handleCreateGame = async () => {
    const response = await axios.post(
      'http://localhost:3001/game/create/',
      {
        gameId: params.id,
      },
      {
        withCredentials: true,
      }
    );

    console.log('kjkjk', response.data);
  };

  return (
    <>
      <div className={classes.topnav}>
        <Link to="/">На главную</Link>
        <p>{lobby ? `Игра: ${lobby.id}` : 'id игры'}</p>
        <p>{user.login}</p>
      </div>
      <ol className={classes.rounded}>
        {lobby.players.map((player) => (
          <li key={player.id}>
            <p>{player.login}</p>
          </li>
        ))}
      </ol>
      {user.id === lobby.creator.id && (
        <div className={classes.btnDiv}>
          <button className={classes.btn} onClick={handleCreateGame}>
            <div>Начать игру</div>
          </button>
        </div>
      )}
    </>
  );
};

export default Players;
