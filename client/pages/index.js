import { Button } from "antd";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hey, Let's get started with your e-commerce demo!</h1>
      <Button className={styles.outlineButton}>Login to Product Pages</Button>
      <Button className={styles.outlineButton}>Admin Login to Dashboard</Button>
    </div>
  );
}
