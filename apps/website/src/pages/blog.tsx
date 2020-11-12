import React from "react"
import { Heading, Grid, Avatar, AvatarGroup, Text, Flex } from "@chakra-ui/core"
import { SingleSection } from "../components/organisms/singleSection"
import { graphql } from "gatsby"
import { Card } from "../components/atoms/card"
import SEO from "../components/molecules/seo"
import Layout from "../components/templates/layout"

const BlogHome = ({ data }) => {
	return (
		<Layout>
			<SEO
				pageTitle="Blog"
				pageDescription="We’re experts in Automated Testing and APIs. Why keep it to ourselves?"
				pageUrl="https://meeshkan.com/blog/"
			/>
			<SingleSection>
				<Heading as="h1" textStyle="h1" textAlign="center" mb={12}>
					We’re experts in Automated Testing and APIs. Why keep it to ourselves?
				</Heading>
				<Grid
					templateColumns={[
						"repeat(auto-fill, 1fr)",
						"reapeat(2, 1fr)",
						"repeat(3, 1fr)",
					]}
					gap={6}
				>
					{data.allMdx.nodes.map(({ frontmatter, id }) => (
						<Card
							key={id}
							heading={frontmatter.title}
							body={frontmatter.description}
							link={`/blog/${frontmatter.slug}/`}
							label={`Read the blog: ${frontmatter.title}.`}
						>
							<Flex
								align="center"
								justify="space-between"
								mt={4}
								mx="auto"
								pos="absolute"
								bottom={4}
								right={6}
								left={6}
							>
								{frontmatter.authors.length >= 1 ? (
									<AvatarGroup max={2} size="sm">
										{frontmatter.authors.map((author) => (
											<Avatar
												name={author.name}
												src={author.avatar.childImageSharp.fluid.src}
												size="sm"
											/>
										))}
									</AvatarGroup>
								) : (
									<Avatar
										name={frontmatter.authors[0].name}
										src={
											frontmatter.authors[0].avatar.childImageSharp.fluid.src
										}
										size="sm"
									/>
								)}

								<Text>{frontmatter.date}</Text>
							</Flex>
						</Card>
					))}
				</Grid>
			</SingleSection>
		</Layout>
	)
}

export const query = graphql`
	query SITE_INDEX_QUERY {
		allMdx(
			filter: { frontmatter: { published: { eq: true } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			nodes {
				id
				frontmatter {
					title
					description
					date(formatString: "Do MMM")
					slug
					published
					authors {
						avatar {
							childImageSharp {
								fluid {
									src
								}
							}
						}
						name
					}
				}
			}
		}
	}
`

export default BlogHome
