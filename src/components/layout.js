/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import Submenu from './Submenu';
import Footer from './Footer';

import '../styles/index.sass';

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            logo {
              fluid(maxWidth: 400, imgixParams: { fm: "jpg", auto: "compress" }) {
                ...GatsbyDatoCmsSizes
              }
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          datoCmsPhilosophy {
            title
            slug
          }
          datoCmsWork {
            title
            slug
          }
          datoCmsAboutPage {
            title
            slug
          }
          allDatoCmsOffer(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                title
                slug
              }
            }
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <div className={`container page ${showMenu ? 'is-open' : ''}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div className='container__sidebar page'>
            <div className='sidebar page'>
              <h6 className='sidebar__title page'>
                <Link to='/'>
                  {' '}
                  <Img fluid={data.datoCmsHome.logo.fluid} />
                  <span>{data.datoCmsSite.globalSeo.siteName}</span>
                </Link>
              </h6>
              <ul className='sidebar__menu page'>
                <li
                  className='submenu__parent'
                  onMouseEnter={() => setShowSubMenu(true)}
                  onMouseLeave={() => setShowSubMenu(false)}
                >
                  Nos offres
                  <Submenu showSubMenu={showSubMenu} />
                </li>
                <li>
                  <Link to={`/${data.datoCmsWork.slug}`}>{data.datoCmsWork.title}</Link>
                </li>
                <li>
                  <Link to={`/${data.datoCmsPhilosophy.slug}`}>{data.datoCmsPhilosophy.title}</Link>
                </li>
                <li>
                  <Link to={`/${data.datoCmsAboutPage.slug}`}>{data.datoCmsAboutPage.title}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='container__body'>
            <div className='container__mobile-header'>
              <div className='mobile-header'>
                <div className='mobile-header__menu'>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                <div className='mobile-header__logo page'>
                  <Link to='/'>
                    {' '}
                    <Img fluid={data.datoCmsHome.logo.fluid} />
                    <span>{data.datoCmsSite.globalSeo.siteName}</span>
                  </Link>
                </div>
              </div>
            </div>
            {children}
          </div>
          <Footer />
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
