import React from 'react';
import { render } from '@testing-library/react';

import ChakraTheme from './chakra-theme';

describe('ChakraTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChakraTheme />);
    expect(baseElement).toBeTruthy();
  });
});
