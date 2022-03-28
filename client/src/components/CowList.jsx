import React from 'react';
import Cow from './Cow.jsx';

const CowList = (props) => (
  <div className='cow-list'>
    <h2>Cows:</h2>
    {props.cows.map((cow, i) =>
      <Cow cow={cow} onSpotlightClick={props.onSpotlightClick} key={i} />
    )}
  </div>
);

export default CowList;