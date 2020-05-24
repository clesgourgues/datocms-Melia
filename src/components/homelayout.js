/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';

import '../styles/index.sass';

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query HomeQuery {
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
        <div className={`container home ${showMenu ? 'is-open' : ''}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div className='container__sidebar home'>
            <div className='sidebar'>
              <Img fluid={data.datoCmsHome.logo.fluid} />
              <h6 className='sidebar__title'>
                <Link to='/'>{data.datoCmsSite.globalSeo.siteName}</Link>
              </h6>
              <div
                className='sidebar__intro'
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
                }}
              />
              <ul className='sidebar__menu'>
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
              <p className='sidebar__social'>
                {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                  <a
                    key={profile.profileType}
                    href={profile.url}
                    target='blank'
                    className={`social social--${profile.profileType.toLowerCase()}`}
                  >
                    {' '}
                  </a>
                ))}
              </p>
              <div className='sidebar__copyright'>{data.datoCmsHome.copyright}</div>
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
                <div className='mobile-header__logo home'>
                  <Link to='/'>
                    {' '}
                    <Img fluid={data.datoCmsHome.logo.fluid} />
                    <span>{data.datoCmsSite.globalSeo.siteName}</span>
                  </Link>
                  <div
                    className='sidebar__intro'
                    dangerouslySetInnerHTML={{
                      __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
                    }}
                  />
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
