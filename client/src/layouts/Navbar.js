import React from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const Navbar = () => {
  return (
    <MDBNavbar light bgColor='light'>
      <div className='w-100 d-flex justify-content-end aling-items-end px-3' style={{maxHeight: "80px"}}>
        <div className='d-flex justify-content-center align-items-center w-auto gap-3'>
          <MDBBtn floating size='lg' tag='a' color='secondary'>
            <MDBIcon fas icon="bell" color='warning'/>
          </MDBBtn>

          <img
            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
            alt='profile logo'
            style={{ width: '45px', height: '45px' }}
            className='rounded-circle'
          />
        </div>
      </div>
    </MDBNavbar>
    
  );
};

export default Navbar;