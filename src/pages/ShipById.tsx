import { useQuery, gql, DocumentNode } from "@apollo/client";
import { useLoaderData } from "react-router-dom";

export const loader = ({ params }: any) => {
  return gql`
  {
    ships(find: {id: "${params.shipId}"}) {
      name
      home_port
      image
      url
      type
      year_built
      status
    }
  }
  `;
};

export const ShipPage = () => {
  const { loading, error, data } = useQuery(useLoaderData() as DocumentNode);
  if (loading) return <div>Loading...</div>;
  if (error || data.ships.length === 0)
    return <div>Error: {error?.message}</div>;

  const ship = data.ships[0];
  return <div>{ship.name}</div>;
};
