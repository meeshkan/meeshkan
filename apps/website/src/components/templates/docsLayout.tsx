import React from "react"
import { Box, useColorModeValue } from "@chakra-ui/core"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "../molecules/mdxComponents"
import SideNav from "../docsComponents/sideNavigation"
import DocsNavigation from "../docsComponents/docsNavigation"
import SEO from "../../components/molecules/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

type LayoutProps = {
	pageContext: any
}

const DocsLayout = ({ pageContext }: LayoutProps) => {
	return (
		<MDXProvider components={MDXComponents}>
			<SEO
				pageTitle={`${pageContext.title}`}
				pageDescription="Documentation to guide you through the Meeshkan core concepts."
				pageUrl={`https://meeshkan.com/docs/${
					pageContext ? pageContext.slug + `/` : null
				}`}
			>
				<DocsNavigation />
				<Box>
					<SideNav
						display={["none", null, "block"]}
						maxWidth="18rem"
						width="full"
					/>
					<Box
						pl={[0, null, "18rem"]}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						py={2}
					>
						<Box
							as="main"
							minH="92.5vh"
							mx="auto"
							maxWidth="46rem"
							marginBottom="5rem"
							pt={6}
							px={5}
						>
							<MDXRenderer>{pageContext.doc.body}</MDXRenderer>
						</Box>
					</Box>
				</Box>
			</SEO>
		</MDXProvider>
	)
}

export default DocsLayout
