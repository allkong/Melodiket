interface ConcertDescriptionProps {
  description?: string;
}

const ConcertDescription = ({ description }: ConcertDescriptionProps) => {
  return (
    <div className="w-full">
      <p>{description}</p>
    </div>
  );
};

export default ConcertDescription;
