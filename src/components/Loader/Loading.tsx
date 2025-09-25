import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container_spinner}>
      <div className={styles.spinner_load}></div>
    </div>
  );
}
