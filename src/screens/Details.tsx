import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonDetails } from '../components/PokemonDetails';

export const Details = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonDetails />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'DetailsPage' }
);
