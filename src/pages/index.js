import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import HomeLayout from '../components/homelayout';

const IndexPage = ({ data }) => (
  <HomeLayout>
    <div className='showcase'>
      {data.allDatoCmsOffer.edges.map(({ node: offer }, index) => (
        <figure
          key={offer.id}
          className={`card showcase__item showcase__item${index} ${offer.flash ? 'flash' : ''}`}
        >
          <Link to={`/offres/${offer.slug}`} className='card__image'>
            <Img fluid={offer.coverImage.fluid} />
            <figcaption className='card__caption'>
              <h6 className='card__title'>{offer.title}</h6>
            </figcaption>
          </Link>
        </figure>
      ))}
    </div>
  </HomeLayout>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsOffer(sort: { fields: position, order: ASC }) {
      edges {
        node {
          id
          title
          slug
          flash
          coverImage {
            fluid(maxWidth: 500, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
