'use client';
import React from 'react';
import { StockAnalysisPost } from '@/app/stock-analysis/types';
import { PostItem } from '@/components/postItem';
import { SanityDocument } from 'next-sanity';
import { SelectFilter } from '@/components/selectFilter';
import { useStockPostList } from '@/hooks/useStockPostList';

export const StockPostsList = ({
  posts,
}: {
  posts: readonly StockAnalysisPost[];
}) => {
  const {
    selectedOption,
    handleSelectChange,
    searchTerm,
    handleSearchChange,
    dateFilter,
    handleDateChange,
    visiblePosts,
  } = useStockPostList(posts);

  return (
    <>
      <div className='mb-4 flex items-center gap-2'>
        <SelectFilter
          posts={posts}
          filter={selectedOption}
          handleFilterChange={handleSelectChange}
        />
        <div>
          <label className='ml-4 font-bold'>Search</label>
          <input
            type='text'
            value={searchTerm}
            placeholder='Search by title...'
            onChange={handleSearchChange}
            className='border border-gray-300 rounded px-2 py-1 ml-2'
          />
        </div>
        <div className='ml-4 flex gap-2 items-center'>
          <label className='font-bold' htmlFor='min'>
            From:
          </label>
          <input
            type='date'
            value={dateFilter.min}
            id='min'
            name='min'
            onChange={handleDateChange}
          />
          <label className='mx-2' htmlFor='max'>
            to
          </label>
          <input
            type='date'
            value={dateFilter.max}
            id='max'
            name='max'
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label className='ml-4 font-bold'>
            Total Posts: {visiblePosts.length}
          </label>
        </div>
      </div>
      <ul className='flex flex-wrap gap-4 justify-between list-none transition-all duration-300'>
        {visiblePosts.map((post) => (
          <PostItem
            key={post._id}
            post={post as unknown as SanityDocument}
            baseURL='/stock-analysis/'
          />
        ))}
      </ul>
    </>
  );
};
