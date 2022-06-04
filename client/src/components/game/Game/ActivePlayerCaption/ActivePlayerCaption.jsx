import { useSelector } from 'react-redux';
import './ActivePlayerCaption.css';

const ActivePlayerCaption = () => {
  const userId = useSelector((state) => state.user.id);
  const activePlayer = useSelector((state) => state.game.activePlayer);
  const players = useSelector((state) => state.game.players);

  if (userId === activePlayer) {
    return <div className="active-player current">Выберите кубик</div>;
  }

  const otherPlayer = players ? players.find(({ id }) => activePlayer) : '';

  if (otherPlayer) {
    return (
      <div className="active-player">Кубик выбирает: {otherPlayer.login}</div>
    );
  }
  return null;
};

export default ActivePlayerCaption;
