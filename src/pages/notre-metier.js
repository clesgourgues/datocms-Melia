import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { useTrail, animated } from 'react-spring';
import Layout from '../components/layout';
const items = [
  "Accompagnement individuel et sur mesure du dirigeant : stratégie, plans d'application, coaching, développement des compétences",
  "Accompagnement des équipes : cohésion d'équipes, formations métiers management, vente, négociation",
  'Accompagnement de la relation bancaire et financière',
  'Gestion des situations de crise (difficultés financières)',
  "Accompagnement du financement du développement de l'entreprise (investissements, croissance externe)",
  'Organisation du patrimoine du dirigeant et de sa famille',
  "Accompagnement à la cession de l'entreprise"
];

const Work = ({ data: { work } }) => {
  const trail = useTrail(items.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={work.seoMetaTags} />
        <div className='sheet__inner'>
          <h1 className='sheet__title'>{work.title}</h1>
          <span className='separator' />

          <h3 className='work__subtitle'>{work.subtitle}</h3>
          <div className='work__schema'>
            {trail.map((props, index) => (
              <animated.div className='work__item-wrapper' key={items[index]} style={props}>
                <div className={`work__item item${index}`}>
                  {' '}
                  <span className='work__number'> - {index + 1} -</span>
                  {items[index]}{' '}
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Work;

export const query = graphql`
  query WorkQuery {
    work: datoCmsWork {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
    }
  }
`;
