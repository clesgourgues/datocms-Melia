/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import Footer from './Footer';
import BurgerButton from './BurgerButton';

import '../styles/index.sass';

const HomeLayout = ({ children }) => {
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
          <div className='Burger__container'>
            <BurgerButton
              open={showMenu}
              setOpen={() => {
                setShowMenu(!showMenu);
              }}
            />
          </div>
          <div className='container__sidebar home'>
            <div className='sidebar'>
              <Img className='sidebar__logo' fluid={data.datoCmsHome.logo.fluid} />
              <h6 className='sidebar__title'>{data.datoCmsSite.globalSeo.siteName}</h6>
              <div
                className='sidebar__intro home'
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
                    href={`mailto:${profile.url}?subject=Demande%20de%20renseignements`}
                    target='blank'
                    className={`social social--${profile.profileType.toLowerCase()}`}
                  >
                    {' '}
                  </a>
                ))}
              </p>
              <div className='sidebar__copyright'>{data.datoCmsHome.copyright}</div>
            </div>
            <div className='container__logo'>
              <Img fluid={data.datoCmsHome.logo.fluid} />
            </div>
          </div>
          <div className='container__body'>
            <div className='container__mobile-header'>
              <div className='mobile-header'>
                <div className='mobile-header__menu'></div>
                <div className='mobile-header__logo home'>
                  <Img className='mobile-header__image home' fluid={data.datoCmsHome.logo.fluid} />
                  <h2 className='mobile-header__title'>{data.datoCmsSite.globalSeo.siteName}</h2>
                  <div
                    className='mobile-header__intro home'
                    dangerouslySetInnerHTML={{
                      __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
                    }}
                  />
                </div>
              </div>
            </div>
            {children}
          </div>

          <Footer home={true} />
        </div>
      )}
    />
  );
};

HomeLayout.propTypes = {
  children: PropTypes.object
};

export default HomeLayout;
