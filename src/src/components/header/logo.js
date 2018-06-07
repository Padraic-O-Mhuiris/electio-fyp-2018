import React from 'react';
import { Link } from 'react-router-dom'

const Logo = () => (
  <div className="navbar-brand">
    <Link to='/'>
      <h1 className="title title-site">electio</h1>

    </Link>
  </div>
);

export default Logo;
