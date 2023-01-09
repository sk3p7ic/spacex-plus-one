import { useQuery, gql, DocumentNode } from "@apollo/client";
import {
  createStyles,
  Alert,
  Card,
  Title,
  Badge,
  Space,
  Container,
  Text,
  List,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useLoaderData } from "react-router-dom";

/** Loader function for `react-router-dom` that returns the query needed to
 * serve the page with a given `siteId`.
 */
export const loader = ({ params }: any) => {
  return gql`
  {
    launchpad(id: "${params.siteId}") {
      attempted_launches
      details
      location {
        latitude
        longitude
        name
        region
      }
      name
      status
      successful_launches
      wikipedia
    }
  }
  `;
};

const useStyles = createStyles((theme) => ({
  loadingErrorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  cardImage: {
    width: "100%",
    height: "auto",
  },

  cardTitle: {
    display: "flex",
    flexDirection: "column",
  },
}));

export const SitePage = () => {
  const { loading, error, data } = useQuery(useLoaderData() as DocumentNode);
  const { classes } = useStyles();

  if (loading) return <div className={classes.loadingErrorDiv}>Loading...</div>;
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
          {error?.message}
        </Alert>
      </div>
    );

  const site = data.launchpad;
  return (
    <main>
      <Space h="lg" />
      <Container>
        <Card>
          <div className={classes.cardTitle}>
            <Title>{site.name}</Title>
            <Badge style={{ width: "fit-content" }}>{site.status}</Badge>
          </div>
          <Text>{site.details}</Text>
          <List>
            <List.Item>
              <strong>Attempted Launches:</strong> {site.attempted_launches}
            </List.Item>
            <List.Item>
              <strong>Successful Launches:</strong> {site.successful_launches}
            </List.Item>
            <List.Item>
              <strong>Wikipedia Page:</strong>{" "}
              <a
                href={site.wikipedia}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {site.wikipedia}
              </a>
            </List.Item>
            <List.Item>
              <Text>Location Information</Text>
              <List>
                <List.Item>
                  <strong>Name:</strong> {site.location.name}
                </List.Item>
                <List.Item>
                  <strong>Region:</strong> {site.location.region}
                </List.Item>
                <List.Item>
                  <strong>Latitude:</strong> {site.location.latitude}
                </List.Item>
                <List.Item>
                  <strong>Longitude:</strong> {site.location.longitude}
                </List.Item>
              </List>
            </List.Item>
          </List>
        </Card>
      </Container>
    </main>
  );
};
