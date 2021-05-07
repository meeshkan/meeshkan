import React from "react"
import { Link as ChakraLink } from "@chakra-ui/react"
import Layout from "./layout"
import SEO from "../molecules/seo"
import { SingleSection } from "../organisms/singleSection"
import ChangelogItem from "../molecules/changelog-item"
import { MDXProvider } from "@mdx-js/react"
import mdxComponents from "../molecules/mdxComponents"
import { graphql, Link } from "gatsby"
import { ChevronLeftIcon } from "@chakra-ui/icons"

const ChangelogLayout = ({ data }) => {
	return (
		<Layout>
			<MDXProvider components={mdxComponents}>
				<SEO
					pageTitle="Meeshkan Changelog"
					pageDescription="The Meeshkan changelog communicating what we've accomplished as a team."
					pageUrl="https://meeshkan.com/changelog/"
				/>

				<SingleSection>
					<ChakraLink to="/changelog/" as={Link}>
						<ChevronLeftIcon /> All updates
					</ChakraLink>
					<ChangelogItem
						version={data.mdx.frontmatter.version}
						date={new Date(
							data.mdx.frontmatter.date.slice(6, 10),
							data.mdx.frontmatter.date.slice(4, 5) - 1,
							data.mdx.frontmatter.date.slice(0, 2)
						).toLocaleDateString("en-US", {
							month: "short",
							year: "numeric",
							day: "numeric",
						})}
						body={data.mdx.body}
						slug={data.mdx.frontmatter.date}
					/>
				</SingleSection>
			</MDXProvider>
		</Layout>
	)
}

export const query = graphql`
	query CHANGELOG_ITEM($slug: String!) {
		mdx(frontmatter: { slug: { eq: $slug } }) {
			id
			frontmatter {
				version
				date
			}
			body
		}
	}
`

export default ChangelogLayout
