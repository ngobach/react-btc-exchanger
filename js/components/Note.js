import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Note = ({ note : { text }, onRemove}) => {
  return (
    <div className="box">
      <h3>
        {text}
        <button className="delete is-pulled-right" onClick={onRemove}></button>
      </h3>
    </div>
  );
};

export default createFragmentContainer(
  Note,
  graphql`
    fragment Note_note on Note {
      text
    }
  `
);
