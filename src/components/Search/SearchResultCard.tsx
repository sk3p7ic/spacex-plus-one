import {
  Badge,
  Card,
  Group,
  Title,
  createStyles,
  Text,
  Container,
  List,
  HoverCard,
  Button,
} from "@mantine/core";
import { type LaunchesPastType } from "../../lib/searches/launchesPast";

const useStyles = createStyles((theme) => ({
  cardTitle: {
    display: "flex",
    flexDirection: "column",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },

  rocketInfoHoverCard: {
    backgroundColor: theme.colors.dark[4],
  },
}));

type SearchResultCardProps = {
  launch: LaunchesPastType;
};

export const SearchResultCard = ({ launch }: SearchResultCardProps) => {
  const { classes } = useStyles();

  const validShips = launch.ships.filter((ship) => ship.id !== "");
  launch = { ...launch, ships: validShips };

  return (
    <Card>
      <div className={classes.cardTitle}>
        <Title order={3}>{launch.missionName}</Title>
        <Group>
          {launch.rocket.secondStage.payloads.map((payload, idx) => (
            <Badge key={idx}>{payload.payloadType}</Badge>
          ))}
        </Group>
      </div>

      {launch.details && <Text>{launch.details}</Text>}

      <Container>
        <Title order={5}>Details:</Title>
        <List>
          <List.Item>
            <strong>Launch Date:</strong> {launch.launchDate.toDateString()},{" "}
            {launch.launchDate.toTimeString()}
          </List.Item>

          <List.Item>
            <strong>Launch Site:</strong>{" "}
            <a href={`/sites/${launch.launchSite.siteId}`}>
              {launch.launchSite.siteNameLong}
            </a>
          </List.Item>

          <List.Item>
            <HoverCard width="100%" shadow="md" withArrow={true}>
              <HoverCard.Target>
                <Text>
                  <strong>Rocket:</strong>{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {launch.rocket.rocketName}
                  </span>
                </Text>
              </HoverCard.Target>
              <HoverCard.Dropdown className={classes.rocketInfoHoverCard}>
                {launch.rocket.rocket.description}
              </HoverCard.Dropdown>
            </HoverCard>
          </List.Item>

          <List.Item>
            <strong>Ships:</strong>
            <List>
              {launch.ships.length > 0 ? (
                launch.ships.map((ship) => (
                  <List.Item key={ship.name}>
                    <a href={`/ships/${ship.id}`}>{ship.name}</a>
                  </List.Item>
                ))
              ) : (
                <List.Item>
                  <Text fs="italic">No ship data available.</Text>
                </List.Item>
              )}
            </List>
          </List.Item>
        </List>
        <Group>
          {launch.links.articleLink && (
            <Button
              component="a"
              href={launch.links.articleLink}
              variant="outline"
              size="xs"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              View Article
            </Button>
          )}
          {launch.links.videoLink && (
            <Button
              component="a"
              href={launch.links.videoLink}
              variant="outline"
              size="xs"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              View Video
            </Button>
          )}
        </Group>
      </Container>
    </Card>
  );
};
