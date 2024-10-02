import type { Meta, StoryObj } from '@storybook/react';
import SeatRadio from './SeatRadio';
import { useState } from 'react';

const meta: Meta<typeof SeatRadio> = {
  component: SeatRadio,
};

export default meta;
type Story = StoryObj<typeof SeatRadio>;

export const Default: Story = {};

export const Select: Story = {
  render: () => {
    const data: boolean[][] = [
      [true, false, true, false, true, true, false, true, false, true],
      [false, true, false, false, true, false, true, false, true, true],
      [true, true, false, true, false, false, true, false, false, true],
      [false, false, true, true, false, true, true, false, true, false],
      [true, false, true, false, false, true, false, true, true, false],
      [false, true, false, true, false, false, true, true, false, true],
      [true, false, true, false, true, false, false, true, false, false],
      [false, true, true, false, true, true, false, false, true, true],
      [true, false, false, true, false, true, false, true, false, false],
      [false, true, false, true, true, false, true, false, true, true],
    ];

    const [selected, setSelected] = useState<{ row: number; col: number }>({
      row: -1,
      col: -1,
    });

    const handleChange = (row: number, col: number) => {
      setSelected({ row, col });
    };

    return (
      <>
        <div className="flex flex-col gap-1 w-96 flex-wrap">
          {data.map((line, row) => (
            <div key={row} className="flex flex-row gap-1">
              {line.map((available, col) => (
                <SeatRadio
                  key={row * data.length + col}
                  name="radios"
                  row={row}
                  col={col}
                  checked={row === selected.row && col === selected.col}
                  disabled={!available}
                  onChange={handleChange}
                />
              ))}
            </div>
          ))}
        </div>
        <p>
          row: {selected.row}, col: {selected.col}
        </p>
      </>
    );
  },
};
