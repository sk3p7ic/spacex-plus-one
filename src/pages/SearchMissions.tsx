import { useState, useEffect } from "react";
import {
  Button,
  Container,
  createStyles,
  Input,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import {
  getLaunchesLastQuery,
  dataToLaunchType,
  type LaunchesPastType,
} from "../lib/searches/launchesPast";
import { SearchResultCard } from "../components/Search/SearchResultCard";

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

export const SearchMissionsPage = () => {
  const [missions, setMissions] = useState<LaunchesPastType[]>([]);
  const { loading, error, data } = useQuery(getLaunchesLastQuery(10));
  const { classes } = useStyles();

  useEffect(() => {
    if (data) setMissions(dataToLaunchType(data));
  }, [data]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className={classes.page}>
      <Container>
        <Title ta="center">Search Missions</Title>
        <div className={classes.searchForm}>
          <Input variant="filled" placeholder="Enter mission name." />
          <Button>Search</Button>
        </div>
        <Space h="lg" />
        <Stack spacing="lg">
          {missions.map((launch) => (
            <SearchResultCard launch={launch} key={launch.id} />
          ))}
        </Stack>
      </Container>
    </main>
  );
};
