import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const showAlert = (title, text, styles = {}, MDBIconComponent) => {
  MySwal.fire({
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {MDBIconComponent}
        {title}
      </div>
    ),
    text: text,
    color: "white",
    timer: 3000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    background: styles.background || '#fff',
    customClass: {
      title: styles.titleClass || '',
      popup: styles.popupClass || '',
      content: styles.contentClass || '',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
};

export default showAlert;