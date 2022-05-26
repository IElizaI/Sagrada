import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../constans/constans';
import socket from '../../features/socket';
import { setLobbies } from '../../store/actions/lobbies';
import { setLobby } from '../../store/actions/lobby';
import NavBar from '../NavBar/NavBar';
import './Lobbies.css';

const Lobbies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lobbies = useSelector((state) => state.lobbies);
  const loadLobbies = async () => {
    const response = await axios.get(getApiUrl('/game/lobbies'));

    if (response.status === 200) {
      dispatch(setLobbies(response.data));
    }
  };

  useEffect(() => {
    loadLobbies();

    socket.join('lobbies', () => {
      loadLobbies();
    });
  }, []);

  const onPlayClick = async () => {
    const response = await axios.post(
      getApiUrl('/game/lobby/create'),
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(setLobby(response.data));
    navigate('/lobby/' + response.data.id);
  };

  return (
    <>
      <NavBar />
      <div className="container-lobbies">
        <ol className="lobbies-list">
          {lobbies.map((lobby) => (
            <li>
              <p>
                <Link
                  className="lobbies-btn-text"
                  to={'/lobby/' + lobby.id}
                  key={lobby.id}
                >
                  {lobby.creator.login}'s lobby (#{lobby.id})
                </Link>
              </p>
            </li>
          ))}
        </ol>

        <div className="lobbies-btn-div">
          <button className="lobbies-btn" onClick={onPlayClick}>
            <div>Создать лобби</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Lobbies;
