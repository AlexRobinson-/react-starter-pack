import React from 'react';
import { connect } from 'react-redux';
import Toast from './../../components/toast';
import styles from './toast-list.scss';
import { selectors } from './../../../../reducers';

const ToastList = ({ toasts }) => toasts ? (
  <div className={styles.ToastList}>
    {
      toasts.map(toast => (
        <Toast
          {...toast}
          key={toast.id}
        />
      ))
    }
  </div>
) : <div />;

export default connect(
  state => ({
    toasts: selectors.toast.getToasts(state)
  })
)(ToastList);
