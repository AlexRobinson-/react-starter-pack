import React from 'react';
import { connect } from 'react-redux';
import Toast from './../../components/toast';

const ToastList = ({ toasts }) => (
  <div>
    {
      toasts.map(toast => (
        <Toast
          {...toast}
          key={toast.id}
        />
      ))
    }
  </div>
);

export default connect(
  state => ({
    toasts: []
  })
)(ToastList);
