import { Button, Container, createStyles, Input, Title } from "@mantine/core";
import { useQuery } from "@apollo/client";
import {
  getLaunchesLastQuery,
  dataToLaunchType,
} from "../lib/searches/launchesPast";

const useStyles = createStyles((theme) => ({
  page: {
    paddingLeft: `${theme.spacing.sm}px`,
    paddingRight: `${theme.spacing.sm}px`,
  },

  searchForm: {
    display: "flex",
    flexDirection: "column",
    gap: `${theme.spacing.sm}px`,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
}));

export const SearchPage = () => {
  const { loading, error, data } = useQuery(getLaunchesLastQuery(10));
  const { classes } = useStyles();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  const launches = dataToLaunchType(data);
  console.log(launches);

  return (
    <main className={classes.page}>
      <Container>
        <Title ta="center">Search</Title>
        <div className={classes.searchForm}>
          <Input variant="filled" placeholder="Enter mission name." />
          <Button>Search</Button>
        </div>
      </Container>
    </main>
  );
};
