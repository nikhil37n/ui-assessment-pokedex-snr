import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GetPokemonDetailsPayload } from "../components/Model/Pokemon.model";

export type PokemonDetails = {
  id: string;
  name: string;
  number: string;
  types: [string];
  image: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  maxCP: number;
  maxHP: number;
  resistant: [string];
  weaknesses: [string];
  classification: string;
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = ({
  id,
  name,
}: GetPokemonDetailsPayload) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      id: id,
      name: name,
    },
  });

  const pokemon: PokemonDetails = useMemo(() => data?.pokemon || {}, [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
