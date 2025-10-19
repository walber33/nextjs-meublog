export const SelectFilter = ({
  posts,
  filter,
  handleFilterChange,
}: {
  posts: readonly { type: string }[];
  filter: string;
  handleFilterChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <label htmlFor='filter' className='mr-2 font-bold'>
        Filter by Type:
      </label>
      <select
        id='filter'
        value={filter}
        onChange={(e) => handleFilterChange(e)}
        className='border border-gray-300 rounded px-2 py-1'
      >
        <option value='all'>All</option>
        {Array.from(new Set(posts.map((post) => post.type))).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </>
  );
};
