import React from "react"
import {
	Heading,
	Grid,
	Text,
	Image,
	Box,
	Link,
	useColorModeValue,
} from "@chakra-ui/core"
import { SingleSection } from "../components/organisms/singleSection"
import SEO from "../components/molecules/seo"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Card } from "../components/atoms/card"
import Layout from "../components/templates/layout"

import Mike from "../../data/avatars/mike.png"
import Kenna from "../../data/avatars/kenna.png"
import Kolya from "../../data/avatars/nikolay.png"
import Fredi from "../../data/avatars/fredrik.png"
import Maria from "../../data/avatars/maria.png"
import Nick from "../../data/avatars/nikolaos.png"

import systemOne from "../static/System.One_Moderat_Wordmark.svg"

const AboutUsPage = () => {
	const data = useStaticQuery(
		graphql`
			query {
				team: file(relativePath: { eq: "teamGroup.jpg" }) {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				nordic: file(relativePath: { eq: "nordicWebLogo.png" }) {
					childImageSharp {
						fluid(maxWidth: 150, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				connect: file(relativePath: { eq: "connectVenturesLogo.png" }) {
					childImageSharp {
						fluid(maxWidth: 150, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				tiny: file(relativePath: { eq: "tinyVCLogo.png" }) {
					childImageSharp {
						fluid(maxWidth: 150, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	)
	return (
		<Layout>
			<SEO
				pageTitle="About the Meeshkan team"
				pageDescription="Details about the Meeshkan team, what we stand for, the name origin, and our investors."
				pageUrl="https://meeshkan.com/about-us/"
			/>
			<SingleSection>
				<Heading as="h1" textStyle="h1" textAlign="center" mb={6}>
					About the Meeshkan team
				</Heading>

				<Img
					alt=""
					fluid={data.team.childImageSharp.fluid}
					style={{
						borderRadius: 6,
						height: 350,
					}}
				/>
				<Text mt={4} lineHeight="tall">
					Our product has changed a few times, but our vision of building a fake
					version of the internet, hasn't. We began as a group of researchers,
					and that is still heavily engrained into our culture despite also now
					considering ourselves a software company.
				</Text>
			</SingleSection>
			<SingleSection heading="Our team">
				<Grid
					templateColumns={[
						"repeat(auto-fill, 1fr)",
						"reapeat(2, 1fr)",
						"repeat(3, 1fr)",
					]}
					gap={6}
				>
					<Card>
						<Image
							src={Mike}
							maxW="80px"
							maxH="80px"
							alt="Mike's headshot"
							rounded="md"
							mx="auto"
							mb={4}
						/>
						<Text
							fontSize="xl"
							fontWeight={900}
							letterSpacing="wide"
							textAlign="center"
							mb={2}
						>
							Mike Solomon
						</Text>
						<Text fontWeight={500} textAlign="center">
							Founder / CEO
						</Text>
					</Card>
					<Card>
						<Image
							src={Kenna}
							maxW="80px"
							maxH="80px"
							alt="Makenna's headshot"
							rounded="md"
							mx="auto"
							mb={4}
						/>
						<Text
							fontSize="xl"
							fontWeight={900}
							letterSpacing="wide"
							textAlign="center"
							mb={2}
						>
							Makenna Smutz
						</Text>
						<Text fontWeight={500} textAlign="center">
							Cofounder / COO
						</Text>
					</Card>
					<Card>
						<Image
							src={Kolya}
							maxW="80px"
							maxH="80px"
							alt="Nikolay's headshot"
							rounded="md"
							mx="auto"
							mb={4}
						/>
						<Text
							fontSize="xl"
							fontWeight={900}
							letterSpacing="wide"
							textAlign="center"
							mb={2}
						>
							Nikolay Zenovkin
						</Text>
						<Text fontWeight={500} textAlign="center">
							Head of Data Science
						</Text>
					</Card>
					<Card>
						<Image
							src={Fredi}
							maxW="80px"
							maxH="80px"
							alt="Fredrik's headshot"
							rounded="md"
							mx="auto"
							mb={4}
						/>
						<Text
							fontSize="xl"
							fontWeight={900}
							letterSpacing="wide"
							textAlign="center"
							mb={2}
						>
							Fredrik Fornwall
						</Text>
						<Text fontWeight={500} textAlign="center">
							Software Engineer
						</Text>
					</Card>
					<Card>
						<Image
							src={Maria}
							maxW="80px"
							maxH="80px"
							alt="Maria's headshot"
							rounded="md"
							mx="auto"
							mb={4}
						/>
						<Text
							fontSize="xl"
							fontWeight={900}
							letterSpacing="wide"
							textAlign="center"
							mb={2}
						>
							Maria Malitckaya
						</Text>
						<Text fontWeight={500} textAlign="center">
							Data Scientist
						</Text>
					</Card>
					<Card>
						<Image
							src={Nick}
							maxW="80px"
							maxH="80px"
							alt="Maria's headshot"
							rounded="md"
							mx="auto"
							mb={4}
						/>
						<Text
							fontSize="xl"
							fontWeight={900}
							letterSpacing="wide"
							textAlign="center"
							mb={2}
						>
							Nikolaos Kamarinakis
						</Text>
						<Text fontWeight={500} textAlign="center">
							Software Engineer
						</Text>
					</Card>
				</Grid>
			</SingleSection>

			<SingleSection heading="Values">
				<Grid
					templateColumns={[
						"repeat(auto-fill, 1fr)",
						"reapeat(2, 1fr)",
						"repeat(3, 1fr)",
					]}
					gap={6}
				>
					<Card
						heading="Experimentation"
						body="We don’t expect things to work the first time. We encourage you to try and fail."
					/>
					<Card
						heading="Humility"
						body="Then, build a schema that unifies these various data sources."
					/>
					<Card
						heading="Trust"
						body="If we hire you, it’s because we trust that you know your domain. Make decisions."
					/>
					<Card
						heading="Educating"
						body="The platform of a company is best used to share knowledge."
					/>
					<Card
						heading="Asking tough questions"
						body="We encourage each other to challenge and better the team."
					/>
					<Card
						heading="Being bold"
						body="We want to foster a stable environment that encourages bold risks."
					/>
				</Grid>
			</SingleSection>

			<SingleSection heading="Our investors">
				<Grid
					templateColumns={[
						"repeat(auto-fill, 1fr)",
						"reapeat(2, 1fr)",
						"repeat(3, 1fr)",
					]}
					gap={6}
				>
					<Box
						as={Link}
						href="https://connectventures.co/"
						aria-label="connect ventures website"
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						<Img
							fluid={data.connect.childImageSharp.fluid}
							style={{ maxWidth: 200 }}
						/>
					</Box>
					<Box
						as={Link}
						href="http://www.systemone.vc/"
						aria-label="System One VC website"
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						<Image src={systemOne} alt="system one vc logo" maxW="200px" />
					</Box>
					<Box
						as={Link}
						aria-label="Nordic web website"
						href="https://thenordicweb.com/"
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						<Img
							fluid={data.nordic.childImageSharp.fluid}
							style={{ maxWidth: 200 }}
						/>
					</Box>
					<Box
						as={Link}
						href="https://tiny.vc/"
						aria-label="Tiny VC website"
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						<Img
							fluid={data.tiny.childImageSharp.fluid}
							style={{ maxWidth: 156 }}
						/>
					</Box>
					<Box
						as={Link}
						href="https://www.nordicmakers.vc/"
						aria-label="Nordic makers website"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						Nordic Makers
					</Box>
					<Box
						as={Link}
						href="http://www.firstfellow.com/"
						aria-label="First fellow partners website"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						First Fellow Partners
					</Box>
					<Box
						as={Link}
						href="https://www.linkedin.com/in/aliomar/?originalSubdomain=fi"
						aria-label="Angel Ali Omar's linkedin"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						Ali Omar
					</Box>
					<Box
						as={Link}
						href="https://futuristic.vc/"
						aria-label="Futuristic VC website"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						Futuristic.vc
					</Box>
					<Box
						as={Link}
						href="https://www.linkedin.com/in/aribackholm"
						aria-label="Angel Ari Backholm's linkedin"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						Ari Backholm
					</Box>
					<Box
						as={Link}
						href="https://www.linkedin.com/in/okitag"
						aria-label="Angel Oki Tåg's linkedin"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						Oki Tåg
					</Box>
					<Box
						as={Link}
						href="https://www.linkedin.com/in/jermyap/"
						aria-label="Angel Jeremy Yap's linkedin"
						fontSize="xl"
						fontWeight={900}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						p={4}
					>
						Jeremy Yap
					</Box>
				</Grid>
			</SingleSection>

			<SingleSection heading="What does Meeshkan mean?">
				<Text mt={4} lineHeight="tall">
					Meeshkan is a Hebrew word (משכן) that loosely translates to
					tabernacle. It's the portable temple that the Israelites built during
					the Exodus from Egypt. It served as a stand-in for the larger one they
					were to build in Jerusalem.
				</Text>
				<Text as="p" mt={4} lineHeight="tall">
					What we do well begins with mocks, and they are are no different. In
					short, we think that mocks are like Meeshkans. They are stand-ins for
					the real thing, and in many ways, they need to resemble the real
					thing, but are more lightweight and not as full-featured.
				</Text>
				<Text mt={4} lineHeight="tall">
					We don't mean to endorse one religious tradition over another. What
					we've learned is that the problems our company is solving are ancient
					and of fundamental importance to many communities. The story of the
					Meeshkan helps us focus on the humanistic backbone of what we are
					doing.
				</Text>
			</SingleSection>
		</Layout>
	)
}

export default AboutUsPage
