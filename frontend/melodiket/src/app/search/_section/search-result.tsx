interface SearchResultProps {
  query: string;
}

const SearchResult = ({ query }: SearchResultProps) => {
  return (
    <div className="flex flex-col flex-grow h-0 w-full overflow-y-auto">
      {query}
    </div>
  );
};

export default SearchResult;
