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

  return (
    <Card>
      <div className={classes.cardTitle}>
        <Title order={3}>{launch.missionName}</Title>
        <Group>
          {launch.rocket.secondStage.payloads.map((payload) => (
            <Badge key={payload.payloadType}>{payload.payloadType}</Badge>
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
            <strong>Launch Site:</strong> {launch.launchSite.siteNameLong}
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
                  <List.Item key={ship.name}>{ship.name}</List.Item>
                ))
              ) : (
                <List.Item>
                  <Text fs="italic">No ship data available.</Text>
                </List.Item>
              )}
            </List>
          </List.Item>
        </List>
      </Container>
    </Card>
  );
};
