import React from 'react';
import styles from './toast.scss';

const Toast = ({ message }) => (
  <div className={styles.Toast}>{message}</div>
);

export default Toast;
