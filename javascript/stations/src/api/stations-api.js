import { gql } from '@apollo/client';

const STATIONS = gql`
  query GetStations {
    stations {
      station_ID
      name
    }
  }
`;

export {STATIONS};