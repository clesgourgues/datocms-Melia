import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
    <article className='sheet'>
      <HelmetDatoCms seo={data.datoCmsOffer.seoMetaTags} />
      <div className='sheet__inner'>
        <h1 className='sheet__title'>{data.datoCmsOffer.title}</h1>
        <span className='separator' />
        <div className='sheet__content'>
          <div className='sheet__gallery'>
            <Img fluid={data.datoCmsOffer.coverImage.fluid} />
          </div>
          <p className='sheet__lead'>{data.datoCmsOffer.intro}</p>
        </div>
        <div
          className='sheet__body'
          dangerouslySetInnerHTML={{
            __html: data.datoCmsOffer.descriptionNode.childMarkdownRemark.html
          }}
        />
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query OfferQuery($slug: String!) {
    datoCmsOffer(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      intro
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
