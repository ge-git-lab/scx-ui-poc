import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="header-content" style={{ marginLeft: '-12px', marginRight: '-12px'}}>
      <h4 className="text-center">{title}</h4>
    </div>
  )
};

export default Header;
