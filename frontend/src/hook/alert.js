import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Notification = ({ type, title, message, timer = 1500, showConfirmButton = false }) => {
  useEffect(() => {
    if (type && title) {
      MySwal.fire({
        icon: type,
        text: title,
        text: message,
        timer: timer,
        showConfirmButton: showConfirmButton
      });
    }
  }, [type, title, message, timer, showConfirmButton]);

  return null; // This component doesn't render anything visible
};

export default Notification;