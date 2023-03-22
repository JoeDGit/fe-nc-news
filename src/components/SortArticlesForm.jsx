import React from 'react';

export default function SortArticlesForm({
  sortBy,
  handleSortChange,
  orderBy,
  handleOrderChange,
}) {
  return (
    <div
      className="flex md:ml-4 gap-[0.3em] justify-start mb-2 text-xs items-start "
      id="sorting-containers"
    >
      <div id="sort-query">
        <label htmlFor="sort-by-selector">Sort articles by: </label>
        <select
          className="text-black [&>*]:text-black"
          id="sort-by-selector"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="votes">Votes</option>
          <option value="comment_count">Comment count</option>
          <option value="created_at">Date posted</option>
        </select>
      </div>
      <div id="sort-order">
        <form>
          <label htmlFor="sort-order">Sort order: </label>
          <select
            className="text-black [&>*]:text-black"
            value={orderBy}
            onChange={handleOrderChange}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </form>
      </div>
    </div>
  );
}
