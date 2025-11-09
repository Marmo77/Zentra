type timeOptionsProps = {
  value: string;
  label: string;
};

export const timeOptions: timeOptionsProps[] = [
  {
    value: (1 / 60).toString(),
    label: "1 sec",
  },
  {
    value: "1",
    label: "1 min",
  },
  {
    value: "10",
    label: "10 min",
  },
  {
    value: "25",
    label: "25 min",
  },
  {
    value: "50",
    label: "50 min",
  },
  {
    value: "60",
    label: "60 min",
  },
  {
    value: "120",
    label: "120 min",
  },
];
