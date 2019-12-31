---
path: /blog/gatsby-blog-from-markdown
date: 2018-12-01
tags: [my, first, post]
title: Adding a Blog to Your Gatsby Site From .md Files
---
Get ready to get meta, because I am going to walk you through the steps I took to add a blog to the site you are on right now!  My portfolio site is made using Gatsby, a framework for building sites using modern web technologies (React, Webpack, Sass GraphQL) that compile to static HTML in the build process so they load super quick.  Then hydrate after the fact into fully functional React components.  The framework as a result has been picking up alot of steam recently and is used in quite a few [places](https://www.gatsbyjs.org/showcase/).  This post will be a simple walk through of how I added a blog to my portfolio site.  You can pull data from many different sources to create pages in Gatsby (WordPress, Drupal, CSV, JSON) however I am choosing to just go the route of using markdown files.
## Set up your dependencies:
Luckily there is an excellent and straight forward plugin for Gatsby for the task of interpreting .md files called [gatsby-transformer-remark]([https://www.gatsbyjs.org/packages/gatsby-transformer-remark/](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)) since I am to this point not using this plugin in my site I am going to have to install it:
```yarn add gatsby-transformer-remark html-react-parser```
...and add it to my plugins:
```javascript
./gatsby-config.js
...
plugins:[
	...
	'gatsby-transformer-remark',
	{
		resolve:  `gatsby-source-filesystem`,
		options: {
			name:  `blog-posts`,
			path:  `${__dirname}/src/blog-posts`,
		},
	},
]
```
We are also going to need to use gatsby-source-filesystem to pull in our blog posts and direct those that plugin to pull in files in a given path, more on that in the next step.  Additionally you may have noticed above I am using the html-react-parser that is because down the line we are going to be ingesting HTML strings into our React components.
## Writing Your Fist Blog Posts
Now we are going to create the directory from our config above to contain all the posts for our blog and write our first blog post.  This will contain some parameters above your standard markdown this is called "front matter" and it is what our gatsby-transformer-remark plugin will allow us to query from.  The rest will be standard markdown you are probably familiar with.
>tip: check out the site [stackedit](https://stackedit.io/) for a really great visual markdown writing experience in your browser or use the built in markdown preview feature in VScode.
```md
./src/blog-posts
---
path: /post/dogs-are-better-than-cats
date: 2019-12-22
title: Top Ten Times Dogs Were Better than Cats
---

# This is a post

``` 
## Inspect Your Post Using GraphiQL
So at this point your first blog post should be accessible to Gatsby through GraphQL, one of the nice things Gatsby does for you is spin up a GraphiQL instance side by side with your development server when you run ``gatsby develop``.  This is optional, I guess, but I find in indispensable to my workflow.  Additionally in the case of using Gatsby plugins you can click around here and find useful stuff the plugin author exposed to you, for instance here I found that markdownRemark calculates a time to read for your markdown files that's pretty cool!  To check this out you only need to point your browser to ``http://localhost:8000/___graphql``.  Here is where we are going to compose our query to test everything to this point went right.
```graphQL
query getBlogPost($path: String!) {
  markdownRemark(frontmatter: {path: { eq:$path}}){
    html
    timeToRead
    frontmatter{
      title
      date
    }
  }
}
```
We are going to write a new query ``getBlogPost`` which will accept a variable of path from the .md's front matter and find a blog post with a matching path and return the title and date as well as the html and a estimated timeToRead created by the markdownRemark plugin.  To run this we are going to need to look to the variables tab below and pass in this:
``{"path":"/post/dogs-are-better-than-cats"}``
Hopefully when you hit the run button in GraphiQL at this point you should see your desired post returned with it's title, date and some HTML put together from your markdown from markdownRemark.  This is the exact format the data will be passed off to the component we are about to write.

## Build your Blog Post Component
Almost to the finish line! now we can go ahead and write a component to display the output of the query we put together above.  This is going to get a bit wordy and a lot of the React stuff is going to likely be pretty familiar and not need a ton of explanation.  So I'll make this a little brief.
```javascript
./src/components/blog/blogPost.js

import React from  'react'
import { graphql } from  'gatsby'
import Layout from  '../../components/layout'
import Parser from  'html-react-parser';

const BlogPost  = ({data}) =>{
	const post = data.markdownRemark
	return <Layout>
		<h1>{post.frontmatter.title}</h1>
		<div>
			{post.timeToRead} minute read.
		</div>
			{Parser(post.html)}
		</Layout>
}

export const BlogPostByPath = graphql`
	query BlogPostByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path} }) {
			html
			timeToRead
			frontmatter {
				path
				title
			}
		}
	}
`
export default BlogPost
```
So we are going to first paste the query we wrote in the last step into out component as a named export inside of the graphql function provided by Gatsby, notice the back ticks used instead of parenthesis and quotation marks to pass the string to the function.  This is a new-ish Javascript syntax that is conventional for defining graphql queries.  The default export is going to be our functional component to whom all our blog post's data will be passed.  Mirroring what we say in our GraphiQL instance in the last step the data we want is going to be nested inside of data.markdownRemark so we are going to destructure our params to pull out data then store data.markdownRemark in a variable post to display the meta data we car about to the user.  Lastly we are going to use the html-react-parser module I mentioned way back in the first step to parse out the HTML for our post.

## Use Gatsby's Node API to create pages with their own paths.
Last step before we can  sit back and admire our handy work.  What we want to do is use Gatsby's  [node APIs](https://www.gatsbyjs.org/docs/node-apis/)  to [create pages](https://www.gatsbyjs.org/docs/node-apis/#createPages) for each of our .md blog posts.  This is done by adding exports to the ``gatsby-node.js`` file.  This file is used for a bunch of things and is really handy so I recommend spending some time on the documentation.
```Javascript
./gatsby-node.js
const path = require('path')

exports.createPages  = ({actions, graphql}) => {
	const createPage = actions.createPage
	const blogPostComponent = path.resolve('src/components/blog/blogPost.js');
	return graphql(`{
		allMarkdownRemark {
			edges {
				node {
					frontmatter {
						path
					}
				}
			}
		}
	}`)
	.then(res  => {
		res.data.allMarkdownRemark.edges.forEach(({node}) => {
			createPage({
				path: node.frontmatter.path,
				component: blogPostComponent
			})
		})
	})
}
```
So what is happening here is we are as mentioned above  creating a named export createPages naming is important here since that is how this file taps into the gatsby build process, the process looks for specific named exports in this file at different times.  Next we are going to take the arguments actions and graphql out, graphql so we can query our markdown and actions so we can get to createPage action to create pages programmatically from our markdown data.  then we run a query to retrieve all the paths from all the nodes from MarkdownRemark or all our markdown files in our ``./src/blog-posts/`` directory.  Then when that is resolved we can create a page for each graph node with a path defined in our frontmatter and the component we we wrote in the previous step.
## That's it
Now we are done and can admire our handy work!!!  Run ``gatsby develop`` and navigate over to localhost/8000/post/dogs-are-better-than-cats and look at your first blog post.  Additionally to get a better appreciation for what Gatsby does for you run ``gatsby build`` and check out the file compiled file ```./public/post/dogs-are-better-than-cats/dogs-are-better-than-cats``` or run ``gatsby serve`` navigate to the url again and look at your network traffic in Chrome DevTools.  Try writing additional blog posts in ``./src/posts/``.
