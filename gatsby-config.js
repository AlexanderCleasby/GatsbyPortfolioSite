module.exports = {
  siteMetadata: {
    title: `Alexander Cleasby`,
    description: `Alexander Cleasby is a developer and web enthusiast living in Washington D.C.`,
    author: `Alexander Cleasby`,
    github: `https://github.com/AlexanderCleasby/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `screenshots`,
        path: `${__dirname}/src/images/screenshots`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alexander Cleasby`,
        short_name: `Alexander Cleasby`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options:{
        fonts:[
          {
            family:'Fascinate Inline',
            variants: ['cursive']
          }
        ]
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
          rule: {
            include: /\.svg$/
          }
      }
  }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}