import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';
import { useRef, useState } from 'react';

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Uncontrolled: Story = {
  render: () => {
    const [state, setState] = useState(1);
    const ref = useRef<HTMLInputElement>(null);

    return (
      <>
        <SearchInput ref={ref} />
        <p>{ref.current?.value}</p>
        <button onClick={() => setState(state * -1)}>re-rendering</button>
      </>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <>
        <SearchInput value={value} onChange={setValue} />
        <p>{value}</p>
      </>
    );
  },
};
