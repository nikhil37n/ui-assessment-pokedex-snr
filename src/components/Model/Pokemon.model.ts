export type PokemonList = {
  id: string;
  name: string;
  number: string;
  types: [string];
  image: string;
};

export type GetPokemonDetailsPayload = {
  id: string;
  name: string;
};

export interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: any;
  currentPage: number;
  loading: boolean;
}
