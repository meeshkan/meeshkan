import React from "react"
import { Divider } from "@chakra-ui/react"
import Layout from "../components/templates/layout"
import SEO from "../components/molecules/seo"
import { SingleSection } from "../components/organisms/singleSection"
import ChangelogItem from "../components/molecules/changelog-item"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import mdxComponents from "../components/molecules/mdxComponents"

const ChangelogPage = ({ data }) => {
	return (
		<Layout>
			<MDXProvider components={mdxComponents}>
				<SEO
					pageTitle="Meeshkan Changelog"
					pageDescription="The Meeshkan changelog communicating what we've accomplished as a team."
					pageUrl="https://meeshkan.com/changelog/"
				/>
				<SingleSection
					heading="Changelog"
					text="Updates from the developement of the Meeshkan product."
				>
					<Divider />

					{data.allMdx.nodes.map((changelogItem) => {
						const day = changelogItem.frontmatter.date.slice(0, 2)
						const month = changelogItem.frontmatter.date.slice(4, 5) - 1
						const year = changelogItem.frontmatter.date.slice(6, 10)
						const date = new Date(year, month, day).toLocaleDateString(
							"en-US",
							{
								month: "short",
								year: "numeric",
								day: "numeric",
							}
						)
						return (
							<ChangelogItem
								key={changelogItem.id}
								version={changelogItem.frontmatter.version}
								date={date}
								body={changelogItem.body}
								slug={changelogItem.frontmatter.date}
							/>
						)
					})}
				</SingleSection>
			</MDXProvider>
		</Layout>
	)
}

export const query = graphql`
	query GET_CHANGELOG_ITEMS {
		allMdx(
			filter: {
				fileAbsolutePath: { regex: "/changelog/" }
				frontmatter: { published: { eq: true } }
			}
			sort: { fields: frontmatter___version, order: DESC }
		) {
			totalCount
			nodes {
				id
				frontmatter {
					version
					date
				}
				body
			}
		}
	}
`

export default ChangelogPage
