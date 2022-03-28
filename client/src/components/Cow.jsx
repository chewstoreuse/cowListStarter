import React from 'react';

const Cow = (props) => (
  <div onClick={() => props.onSpotlightClick(props.cow.name)}>
    {props.cow.name}
  </div>
);

export default Cow;