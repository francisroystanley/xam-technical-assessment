import classes from "./Alert.module.css";

type Props = {
  message: string;
};

const Alert = ({ message }: Props) => {
  return <div className={classes.alert}>{message}</div>;
};

export default Alert;
