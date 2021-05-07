import React from "react"
import {
	Text,
	Stack,
	useColorModeValue,
	Button,
	Heading,
	List,
	ListItem,
	Code,
	LightMode,
} from "@chakra-ui/react"
import { SingleSection } from "../../components/organisms/singleSection"
import Layout from "../../components/templates/layout"
import SEO from "../../components/molecules/seo"
import { UniversalLink } from "../../components/atoms/UniversalLink"

const JobsPage = () => {
	return (
		<Layout>
			<SEO
				pageTitle="About the Meeshkan team"
				pageDescription="Details about the Meeshkan team, what we stand for, the name origin, and our investors."
				pageUrl="https://meeshkan.com/about-us/"
			/>
			<SingleSection heading="Job openings">
				<Stack
					direction="row"
					justify="space-between"
					align="center"
					p={3}
					borderRadius="md"
					backgroundColor={useColorModeValue("gray.100", "gray.800")}
				>
					<Text fontWeight={500}>Backend engineer (Data science interest)</Text>
					<LightMode>
						<Button
							size="sm"
							as={UniversalLink}
							to="https://meeshkan.join.com/jobs/1834590-backend-engineer-data-science-interest"
							// @ts-ignore
							target="_blank"
							rel="nofollow noopener"
						>
							Apply now
						</Button>
					</LightMode>
				</Stack>
			</SingleSection>
			<SingleSection heading="Progression at Meeshkan">
				<Text mb={4}>
					Don't let the fact that we develop the world's best AI-powered
					software testing product fool you - Meeshkan is a pretty boring
					company. Our day-to-day work consists of reading and writing code,
					designing, authoring documentation, listening to clients and working
					with our suppliers.
				</Text>
				<Text mb={4}>
					At the same time, Meeshkan is exceptional. The shareholders of
					Meeshkan are comfortable with the value of their shares being defined
					by a variety of indices, of which only one is the share's fair market
					value. We foster a culture where managers and employees regularly make
					decisions that are enacted irrespective of, and sometimes to the
					detriment of, the company's profitability or growth. This creates a
					different form of value for our shareholders - one that exists outside
					the bounds of money and that reenforces a set of core principles to
					which we adhere.
				</Text>
				<Text mb={4}>
					Employment and progression are two areas where this philosophy is
					borne out. In the company, we want to see a diversity of perspectives,
					gender identities, ethnicities, nationalities, skill sets, and
					ideologies. We make it a point to hire people who subscribe to, or are
					at least comfortable with, these values. While decisions resulting
					from this hiring policy have traditionally had a positive impact on
					Meeshkan's share price, there have also been times when the fair
					market value of our shares has declined as a result of these policies.
					At these junctures, our deontological posture regularly wins out over
					forseeable capital gain. We do this because we, as individuals,
					believe that the world is not quite right in its current form, and
					that by using our position of privilege to build an inclusive
					workforce and contributing our resources to deserving causes, we can
					help improve the world.
				</Text>

				<Heading as="h2" mt={8} mb={4}>
					Compensation
				</Heading>
				<Text mb={4}>
					Fair compensation is an important part of helping individuals grow
					during their time with our company, and determining how much money
					someone is going to make is often more art than science. We want this
					to be a collaborative process and not an adversarial one.
				</Text>
				<Text mb={4}>
					We do a lot of research regarding market compensation. We routinely
					ask candidates questions about their pay and competitive offers,
					discuss this with heads of engineering in other companies, use market
					data from large recruiting firms and pay attention to industry-wide
					polls. We understand regional differences and have a good idea of the
					ranges that a company similar to Meeshkan pays individuals and
					constantly update our knowledge. If you run a team and would like to
					compare your numbers to ours, please e-mail{" "}
					<UniversalLink
						color={useColorModeValue("blue.500", "blue.300")}
						to="mailto:contact@meeshkan.com"
					>
						contact@meeshkan.com
					</UniversalLink>
					.
				</Text>
				<Text mb={4}>
					A significant portion of one's compensation comes in Meeshkan stock
					options. However, we do not assign dollar value to those or consider
					them to do compensation math, other than for the case when we offer
					you a range of possible salaries and a range of possible stock
					compensation. We often let you choose high equity and low cash, or low
					equity and high cash, which shifts down or up your target market value
					by the difference in dollars between your choice and fair market
					compensation. We determine the amount of stock options at the time of
					your joining and you may also receive subsequent grants with the goal
					of always providing you a fair amount of stock appropriate to your
					ladder at the moment of the grant.
				</Text>

				<Heading as="h2" mt={8} mb={4}>
					Evaluation
				</Heading>
				<Text mb={4}>
					Performance evaluation at Meeshkan is linked to two factors:
				</Text>
				<List listStyleType="disc" listStylePos="inside" spacing={2} mb={8}>
					<ListItem lineHeight="1.6">
						the level(s) at which one works; and
					</ListItem>
					<ListItem lineHeight="1.6">
						the degree to which one supports and fosters the company's values.
					</ListItem>
				</List>
				<Text mb={4}>
					A "level", in Meeshkan-speak, is a description of how one functions in
					terms of speed, quality, autonomy and radiance of execution. While the
					four tend to be tightly coupled, it is always possible that someone
					will produce fast work of poor quality, slow work with high autonomy,
					etc. Levels in general are defined by the lowest index - if someone
					produces fast, autonomous, radiant work of low quality, it is level-1
					work.
				</Text>
				<Text mb={4}>
					Each level is linked to a salary range, and where one falls in the
					range is dictated by how the person matches with the company's values.
					At a minimum, it is expected that every employee will abide by the
					company's values. On the higher side of the range are employees that
					make an active effort to promote our values, like seeking out a great
					hire from an underrepresented group or presenting a stellar conference
					presentation.
				</Text>

				<Heading as="h2" mt={8} mb={4}>
					The Levels
				</Heading>
				<Code fontSize="xl" colorScheme="cyan" fontWeight={900} mb={4}>
					L1
				</Code>
				<List listStyleType="disc" listStylePos="inside" spacing={2} mb={8}>
					<ListItem lineHeight="1.6">
						<strong>Speed: </strong>Not assigned time sensitive tasks, and speed
						of execution is usually agreed upon with a more senior team member.
						There's generally a Plan B in case a task can't be completed.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Autonomy: </strong>Needs consistent mentorship, does not
						take on toom uch responsibility, and needs tasks assigned in a
						broken-down and clear manner.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Quality: </strong>
						Creates projects that have the functionality that is required, but
						needs help from others to audit their work.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Radiance: </strong>
						Creates in a way that those familiar with a project can understand.
						May require cleanup afterwards for comprehensibility and clarity
						from a more senior member of the team.
					</ListItem>
				</List>

				<Code fontSize="xl" colorScheme="cyan" fontWeight={900} mb={4}>
					L2
				</Code>
				<List listStyleType="disc" listStylePos="inside" spacing={2} mb={8}>
					<ListItem lineHeight="1.6">
						<strong>Speed: </strong>Alternates between long-term projects with
						flexible deadlines and short-term tasks where they define their own
						delivery schedule.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Autonomy: </strong>Is autonomous in their work, pulls others
						in only for specific asks, and occasionally mentors other workers.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Quality: </strong>High quality work that would proudly be
						part of a CV or portfolio if open-sourced.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Radiance: </strong>Is able to move work to a point where it
						is eventually understood by relevant members of the company, and
						work is generally clean, although it's understood that it would take
						the company time to digest and understand the work if the person
						leaves.
					</ListItem>
				</List>

				<Code fontSize="xl" colorScheme="cyan" fontWeight={900} mb={4}>
					L3
				</Code>
				<List listStyleType="disc" listStylePos="inside" spacing={2} mb={8}>
					<ListItem lineHeight="1.6">
						<strong>Speed: </strong>Knows how to scope tasks so that no one
						individual task takes more than 2-3 days. Is able to scope out tasks
						so that they are deployable when finished. Comfortable taking on
						time sensitive work, especially client-related deadlines.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Autonomy: </strong>Owns swaths of the roadmap, makes and
						assigns tasks to self and orchestrates others' work as needed, is
						able to course-correct to achieve business goals, and routinely
						mentors others.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Quality: </strong>Work is standard-setting and is regularly
						referenced and emulated by others both inside and outside of the
						company.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>Radiance: </strong>Creates as if the world is watching,
						constantly loops others in, documents and tests everything, and is
						self-effacing in their work. Once the work is finished, it is owned
						as much by others as it is by them.
					</ListItem>
				</List>

				<Heading as="h2" mt={8} mb={4}>
					All levels
				</Heading>
				<Text mb={4}>
					Across all Ls, Meeshkan follows roughly a 60-20-20 split of how we
					split up our task-based time.
				</Text>
				<List listStyleType="disc" listStylePos="inside" spacing={2} mb={8}>
					<ListItem lineHeight="1.6">
						<strong>60%</strong> of time is spent on core, mission-critical
						tasks. These are usually time bounded, and we set them up to protect
						against failure as much as possible.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>20%</strong> of time is spent on research projects,
						quasi-artistic creations and/or longstanding tasks that they believe
						will make the company better. These can straddle the fence between
						quixotic and practical, aspirational and reflexive, intuitive and
						fact-based. They can be based on vague premonitions. While striving
						for success, it is ok to fail in research or creation, as long as
						the knowledge is shared.
					</ListItem>
					<ListItem lineHeight="1.6">
						<strong>20%</strong> of time is spent on whatever they want.
						Education, open-source, or business-as-usual. The only ask is that
						it could potentially benefit others. If it is open-source, it should
						be on the company's GitHub. If it is education, the learnings should
						be shared with some other group inside or outside the company.
					</ListItem>
				</List>
				<Text mb={4}>
					While the 60% (core) and 20% (research) should pertain to the
					individual's domains as agreed upon by the team, the other 20% can be
					anything.
				</Text>
				<Text mb={4}>
					Outside this split falls things like retros, standups, sprint
					planning, team days, interviews, customer support, 1-on-1s and
					anything else that exists on a round-robin or all-hands-on-deck
					schedule.
				</Text>
			</SingleSection>
		</Layout>
	)
}

export default JobsPage
