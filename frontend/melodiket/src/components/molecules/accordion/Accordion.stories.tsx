import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <Accordion label="공연 정보">
          <div>hi</div>
          <div>hello</div>
        </Accordion>
        <Accordion label="예매 정보">
          <div>me</div>
          <div>no</div>
        </Accordion>
      </div>
    );
  },
};
