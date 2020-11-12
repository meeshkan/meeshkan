const path = require(`path`)

exports.createPages = ({ actions, graphql, reporter }) => {
	const { createPage } = actions
	const blogPost = path.resolve("src/components/templates/blogPost.tsx")
	const docPage = path.resolve(`src/components/templates/docsLayout.tsx`)

	return graphql(`
		{
			documentation: allMdx(filter: { fileAbsolutePath: { regex: "/docs/" } }) {
				totalCount
				nodes {
					headings(depth: h1) {
						value
					}
					id
					body
					excerpt(pruneLength: 140)
					slug
					frontmatter {
						slug
					}
				}
			}
			blog: allMdx(
				filter: { frontmatter: { published: { eq: true } } }
				sort: { fields: [frontmatter___date], order: DESC }
			) {
				totalCount
				nodes {
					id
					excerpt(pruneLength: 140)
					frontmatter {
						title
						date
						slug
						published
					}
				}
			}
		}
	`).then((result) => {
		if (result.errors) {
			reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
		}

		const posts = result.data.blog.nodes
		const docs = result.data.documentation.nodes

		// create page for each mdx file
		posts.forEach((post, index) => {
			const previous = index === posts.length - 1 ? null : posts[index + 1]
			const next = index === 0 ? null : posts[index - 1]

			createPage({
				path: `/blog/${post.frontmatter.slug}/`,
				component: blogPost,
				context: {
					post,
					slug: post.frontmatter.slug,
					previous,
					next,
				},
			})
		})

		docs.forEach((doc, index) => {
			createPage({
				path: `/docs/${doc.frontmatter.slug}/`,
				component: docPage,
				context: {
					doc,
					id: doc.id,
					title: doc.headings[0].value,
					slug: doc.frontmatter.slug,
				},
			})
		})
	})
}
