/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Footer = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
          }
          datoCmsHome {
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          datoCmsFooter {
            address
            agreement
            phone
            rcs
            responsability
            mail
          }
        }
      `}
      render={data => {
        return (
          <div className='footer'>
            <div className='footer__column'>
              <ul>
                <li>{data.datoCmsSite.globalSeo.siteName}</li>
                <li
                  className='sidebar__intro'
                  dangerouslySetInnerHTML={{
                    __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
                  }}
                />
                <li>{data.datoCmsFooter.rcs}</li>
                <li>{data.datoCmsFooter.responsability}</li>
                <li>{data.datoCmsFooter.agreement}</li>
              </ul>
            </div>
            <div className='footer__column'>
              <ul>
                <li>{data.datoCmsFooter.phone}</li>
                <li>{data.datoCmsFooter.address}</li>
                <li>{data.datoCmsFooter.mail}</li>
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Footer;
