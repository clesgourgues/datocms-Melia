import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Layout from '../components/layout';
const items = [
  "Accompagnement individuel et sur mesure du dirigeant : stratégie, plans d'application, coaching, développement des compétences",
  "Accompagnement des équipes : cohésion d'équipes, formations Métiers management, vente, négociation",
  'Accompagnement de la relation bancaire et finacière',
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
          <p className='work__subtitle'>{work.subtitle}</p>
          <div className='work__schema'>
            {items.map((item, index) => (
              <span key={index} className={`work__item work__item${index}`}>
                {item}
              </span>
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
