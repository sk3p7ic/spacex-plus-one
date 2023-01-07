import { useQuery, gql } from "@apollo/client";
import { createStyles, Group, Text, Title } from "@mantine/core";
import CountUp from "react-countup";

const GET_CEO = gql`
  {
    company {
      employees
      valuation
      launch_sites
      summary
    }
  }
`;

const useStyles = createStyles((_) => ({
  hero: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const HomePage = () => {
  const { classes } = useStyles();
  const { loading, error, data } = useQuery(GET_CEO);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formatCurrency = (n: number): string => {
    return formatter.format(n);
  };

  return (
    <div className={classes.hero}>
      <Title>SpaceX Lookup</Title>
      <Group>
        <Text>
          <CountUp start={0} end={data.company.launch_sites} duration={3} />{" "}
          Active Launch Sites
        </Text>
        <Text>
          <CountUp start={0} end={data.company.employees} duration={3} />{" "}
          Employees
        </Text>
        <Text>
          <CountUp
            start={0}
            end={data.company.valuation}
            duration={3}
            formattingFn={formatCurrency}
          />{" "}
          Valuation
        </Text>
      </Group>
      <Text>{data.company.summary}</Text>
    </div>
  );
};
