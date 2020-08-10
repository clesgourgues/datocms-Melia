import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Layout from '../components/layout';
const items = [
  "Accompagnement individuel et sur mesure du dirigeant : stratégie, plans d'application, coaching, développement des compétences",
  "Accompagnement des équipes : cohésion d'équipes, formations Métiers management, vente, négociation",
  'Accompagnement de la relation bancaire et financière',
  'Gestion des situations de crise (difficultés financières',
  "Accompagnement du financement du développement de l'entreprise (investissements, croissance externe)",
  'Organisation du patrimoine du dirigeant et de sa famille',
  "Accompagnement à la cession de l'entreprise"
];

const Work = ({ data: { work } }) => {
  console.log(work);
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={work.seoMetaTags} />
        <div className='sheet__inner'>
          <h1 className='sheet__title'>{work.title}</h1>
          <span className='separator' />

          <h3 className='work__subtitle'>{work.subtitle}</h3>

          <div className='work__schema'>
            <div className='work__schema-row'>
              <div className={`work__item item0`}>{items[0]} </div>
            </div>
            <div className='work__schema-row large'>
              <div className={`work__item item1`}>{items[1]} </div>
              <span className={`work__item item2`}>{items[2]}</span>
            </div>
            <div className='work__schema-row large '>
              <span className={`work__item item3`}>{items[3]}</span>
              <span className={`work__item item4`}>{items[4]}</span>
            </div>
            <div className='work__schema-row medium'>
              <span className={`work__item item5`}>{items[5]}</span>
              <span className={`work__item item6`}>{items[6]}</span>
            </div>
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
