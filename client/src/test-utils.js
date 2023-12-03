import React from 'react';
import { render } from '@testing-library/react';

const AllProviders = ({ children }) => ({ children });

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
