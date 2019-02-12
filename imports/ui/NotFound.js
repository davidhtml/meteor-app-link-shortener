import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Not Found</h1>
          <p>muahhhh more text</p>
            <Link className="button button--link" to="/">
              Home page
            </Link>
        </div>
      </div>
    );
}

export default NotFound;
