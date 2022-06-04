import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../../features/socket';
import { loadLobby } from '../../../store/actions/lobby';
import classes from './Players.module.css';
import axios from 'axios';
import {
  setstainedGlassForChoice,
  setLogin,
} from '../../../store/actions/player';
import { setPlayers } from '../../../store/actions/game';
import NavBar from '../../NavBar/NavBar';
import { getApiUrl } from '../../../constans/constans';

const Players = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);

  const exitFromLobby = () => {
    axios.post(
      getApiUrl('/game/lobby/exit'),
      { id: Number(params.id) },
      { withCredentials: true }
    );
  };

  useEffect(() => {
    dispatch(loadLobby(params.id));
    socket.join('lobby_' + params.id, (message) => {
      if (message.type === 'GAME_STARTED') {
        const { players, patternsForSelection } = message.data;
        const otherGames = players.filter((gamer) => gamer.id !== user.id);
        dispatch(setstainedGlassForChoice(patternsForSelection[user.id]));
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
    await axios.post(
      getApiUrl('/game/create/'),
      {
        gameId: params.id,
      },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <>
      <NavBar />
      <ol className={classes.rounded}>
        {lobby.players.map((player) => (
          <li key={player.id}>
            <p className={classes.playerLogin}>{player.login}</p>
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
