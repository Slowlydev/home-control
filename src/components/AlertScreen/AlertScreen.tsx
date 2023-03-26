import styles from "./Alertscreen.module.scss";
import Link from "next/link";

export default function Alertscreen() {
  return (
    <div className={styles.fullscreen}>
      <div className="container">
        <h1>Something went terriably wrong 😔</h1>
        <Link href="/setup">
          <a>Setup</a>
        </Link>
      </div>
    </div>
  );
}
