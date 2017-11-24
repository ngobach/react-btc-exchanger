import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Note = ({ note : { text }}) => {
  return (
    <h3><i className="fa fa-eercast" aria-hidden="true"></i> {text}</h3>
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
