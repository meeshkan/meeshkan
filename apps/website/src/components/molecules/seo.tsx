import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

type SEOProps = {
	children?: Object
	pageDescription: string
	pageTitle: string
	pageUrl: string
}

function SEO({ children, pageDescription, pageTitle, pageUrl }: SEOProps) {
	const {
		site: {
			siteMetadata: { description: siteDescription, siteUrl, title: siteTitle },
		},
	} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					siteUrl
					siteLanguage
					siteLocale
					author
				}
			}
		}
	`)

	const title = pageTitle || siteTitle

	const pageUrlObject = new URL(pageUrl)
	const [tag, slug] = pageUrlObject.pathname.split("/").slice(1)

	const cardBaseUrl = "https://og-cards.meeshkan.com"
	let cardUrl = `${cardBaseUrl}/card?title=${title}`
	if (slug && slug.length > 0) {
		cardUrl += `&tag=${tag}`
	}

	const baseOG = `${cardBaseUrl}/api/${encodeURIComponent(cardUrl)}`

	return (
		<React.Fragment>
			<Helmet
				defaultTitle={siteTitle}
				htmlAttributes={{ lang: "en" }}
				titleTemplate={`%s | ${siteTitle}`}
			>
				{/* titles */}
				<title>{pageTitle || siteDescription}</title>
				<meta
					property="og:title"
					content={`${pageTitle || siteDescription} | ${siteTitle}`}
				/>
				<meta
					property="twitter:title"
					content={`${pageTitle || siteDescription} | ${siteTitle}`}
				/>

				{/* URL info */}
				{pageUrl && <link rel="canonical" href={pageUrl} />}
				<meta property="og:url" content={pageUrl || siteUrl} />

				{/* descriptions */}
				<meta name="description" content={pageDescription || siteDescription} />
				<meta
					property="og:description"
					content={pageDescription || siteDescription}
				/>

				{/* images */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:image" content={baseOG} />
				<meta property="twitter:image" content={baseOG} />
				<meta name="image" content={baseOG} />

				<meta
					name="google-site-verification"
					content="x_u9LXn82cn5TO9Q7XMK6i1JF7mhDzdUuCRWX3jFQXc"
				/>
			</Helmet>
			{children}
		</React.Fragment>
	)
}

export default SEO
