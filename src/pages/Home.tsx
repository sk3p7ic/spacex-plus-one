import { useQuery, gql } from "@apollo/client";
import { Alert, createStyles, Text, Title } from "@mantine/core";
import { IconAlertCircle, IconRocket } from "@tabler/icons";
import { useState } from "react";
import SpaceXBg from "../assets/img/spacex_bg.jpg";
import {
  CompanyInfo,
  GroupCompanyStatCounters,
} from "../components/Home/CompanyStatCounters";
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
  loadingErrorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
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

export const HomePage = () => {
  const { classes } = useStyles();
  const { loading, error, data } = useQuery(GET_CEO);
  const [showNextLaunch, setShowNextLaunch] = useState<boolean>(true);
  if (loading)
    return (
      <div className={classes.loadingErrorDiv}>
        <IconRocket size={64} />
      </div>
    ); 
  if (error)
    return (
      <div className={classes.loadingErrorDiv}>
        <Alert
          icon={<IconAlertCircle size={18} />}
          title="Something went wrong!"
          color="red"
          withCloseButton
          closeButtonLabel="Close this message."
        >
          {error.message}
        </Alert>
      </div>
    ); 

  // Stores information about the next launch
  const mission: BasicLaunchNotficationInfo = {
    missionName: data.launchNext.mission_name,
    launchDate: new Date(data.launchNext.launch_date_utc),
    details: data.launchNext.details,
  };

  // Stores information about the company
  const companyInfo: CompanyInfo = {
    employees: data.company.employees,
    launch_sites: data.company.launch_sites,
    valuation: data.company.valuation,
  };

  return (
    <div className={classes.page}>
      <div className={classes.hero}>
        <Title className={classes.title}>SpaceX Lookup</Title>
        <GroupCompanyStatCounters
          company={companyInfo}
          classes={{ highlight: classes.highlight }}
        />
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
