import { useState, useEffect, useRef } from "react";
import {
  Button,
  Center,
  Container,
  createStyles,
  Input,
  Pagination,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import {
  getLaunchesPastQuery,
  dataToLaunchType,
  type LaunchesPastType,
} from "../lib/searches/launchesPast";
import { SearchResultCard } from "../components/Search/SearchResultCard";
import {
  getLaunchesByNameQuery,
  searchDataToLaunchType,
} from "../lib/searches/launchesByName";

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
  // Stores the list of missions (launches) that will be displayed to the user
  const [missions, setMissions] = useState<LaunchesPastType[]>([]);
  // Sets the current page number of missions to display
  const [page, setPage] = useState(1);
  // Sets if the user is currently attempting to search for a mission by name
  const [searchMode, setSearchMode] = useState(false);
  // Stores a reference to the input where the user enters their search term
  const searchTermRef = useRef<HTMLInputElement | null>(null);

  /** Gets the search term that the user has entered. */
  const getTerm = () => {
    if (!searchTermRef) return "";
    return searchTermRef.current?.value || "";
  };

  // Attempt to query either the search data or past launch data from the API
  const { loading, error, data } = useQuery(
    searchMode
      ? getLaunchesByNameQuery(getTerm())
      : getLaunchesPastQuery(10, page - 1)
  );
  const { classes } = useStyles();

  useEffect(() => {
    if (data)
      setMissions(
        searchMode ? searchDataToLaunchType(data) : dataToLaunchType(data)
      );
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading)
    return (
      <main className={classes.page}>
        <Container>
          <Title ta="center">Search Missions</Title>
          <div className={classes.searchForm}>
            <Input variant="filled" placeholder="Enter mission name." />
            <Button>Search</Button>
          </div>
          <Space h="sm" />
          <Pagination
            total={11}
            page={page}
            onChange={(p) => handlePageChange(p)}
            position="center"
          />
          <Space h="sm" />
          <Text>Loading...</Text>
        </Container>
      </main>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className={classes.page}>
      <Container>
        <Title ta="center">Search Missions</Title>
        <div className={classes.searchForm}>
          <Input
            variant="filled"
            placeholder="Enter mission name."
            ref={searchTermRef}
          />
          <Button
            onClick={() => {
              setSearchMode(true);
            }}
          >
            Search
          </Button>
        </div>
        <Space h="sm" />
        {searchMode ? (
          <>
            <Center>
              <Button
                color="red"
                onClick={() => {
                  setSearchMode(false);
                }}
              >
                Clear Search
              </Button>
            </Center>
            <Space h="sm" />
            <Stack spacing="lg">
              {missions.map((launch, idx) => (
                <SearchResultCard launch={launch} key={idx} />
              ))}
            </Stack>
          </>
        ) : (
          <>
            <Pagination
              total={11}
              page={page}
              onChange={(p) => handlePageChange(p)}
              position="center"
            />
            <Space h="sm" />
            <Stack spacing="lg">
              {missions.map((launch) => (
                <SearchResultCard launch={launch} key={launch.id} />
              ))}
            </Stack>
            <Space h="sm" />
            <Pagination
              total={11}
              page={page}
              onChange={(p) => handlePageChange(p)}
              position="center"
            />
          </>
        )}
        <Space h="xl" />
      </Container>
    </main>
  );
};
