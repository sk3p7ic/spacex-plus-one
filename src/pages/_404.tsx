import { Button, createStyles, Title } from "@mantine/core";

const useStyles = createStyles((_) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const ErrorPage = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.page}>
      <Title>An Error Has Occurred.</Title>
      <Button component="a" href="/">
        Go Back Home
      </Button>
    </div>
  );
};
