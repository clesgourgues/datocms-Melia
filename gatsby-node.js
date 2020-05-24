const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsOffer {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsOffer.edges.map(({ node: offer }) => {
        createPage({
          path: `offres/${offer.slug}`,
          component: path.resolve(`./src/templates/offer.js`),
          context: {
            slug: offer.slug
          }
        });
      });
      resolve();
    });
  });
};
