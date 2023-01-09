import { useQuery, gql, DocumentNode } from "@apollo/client";
import {
  createStyles,
  Alert,
  Space,
  Title,
  Container,
  Card,
  Badge,
  Grid,
  List,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useLoaderData } from "react-router-dom";

/** Loader function for `react-router-dom` that returns the query needed to
 * serve the page with a given `shipId`.
 */
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
      successful_landings
      roles
      attempted_landings
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
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
}));

export const ShipPage = () => {
  const { loading, error, data } = useQuery(useLoaderData() as DocumentNode);
  const { classes } = useStyles();
  if (loading) return <div className={classes.loadingErrorDiv}>Loading...</div>;
  if (error || data.ships.length === 0)
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

  const ship = data.ships[0];
  return (
    <main>
      <Space h="lg" />
      <Container>
        <Card>
          {ship.image && (
            <Card.Section>
              <img
                src={ship.image}
                alt="Image of the ship."
                className={classes.cardImage}
              />
              <Space h="md" />
            </Card.Section>
          )}
          <div className={classes.cardTitle}>
            <Title>
              {ship.name} ({ship.year_built})
            </Title>
            <Badge>{ship.type}</Badge>
          </div>
          <Grid>
            {ship.roles.map((role: string) => (
              <Grid.Col key={role}>
                <Badge variant="outline">{role}</Badge>
              </Grid.Col>
            ))}
          </Grid>
          <List>
            {ship.status && (
              <List.Item>
                <strong>Status:</strong> {ship.status}
              </List.Item>
            )}
            {ship.url && (
              <List.Item>
                <strong>More Info:</strong>{" "}
                <a href={ship.url} target="_blank" referrerPolicy="no-referrer">
                  {ship.url}
                </a>
              </List.Item>
            )}
            <List.Item>
              <strong>Home Port:</strong> {ship.home_port}
            </List.Item>
            {ship.attempted_landings && (
              <List.Item>
                <strong>Attempted Landings:</strong> {ship.attempted_landings}
              </List.Item>
            )}
            {ship.successful_landings && (
              <List.Item>
                <strong>Successful Landings:</strong> {ship.successful_landings}
              </List.Item>
            )}
          </List>
        </Card>
      </Container>
    </main>
  );
};
