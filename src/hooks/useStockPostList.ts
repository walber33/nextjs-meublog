import { useState, useMemo } from 'react';
import React from 'react';
import { StockAnalysisPost } from '@/app/stock-analysis/types';
import { toStandardDate } from '@/utils/dateUtils';

export const useStockPostList = (posts: readonly StockAnalysisPost[]) => {

  const [selectedOption, setSelectedOption] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<{ min: string; max: string }>({
    min: '',
    max: '',
  });

  const visiblePosts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    const normalizedOption = selectedOption.toLowerCase().trim();

    return posts.filter((post) => {
      const filterOption =
        normalizedOption === 'all' ||
        post.type.toLowerCase().trim() === normalizedOption;
      const filterSearch =
        normalizedSearchTerm === '' ||
        post.title.toLowerCase().includes(normalizedSearchTerm);
      const filterMin =
        dateFilter.min === '' ||
        toStandardDate(post.publishedAt) >= toStandardDate(dateFilter.min);
      const filterMax =
        dateFilter.max === '' ||
        toStandardDate(post.publishedAt) <= toStandardDate(dateFilter.max);
      return filterOption && filterSearch && filterMin && filterMax;
    });
  }, [selectedOption, searchTerm, dateFilter, posts]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDateFilter((prev) => ({ ...prev, [name]: value }));
  };

  return {
    selectedOption,
    handleSelectChange,
    searchTerm,
    handleSearchChange,
    dateFilter,
    handleDateChange,
    visiblePosts,
  };
};