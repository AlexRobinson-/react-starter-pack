import React from 'react';
import { connect } from 'react-redux';
import Toast from './../../components/toast';
import styles from './toast-list.scss';
import { selectors } from './../../reducers';
import { clearToast } from './../../actions/toast-actions';

const ToastList = ({ toasts, clearToast }) => toasts ? (
  <div className={styles.ToastList}>
    {
      toasts.map(toast => (
        <div
          onClick={() => clearToast(toast.id)}
          key={toast.id}
        >
          <Toast
            {...toast}
          />
        </div>
      ))
    }
  </div>
) : <div />;

export default connect(
  state => ({
    toasts: selectors.getToasts(state.toast)
  }),
  { clearToast }
)(ToastList);
