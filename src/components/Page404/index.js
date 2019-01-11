import React from 'react';
import './index.css';

export default ({location}) => (
  <div className="container-404">
    <strong>
      <i>{location.pathname}</i>
    </strong>
    : 404 not found
  </div>
)
