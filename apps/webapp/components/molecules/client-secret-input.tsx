import React, { useContext, useState } from 'react';
import {
  Input,
  IconButton,
  Button,
  Flex,
  useColorModeValue,
  ButtonGroup,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';
import { useClipboard } from '../../hooks/use-clipboard';
import { eightBaseClient } from '../../utils/graphql';
import { ROTATE_CLIENT_SECRET } from '../../graphql/project';
import { useToaster } from '../../hooks/use-toaster';

const ClientSecretInput = () => {
  const { project, idToken } = useContext(UserContext);
  const [clientSecret, setClientSecret] = useState(
    project.configuration.clientSecret
  );
  const [loading, setLoading] = useState(false);
  const refreshButtonBorderColor = useColorModeValue('gray.200', 'gray.700');
  const { onCopy } = useClipboard({
    toastTitle: "This project's client secret was copied to clipboard.",
    toastMessage: 'Use it in your integrations to insure a secure connection.',
    text: project?.configuration?.clientSecret,
    status: 'info',
  });

  const toaster = useToaster();
  const client = eightBaseClient(idToken);

  const refreshClientSecret = () => {
    setLoading(true);
    client
      .request(ROTATE_CLIENT_SECRET, {
        projectID: project.id,
      })
      .then((res) => {
        toaster({
          title: 'Successfully refreshed client secret.',
          description:
            "Copy the client secret and replace in your repository secrets to ensure test triggers work as expected.",
          status: 'success',
        });
        setClientSecret(res.projectUpdate.configuration.clientSecret);
        setLoading(false);
      });
  };

  return (
    <Flex>
      <Input
        id="client-secret-input"
        value={clientSecret}
        onClick={onCopy}
        isReadOnly
        colorScheme='gray'
        variant="outline"
        borderColor={refreshButtonBorderColor}
        size="md"
        borderRightRadius="0"
      />
      <IconButton
        id="copy-client-secret"
        icon={<CopyIcon />}
        aria-label="Copy client secret"
        onClick={onCopy}
        borderLeftRadius="0"
        colorScheme='gray'
        variant="outline"
        borderColor={refreshButtonBorderColor}
        size="md"
      />
      <Button
        onClick={refreshClientSecret}
        isLoading={loading}
        loadingText="Refreshing"
        ml={4}
        colorScheme='gray'
        variant="outline"
        borderColor={refreshButtonBorderColor}
        size="md"
      >
        Rotate secret
      </Button>
    </Flex>
  );
};

export default ClientSecretInput;
