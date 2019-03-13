import React from 'react';
import './Page404.css';

export default ({location}) => (
  <div className="container-404">
    <strong>
      <i>{location.pathname}</i>
    </strong>
    : 404 not found
  </div>
)
