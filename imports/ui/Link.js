import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

const Link = () => {
    return (
      <div>
        <PrivateHeader title="Short Lnk"/>
        <div className="container">
          <LinksListFilters />
          <AddLink />
          <LinksList />
        </div>
      </div>
    );
}

export default Link;
