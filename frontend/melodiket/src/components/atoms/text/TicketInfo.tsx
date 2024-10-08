import clsx from 'clsx';

interface TicketInfoProps {
  fields: { label: string; value: string }[];
  size?: 'sm' | 'md';
}

const TicketInfo = ({ fields, size = 'md' }: TicketInfoProps) => (
  <div
    className={clsx('flex flex-col', {
      'text-xs': size === 'sm',
      'text-sm': size === 'md',
    })}
  >
    {fields.map((field) => (
      <div key={field.label} className="flex">
        <p
          className={clsx('text-gray-400 min-w-12', {
            'min-w-12': size === 'sm',
            'min-w-20': size === 'md',
          })}
        >
          {field.label}
        </p>
        <p>{field.value}</p>
      </div>
    ))}
  </div>
);

export default TicketInfo;
