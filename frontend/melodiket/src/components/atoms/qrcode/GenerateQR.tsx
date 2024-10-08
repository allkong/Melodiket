import { QRCodeCanvas } from 'qrcode.react';

interface GenerateQRProps {
  value: string;
}

const GenerateQR = ({ value }: GenerateQRProps) => {
  return (
    <QRCodeCanvas
      value={value}
      title="Melodicket QRCode"
      size={200}
      bgColor="#ffffff"
      fgColor="#17171B"
    />
  );
};

export default GenerateQR;
