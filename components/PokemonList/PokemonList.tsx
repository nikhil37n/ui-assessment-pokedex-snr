import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Pokemon } from '../Pokemon/Pokemon';
import Pagination from '../Pagination/Pagination';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // To Search & Filter Posts
  const [searchItem, setSearchItem] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(pokemons);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = pokemons.slice(firstPostIndex, lastPostIndex);

  // To search pokemon on input change
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    const filteredItems = pokemons?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filteredItems);
  };

  // Render list of Pokemons
  const renderPokemons = () => {
    if (searchItem && searchItem?.length > 0) {
      return filteredPosts.map((pokemon) => {
        return <Pokemon pokemon={pokemon} key={pokemon?.id} />;
      });
    } else {
      return currentPosts.map((pokemon) => {
        return <Pokemon pokemon={pokemon} key={pokemon?.id} />;
      });
    }
  };

  return (
    <div className={classes.flex}>
      {!loading && (
        <input
          className={classes.searchbox}
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
        />
      )}

      <div className={classes.root}>
        {loading && <div className={classes.loading}>Loading...</div>}
        {renderPokemons()}

        <Pagination
          totalPosts={pokemons?.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '10px',
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    searchbox: {
      color: '#333',
      height: '25px',
      width: '200px',
      marginTop: '33px',
      marginLeft: '15px',
      fontSize: '14px',
      outline: 'none',
      fontWeight: 600,
    },
    loading: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50px, -50px)',
      color: '#fff',
      fontSize: '20px',
      textTransform: 'uppercase',
    },
  },
  { name: 'PokemonList' }
);
