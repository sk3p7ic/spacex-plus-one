import { useQuery, gql } from "@apollo/client";
import {
  createStyles,
  Group,
  MediaQuery,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import CountUp from "react-countup";
import SpaceXBg from "../assets/img/spacex_bg.jpg";
import {
  NextLaunch,
  type BasicLaunchNotficationInfo,
} from "../components/Home/NextLaunch";

/** Defines the query to gather the needed information about the company. */
const GET_CEO = gql`
  {
    company {
      employees
      valuation
      launch_sites
      summary
    }
    launchNext {
      mission_name
      launch_date_utc
      details
    }
  }
`;

/** Defines the set of style classes that may be applied to the components
 * below.
 */
const useStyles = createStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundImage: `url(${SpaceXBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },

  hero: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: `${theme.spacing.md}px`,
    backgroundColor: `${theme.colors.dark[7]}BF`,
    paddingLeft: `${theme.spacing.sm}px`,
    paddingRight: `${theme.spacing.sm}px`,
    textAlign: "center",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      alignItems: "start",
      textAlign: "left",
    },
  },

  title: {
    fontSize: "4rem",
  },

  highlight: {
    fontWeight: "bold",
    fontSize: `${theme.fontSizes.xl}px`,
  },

  credit: {
    backgroundColor: `${theme.colors.dark[7]}BF`,
  },
}));

/** Defines a formatter that may be used to format currency, in USD. */
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const HomePage = () => {
  const { classes } = useStyles();
  const { loading, error, data } = useQuery(GET_CEO);
  const [showNextLaunch, setShowNextLaunch] = useState<boolean>(true);
  if (loading) return <div>Loading</div>; // TODO: Better loading message.
  if (error) return <div>Error: {error.message}</div>; // TODO: Prettier error message.

  const mission: BasicLaunchNotficationInfo = {
    missionName: data.launchNext.mission_name,
    launchDate: new Date(data.launchNext.launch_date_utc),
    details: data.launchNext.details,
  };

  return (
    <div className={classes.page}>
      <div className={classes.hero}>
        <Title className={classes.title}>SpaceX Lookup</Title>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Group>
            <Text>
              <CountUp
                start={0}
                end={data.company.launch_sites}
                duration={3}
                className={classes.highlight}
              />{" "}
              Active Launch Sites
            </Text>
            <Text>
              <CountUp
                start={0}
                end={data.company.employees}
                duration={3}
                className={classes.highlight}
              />{" "}
              Employees
            </Text>
            <Text>
              <CountUp
                start={0}
                end={data.company.valuation}
                duration={3}
                formattingFn={formatter.format}
                className={classes.highlight}
              />{" "}
              Valuation
            </Text>
          </Group>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Stack>
            <Text>
              <CountUp
                start={0}
                end={data.company.launch_sites}
                duration={3}
                className={classes.highlight}
              />{" "}
              Active Launch Sites
            </Text>
            <Text>
              <CountUp
                start={0}
                end={data.company.employees}
                duration={3}
                className={classes.highlight}
              />{" "}
              Employees
            </Text>
            <Text>
              <CountUp
                start={0}
                end={data.company.valuation}
                duration={3}
                formattingFn={formatter.format}
                className={classes.highlight}
              />{" "}
              Valuation
            </Text>
          </Stack>
        </MediaQuery>
        <Text>{data.company.summary}</Text>
      </div>
      <Text ta="center" size="xs" className={classes.credit}>
        Photo credit,{" "}
        <a href="https://www.flickr.com/photos/spacex/52475966140/">
          SpaceX on Flickr
        </a>
        .
      </Text>
      {showNextLaunch && (
        <NextLaunch
          mission={mission}
          onClose={() => setShowNextLaunch(false)}
        />
      )}
    </div>
  );
};
