/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';

const Submenu = ({ showSubMenu }) => {
  return (
    <StaticQuery
      query={graphql`
        query MenuQuery {
          allDatoCmsOffer(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <ul className={`submenu ${showSubMenu ? 'is-open' : ''}`}>
            {data.allDatoCmsOffer.edges.map(({ node }, index) => (
              <li key={index}>
                <Link to={`/offres/${node.slug}`}>{node.title}</Link>
              </li>
            ))}
          </ul>
        );
      }}
    />
  );
};

export default Submenu;
