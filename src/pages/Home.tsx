import {useQuery, gql} from "@apollo/client";

const GET_CEO = gql`
{
  company {
    ceo
  }
}
`

export const HomePage = () => {
  const {loading, error, data} = useQuery(GET_CEO);
  if (loading) return <div>Loading</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>Home {data.company.ceo}</div>
}
