import styles from './spinner.module.scss';

export const Spinner: React.FC = () => (
  <div className={styles.container}>
    <div className={`${styles.loader}`}>
      <svg
        className={`${styles.loaderStar} ${styles.star1}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35px"
        height="35px"
        viewBox="0 0 23.172 23.346">
        <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
      </svg>
      <svg
        className={`${styles.loaderStar} ${styles.star2}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35px"
        height="35px"
        viewBox="0 0 23.172 23.346">
        <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
      </svg>
      <svg
        className={`${styles.loaderStar} ${styles.star3}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35px"
        height="35px"
        viewBox="0 0 23.172 23.346">
        <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
      </svg>
      <svg
        className={`${styles.loaderStar} ${styles.star4}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35px"
        height="35px"
        viewBox="0 0 23.172 23.346">
        <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
      </svg>
      <svg
        className={`${styles.loaderStar} ${styles.star5}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35px"
        height="35px"
        viewBox="0 0 23.172 23.346">
        <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
      </svg>
      <svg
        className={`${styles.loaderStar} ${styles.star6}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35px"
        height="35px"
        viewBox="0 0 23.172 23.346">
        <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
      </svg>
    </div>
  </div>
);
