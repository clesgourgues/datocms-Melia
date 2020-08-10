import React from 'react';

const BurgerButton = ({ open, setOpen }) => {
  return (
    <button className={`Burger ${open ? 'Burger__open' : ''}`} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
};

export default BurgerButton;
