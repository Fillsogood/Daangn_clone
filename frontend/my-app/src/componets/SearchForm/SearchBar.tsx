import { useState } from 'react';
import styles from '../../componets/SearchForm/SearchBar.module.css';
import React from 'react';

interface Props {
  onSearch: (_keyword: string, _sort: SortOption) => void;
}

type SortOption = 'recent' | 'price_asc' | 'price_desc';

const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');
  const [sort, setSort] = useState<SortOption>('recent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input, sort);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <span className={styles.category}>중고거래</span>

      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
        <option value="recent">최신순</option>
        <option value="price_asc">가격 낮은순</option>
        <option value="price_desc">가격 높은순</option>
      </select>

      <button type="submit" className={styles.submitBtn}>
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
