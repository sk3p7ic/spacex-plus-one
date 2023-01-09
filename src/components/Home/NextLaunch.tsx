import { createStyles, MediaQuery, Notification, Text } from "@mantine/core";
import { IconRocket } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  notification: {
    position: "fixed",
    top: `${60 + theme.spacing.sm}px`,
    left: "50%",
    transform: "translateX(-50%)",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      minWidth: "90%",
    },
  },
}));

export type BasicLaunchNotficationInfo = {
  missionName: string;
  launchDate: Date;
  details: string;
};

type NextLaunchProps = {
  mission: BasicLaunchNotficationInfo;
  onClose: () => void;
};

export const NextLaunch = ({ mission, onClose }: NextLaunchProps) => {
  const { classes } = useStyles();

  /**
   * Truncates text to a given length.
   * @param len The number of words to display before truncating the text.
   * @returns A string containing the truncated text, with ellipses included.
   */
  const truncateText = (len: number): string =>
    mission.details.split(" ").slice(0, len).join(" ") + "...";

  return (
    <Notification
      title={`Next Launch: ${mission.launchDate.toDateString()}, ${mission.launchDate.toTimeString()}`}
      icon={<IconRocket size={18} />}
      className={classes.notification}
      disallowClose={false}
      onClose={onClose}
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Text>{truncateText(15)}</Text>
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Text>{mission.details}</Text>
      </MediaQuery>
    </Notification>
  );
};
