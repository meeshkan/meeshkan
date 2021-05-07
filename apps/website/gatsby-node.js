const path = require(`path`)

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions
	const blogPost = path.resolve("src/components/templates/blogPost.tsx")
	const changelogPage = path.resolve(
		`src/components/templates/changelogLayout.tsx`
	)

	return graphql(`
		{
			changelog: allMdx(
				filter: { fileAbsolutePath: { regex: "/changelog/" } }
			) {
				totalCount
				nodes {
					headings(depth: h2) {
						value
					}
					id
					body
					slug
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
		const changelog = result.data.changelog.nodes

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

		changelog.forEach((changelog, index) => {
			createPage({
				path: `/changelog/${changelog.slug}/`,
				component: changelogPage,
				context: {
					changelog,
					slug: changelog.slug,
				},
			})
		})
	})
}
