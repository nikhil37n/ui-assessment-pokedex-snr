import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

export const Pokemon = ({ pokemon }) => {
  const classes = useStyles();
  return (
    <Link to={`/details/${pokemon?.id}`} state={pokemon}>
      <div className={classes.pokemon}>
        <div className={classes.pokemon__name}>
          <p>{pokemon?.name}</p>
          <p># {pokemon?.number}</p>
        </div>
        <div>
          <img
            className={classes.img}
            src={pokemon?.image}
            alt={pokemon?.name}
          />
        </div>
        <div className={classes.pokemon__type}>
          {pokemon?.types.map((type, i) => (
            <span className={classes.type} key={type + '_' + i}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const useStyles = createUseStyles(
  {
    pokemon: {
      maxWidth: '200px',
      maxHeight: '290px',
      backgroundClip: 'border-box',
      border: '1px solid rgba(0,255,255,0.5)',
      borderRadius: '0.25rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      overflow: 'hidden',
      marginBottom: '20px',
      marginRight: '20px',
      transition: 'transform .7s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.1)',
        boxShadow: '0 0 20px rgba(0,255,255,0.5)',
      },
    },
    pokemon__name: {
      backgroundColor: 'darkslategray',
      textAlign: 'center',
      padding: '0 10px',
      display: 'flex',
      justifyContent: 'space-between',
      textTransform: 'uppercase',
      fontWeight: 700,
      letterSpacing: '1px',
      textShadow: '0px 1px 2px rgba(0, 0, 0, .4)',
      fontSize: '15px',
    },
    pokemon__number: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: 'white',
      letterSpacing: '4px',
      textShadow: '0px 1px 2px rgba(0, 0, 0, 0.4)',
    },
    img: {
      width: '100%',
      aspectRatio: '1/1',
    },
    pokemon__type: {
      display: 'flex',
      paddingLeft: '10px',
      paddingRight: '10px',
      justifyContent: 'center',
      backgroundColor: 'darkslategray',
      textShadow: '0px 1px 2px rgba(0, 0, 0, .4)',
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
    type: {
      width: '50%',
      backgroundColor: 'darkslategray',
      borderRadius: '3px',
      padding: '7px',
      fontWeight: '700',
      color: '#fff',
      paddingLeft: '10px',
      paddingRight: '10px',
      fontSize: '12px',
      marginBottom: '10px',
      wordWrap: 'break-word',
      textAlign: 'center',
      lineHeight: '20px',
    },
  },
  { name: 'Pokemon' }
);
