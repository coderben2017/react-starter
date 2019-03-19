import React from 'react';
import './Page404.css';

export default ({location}) => (
  <div className="container-404">
    <strong>
      <i>{location.pathname}</i>
    </strong>
    : 该页面未找到
  </div>
)
