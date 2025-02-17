import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { NoticeCard } from './NoticeCard';
import Filters from './Filters';
import Webheader from '../Webapp/Notices/Webheader';
import Header from '../Webapp/Home/HomeHeader';

function AllNotices() {
  const [notices, setNotices] = useState([]);
  const [allNotices, setAllNotices] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', location: '', newspaper: '', date: '' });
  const [sortBy, setSortBy] = useState('date-desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.epublicnotices.in/notices');
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        setAllNotices(data);
        applyFiltersAndSort(data, filters, sortBy);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);
  
  const applyFiltersAndSort = (data, currentFilters, currentSortBy) => {
    let filteredNotices = [...data];

    if (currentFilters.search) {
      filteredNotices = filteredNotices.filter(notice =>
        notice.notice_title?.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }

    if (currentFilters.category) {
      filteredNotices = filteredNotices.filter(notice => notice.category === currentFilters.category);
    }

    if (currentFilters.location) {
      filteredNotices = filteredNotices.filter(notice =>
        notice.location?.toLowerCase().includes(currentFilters.location.toLowerCase())
      );
    }

    if (currentFilters.newspaper) {
      filteredNotices = filteredNotices.filter(notice =>
        notice.newspaper?.toLowerCase().includes(currentFilters.newspaper.toLowerCase())
      );
    }

    if (currentFilters.date) {
      filteredNotices = filteredNotices.filter(notice =>
        new Date(notice.date).toISOString().split('T')[0] === currentFilters.date
      );
    }

    if (currentSortBy === 'date-desc') {
      filteredNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentSortBy === 'date-asc') {
      filteredNotices.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setNotices(filteredNotices.slice(0, visibleCount));
    setAllNotices(filteredNotices);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => {
      const updatedFilters = { ...prev, ...newFilters };
      applyFiltersAndSort(allNotices, updatedFilters, sortBy);
      return updatedFilters;
    });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    applyFiltersAndSort(allNotices, filters, sort);
  };

  const loadMore = () => {
    const newVisibleCount = visibleCount + 9;
    setVisibleCount(newVisibleCount);
    setNotices(allNotices.slice(0, newVisibleCount));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header/>
      <main className="mt-10 max-w-7xl mx-auto px-6 sm:px-8">
        <h1 className="text-4xl font-semibold text-[#001A3B] mb-6 text-center">
          All Notices
        </h1>
        <Filters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

        {error && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6 flex items-center gap-3 shadow-sm">
            <AlertCircle className="text-red-600" size={24} />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-t-transparent border-[#001A3B] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>

            {visibleCount < allNotices.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-[#A99067] text-white font-semibold rounded-xl shadow-lg hover:bg-[#8B785A] transition-transform transform hover:-translate-y-1"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AllNotices;
