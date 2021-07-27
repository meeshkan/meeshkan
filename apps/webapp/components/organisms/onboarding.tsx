import React, { useState } from 'react';
import { Heading, Text, Box, Flex, Button } from '@chakra-ui/react';
import CreateProjectForm from '../molecules/create-project-form';
import UpdateProfileForm from '../molecules/update-profile-form';
import { CreateTestCases } from '../molecules/create-test-cases';
import { TestRunCadence } from '../molecules/test-run-cadence';

const Onboarding = () => {
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
	const [loading, setLoading] = useState(false);
	const [projectName, setProjectName] = useState(null);
	const [projectID, setProjectID] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Set up your profile'
		: step === 2
		? 'Create your first project'
		: step === 3
		? 'How would you like to create Test Cases?'
		: 'At what cadence would you like test runs to happen?';
	const backButtonVisibility = isFirstStep ? 'hidden' : 'visible';
	const submitButtonText = step === 4 ? 'Finish' : 'Next step';
	return step === 1 ? (
				<UpdateProfileForm
				  isOnboarding={true}
					setLoading={setLoading}
					setStep={setStep}
					loading={loading}
					step={step}
				/>
			) : step === 2 ? (
				<CreateProjectForm
					setLoading={setLoading}
				  isOnboarding={true}
					setProjectName={setProjectName}
					setStep={setStep}
					loading={loading}
					step={step}
					setProjectID={setProjectID}
					setClientSecret={setClientSecret}
				/>
			) : step === 3 ? (
				<CreateTestCases
				  isOnboarding={true}
					projectName={projectName}
					step={step}
					loading={loading}
					setStep={setStep}
					projectID={projectID}
				/>
			) : (
				<TestRunCadence
				  setLoading={setLoading}
					projectName={projectName}
					projectID={projectID}
				  isOnboarding={true}
					clientSecret={clientSecret}
					step={step}
					loading={loading}
					setStep={setStep}
				/>
			)
};

export default Onboarding;
