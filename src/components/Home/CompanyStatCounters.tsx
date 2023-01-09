import { Group, Text } from "@mantine/core";
import CountUp from "react-countup";

/** Defines a formatter that may be used to format currency, in USD. */
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export type CompanyInfo = {
  employees: number;
  launch_sites: number;
  valuation: number;
};

type CompanyStatCountersProps = {
  company: CompanyInfo;
  classes: {
    highlight: string;
  };
};

/** Renders a Mantine Group of elements that count up the provided values. */
export const GroupCompanyStatCounters = ({
  company,
  classes,
}: CompanyStatCountersProps) => {
  return (
    <Group>
      <Text>
        <CountUp
          start={0}
          end={company.launch_sites}
          duration={3}
          className={classes.highlight}
        />{" "}
        Active Launch Sites
      </Text>
      <Text>
        <CountUp
          start={0}
          end={company.employees}
          duration={3}
          className={classes.highlight}
        />{" "}
        Employees
      </Text>
      <Text>
        <CountUp
          start={0}
          end={company.valuation}
          duration={3}
          formattingFn={formatter.format}
          className={classes.highlight}
        />{" "}
        Valuation
      </Text>
    </Group>
  );
};
