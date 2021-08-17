import { useContext } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionButton,
	AccordionIcon,
	Heading,
	Flex,
	Box,
	Code,
	Stack,
	Text,
	Link,
} from '@chakra-ui/react';
import { GitLabIcon, GitHubIcon, BitbucketIcon } from '@frontend/chakra-theme';
import { UserContext } from 'apps/webapp/utils/user';
import ClientSecretInput from '../molecules/client-secret-input';

const CIDocumentation = ({
	manualClientSecret,
	onDemoPlan,
}: {
	manualClientSecret?: string;
	onDemoPlan: boolean;
}) => {
	const { project } = useContext(UserContext);
	return (
		<>
			<Box mx={2} mb={4} lineHeight="tall">
				<Text>
					Use the{' '}
					<Link
						isExternal
						href="https://hub.docker.com/r/meeshkan/test-trigger"
					>
						<Code px={2} py={1} borderRadius="md" fontWeight="700">
							meeshkan/test-trigger
						</Code>{' '}
						Docker container
					</Link>{' '}
					to trigger Meeshkan test runs for your project within your CI
					pipeline.
				</Text>
				<Heading fontSize="18px" fontWeight="500" mt={4} mb={2}>
					Client secret
				</Heading>
				<ClientSecretInput manualClientSecret={manualClientSecret} />
				<Text mt={4}>
					Below are working examples for each of the popular CI providers that
					you can use as a reference:
				</Text>
			</Box>

			<Accordion allowMultiple>
				<AccordionItem border="none" isDisabled={onDemoPlan}>
					<Heading as="h2">
						<AccordionButton _hover={{ color: 'blue.500' }} py={4}>
							<Flex align="center" flex="1" textAlign="left">
								<GitHubIcon mr={3} />
								GitHub Actions
							</Flex>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel py={4} lineHeight="tall">
						<Code display="block" whiteSpace="pre" p={5} rounded="lg">
							{`# .github/workflows/meeshkan.yml
name: Run Meeshkan tests

on: pull_request

jobs:
  run-tests:
    runs-on: ubuntu-latest
    steps:

      # The first step should take care of the preview deployment creation
      - name: Wait for preview deployment
        id: wait-for-preview
        uses: patrickedqvist/wait-for-vercel-preview@master
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          max_timeout: 200

      # The second step passes the preview deployment to the Meeshkan GitHub Action
      - name: Run Meeshkan tests
        uses: meeshkan/action@master
        with:
          client_id: \${{ secrets.MEESHKAN_CLIENT_ID }}
          client_secret: \${{ secrets.MEESHKAN_CLIENT_SECRET }}
          url: \${{ steps.wait-for-preview.outputs.url }}`}
						</Code>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none" isDisabled={onDemoPlan}>
					<Heading as="h2">
						<AccordionButton _hover={{ color: 'blue.500' }} py={4}>
							<Flex align="center" flex="1" textAlign="left">
								<GitLabIcon mr={3} />
								GitLab CI/CD
							</Flex>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel py={4} lineHeight="tall">
						<Stack spacing={4}>
							<Code display="block" whiteSpace="pre" p={5} rounded="lg">
								{`# config.toml
privileged = true`}
							</Code>
							<Code display="block" whiteSpace="pre" p={5} rounded="lg">
								{`# .gitlab-ci.yml
stages:
  - deploy
  - test

preview-deploy:
 stage: deploy
  image: node:13.10.1-alpine3.10

  script:
    - echo "Your preview deployment process goes here..."
    - echo "Here's an example using Vercel's preview deployments:"
    - npm i -g vercel
    - DEPLOYMENT_URL=$(vercel -t $VERCEL_TOKEN --confirm)
    - echo $DEPLOYMENT_URL > preview-deployment-url.txt

  artifacts:
    when: on_success
    paths:
      - preview-deployment-url.txt

meeshkan-tests:
  stage: test
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker pull meeshkan/test-trigger:latest
    - docker run
      -e CI_PROJECT_NAMESPACE=$CI_PROJECT_NAMESPACE
      -e CI_PROJECT_NAME=$CI_PROJECT_NAME
      -e CI_COMMIT_BRANCH=$CI_COMMIT_BRANCH
      -e CI_COMMIT_SHA=$CI_COMMIT_SHA
      -e CI_PROVIDER="gitlab"
      -e MEESHKAN_URL=$(cat preview-deployment-url.txt)
      -e MEESHKAN_CLIENT_ID="${project?.id || `$MEESHKAN_CLIENT_ID`}"
      -e MEESHKAN_CLIENT_SECRET="${
				project?.configuration?.clientSecret || `$MEESHKAN_CLIENT_SECRET`
			}"
      meeshkan/test-trigger:latest`}
							</Code>
						</Stack>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none" isDisabled={onDemoPlan}>
					<Heading as="h2">
						<AccordionButton py={4} _hover={{ color: 'blue.500' }}>
							<Flex align="center" flex="1" textAlign="left">
								<BitbucketIcon mr={3} />
								Bitbucket Pipelines
							</Flex>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel py={4} lineHeight="tall">
						<Code display="block" whiteSpace="pre" p={5} rounded="lg">
							{`# bitbucket-pipelines.yml
image: node:latest

pipelines:
  default:
    - step:
        name: 'Create Preview deployment'
        script:
          - echo "Your preview deployment process goes here..."
          - echo "Here's an example using Vercel's preview deployments:"
          - npm i -g vercel
          - DEPLOYMENT_URL=$(vercel -t $VERCEL_TOKEN --confirm)
          - echo $DEPLOYMENT_URL > preview-deployment-url.txt
        artifacts:
          - preview-deployment-url.txt

    - step:
        name: 'Trigger Meeshkan test run'
        services:
          - docker
        script:
          - pipe: docker://meeshkan/test-trigger:latest
            variables:
              CI_PROVIDER: "bitbucket"
              MEESHKAN_URL: $(cat preview-deployment-url.txt)
              MEESHKAN_CLIENT_ID: "${project?.id || `$MEESHKAN_CLIENT_ID`}"
              MEESHKAN_CLIENT_SECRET: "${
								project?.configuration?.clientSecret ||
								`$MEESHKAN_CLIENT_SECRET`
							}"`}
						</Code>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default CIDocumentation;
