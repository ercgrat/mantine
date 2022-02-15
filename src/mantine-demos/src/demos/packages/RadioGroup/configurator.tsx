import React from 'react';
import { RadioGroup, RadioGroupProps, Radio } from '@mantine/core';

const codeTemplate = (props: string) => `
import { RadioGroup, Radio } from '@mantine/core';

function Demo() {
  return (
    <RadioGroup
     ${props}
    >
      <Radio value="react">React</Radio>
      <Radio value="svelte">Svelte</Radio>
      <Radio value="ng">Angular</Radio>
      <Radio value="vue">Vue</Radio>
    </RadioGroup>
  );
}
`;

function Wrapper(props: RadioGroupProps) {
  return (
    <RadioGroup defaultValue="react" {...props}>
      <Radio value="react">React</Radio>
      <Radio value="svelte">Svelte</Radio>
      <Radio value="ng">Angular</Radio>
      <Radio value="vue">Vue</Radio>
    </RadioGroup>
  );
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  codeTemplate,
  configuratorProps: { multiline: 3 },
  configurator: [
    {
      name: 'orientation',
      type: 'segmented',
      data: [
        { label: 'horizontal', value: 'horizontal' },
        { label: 'vertical', value: 'vertical' },
      ],
      initialValue: 'horizontal',
      defaultValue: 'horizontal',
    },
    { name: 'label', type: 'string', initialValue: 'Select your favorite framework/library' },
    { name: 'description', type: 'string', initialValue: 'This is anonymous' },
    { name: 'error', type: 'string', initialValue: '' },
    { name: 'spacing', type: 'size', initialValue: 'md', defaultValue: 'md' },
    { name: 'size', type: 'size', initialValue: 'sm', defaultValue: 'sm' },
    { name: 'color', type: 'color', initialValue: 'blue', defaultValue: 'blue' },
    { name: 'required', type: 'boolean', initialValue: true, defaultValue: false },
  ],
};
