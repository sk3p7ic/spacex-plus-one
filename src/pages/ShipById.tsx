import { useQuery, gql, DocumentNode } from "@apollo/client";
import { createStyles, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useLoaderData } from "react-router-dom";

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
    }
  }
  `;
};

const useStyles = createStyles((_) => ({
  loadingErrorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
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
  return <div>{ship.name}</div>;
};
