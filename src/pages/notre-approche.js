import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
    <article className='sheet'>
      <HelmetDatoCms seo={data.datoCmsPhilosophy.seoMetaTags} />
      <div className='sheet__inner'>
        <h1 className='sheet__title'>{data.datoCmsPhilosophy.title}</h1>
        <span className='separator' />
        <div className='sheet__content'>
          <div className='sheet__gallery'>
            <Img fluid={data.datoCmsPhilosophy.image.fluid} />
          </div>
        </div>
        <div
          className='sheet__body'
          dangerouslySetInnerHTML={{
            __html: data.datoCmsPhilosophy.contentNode.childMarkdownRemark.html
          }}
        />
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query PhilosophyQuery {
    datoCmsPhilosophy {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      image {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
