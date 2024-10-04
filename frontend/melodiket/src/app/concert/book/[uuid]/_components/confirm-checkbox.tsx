import AllCheckbox from '@/components/molecules/checkbox/AllCheckbox';
import LabelCheckbox from '@/components/molecules/checkbox/LabelCheckbox';
import { TICKET_BOOK_POLICY_DATAS } from '@/constants/ticketBook';
import { useEffect, useState } from 'react';

interface ConfirmCheckboxProps {
  onChangeValid: (value: boolean) => void;
}

const ConfirmCheckbox = ({ onChangeValid }: ConfirmCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(
    TICKET_BOOK_POLICY_DATAS.map(() => false)
  );

  const handleCheck = (targetIdx: number) => {
    setIsChecked((prev) =>
      prev.map((value, idx) => (targetIdx === idx ? !value : value))
    );
  };

  const handleCheckAll = (value: boolean) => {
    setIsChecked(isChecked.map(() => value));
  };

  const isCheckedAll = isChecked.every((value) => value);

  useEffect(() => {
    onChangeValid(
      isChecked
        .filter((_, idx) => TICKET_BOOK_POLICY_DATAS[idx].isEssential)
        .every((value) => value)
    );
  }, [isChecked, onChangeValid]);

  return (
    <div className="space-y-4">
      <AllCheckbox
        label="전체 동의"
        isChecked={isCheckedAll}
        onChange={handleCheckAll}
      />
      {TICKET_BOOK_POLICY_DATAS.map((ticket, idx) => (
        <LabelCheckbox
          key={ticket.key}
          label={ticket.label}
          isChecked={isChecked[idx]}
          onChange={() => handleCheck(idx)}
        />
      ))}
    </div>
  );
};

export default ConfirmCheckbox;
