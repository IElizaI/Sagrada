import React, { useState } from 'react';
import StainedGlassflip from '../StainedGlassflip/StainedGlassflip';
import './ChoiceStainedGlass.css';
import { getApiUrl, StainedGlass } from '../../../../constans/constans';
import { useDispatch, useSelector } from 'react-redux';
import { setStainedGlass } from '../../../../store/actions/player';
import axios from 'axios';
const ChoiceStainedGlass = () => {
  const dispatch = useDispatch();
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);
  let [patternSelection, setPatternSelection] = useState(true);
  const stainedGlassChoice = useSelector(
    (state) => state.player.stainedGlassChoice
  );

  if (!stainedGlassChoice?.length) {
    return null;
  }

  const patterns = StainedGlass.filter(({ id }) =>
    stainedGlassChoice.includes(id)
  );

  const handleTakeStainedGlass = async (id) => {
    const response = await axios.post(
      getApiUrl('/game/pattern/select'),
      {
        gameId: lobby.id,
        playerId: user.id,
        patternId: id,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      setPatternSelection(false);
      dispatch(setStainedGlass(id));
    }
  };

  return (
    <div className="container-choice-stained-glass">
      {patternSelection ? (
        <>
          <div>
            <StainedGlassflip
              onSelect={handleTakeStainedGlass}
              stainedGlass={patterns[0]}
            />
          </div>
          <div>
            <StainedGlassflip
              onSelect={handleTakeStainedGlass}
              stainedGlass={patterns[1]}
            />
          </div>
        </>
      ) : (
        'Идет выбор витражей'
      )}
    </div>
  );
};

export default ChoiceStainedGlass;
