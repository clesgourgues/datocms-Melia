import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const About = ({ data: { about } }) => (
  <Layout>
    <article className='sheet'>
      <HelmetDatoCms seo={about.seoMetaTags} />
      <div className='sheet__inner'>
        <h1 className='sheet__title'>{about.title}</h1>
        <span className='separator' />
        <div className='sheet__content'>
          {about.photo && (
            <div className='sheet__gallery'>
              <Img fluid={about.photo.fluid} />
            </div>
          )}
          <div className='sheet__person'>
            <h2 className='sheet__name'>{about.subtitle}</h2>
            <blockquote className='sheet__lead'>{about.intro}</blockquote>
          </div>
        </div>

        <div
          className='sheet__body'
          dangerouslySetInnerHTML={{
            __html: about.bioNode.childMarkdownRemark.html
          }}
        />
        <h2 className='sheet__subtitle'>En association avec :</h2>
        <div className='sheet__content'>
          {about.photo2 && (
            <div className='sheet__gallery'>
              <Img fluid={about.photo.fluid} />
            </div>
          )}
          <div className='sheet__person'>
            <h2 className='sheet__name'>{about.subtitle2}</h2>
            <blockquote className='sheet__lead'>{about.intro2}</blockquote>
          </div>
        </div>
        <div
          className='sheet__body'
          dangerouslySetInnerHTML={{
            __html: about.bio2Node.childMarkdownRemark.html
          }}
        />
      </div>
    </article>
  </Layout>
);

export default About;

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      intro
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      subtitle2
      intro2
      photo2 {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
      bio2Node {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
