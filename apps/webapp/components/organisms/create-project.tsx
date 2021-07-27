import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Heading, Box, Flex, Button, Text } from '@chakra-ui/react';
import Card from '../atoms/card';
import CreateProjectForm from '../molecules/create-project-form';
import { CreateTestCases } from '../molecules/create-test-cases';
import { TestRunCadence } from '../molecules/test-run-cadence';

const CreateProject = () => {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [loading, setLoading] = useState(false);
	const [projectName, setProjectName] = useState(null);
	const [projectID, setProjectID] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);

	const router = useRouter();

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Create a project'
		: step === 2
		? 'How would you like to create Test Cases?'
		: 'At what cadence would you like test runs to happen?';
	const submitButtonText = step === 3 ? 'Finish' : 'Next step';

	return step === 1 ? (
		<CreateProjectForm
			isOnboarding={false}
			loading={loading}
			setLoading={setLoading}
			setProjectName={setProjectName}
			setStep={setStep}
			step={step}
			setProjectID={setProjectID}
			setClientSecret={setClientSecret}
		/>
	) : step === 2 ? (
		<CreateTestCases
			isOnboarding={false}
			projectName={projectName}
			step={step}
			loading={loading}
			setStep={setStep}
			projectID={projectID}
		/>
	) : (
		<TestRunCadence
			projectID={projectID}
			isOnboarding={false}
			step={step}
			setLoading={setLoading}
			projectName={projectName}
			loading={loading}
			setStep={setStep}
			clientSecret={clientSecret}
		/>
	);
};

export default CreateProject;
