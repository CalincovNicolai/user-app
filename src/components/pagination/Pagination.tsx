import { IPaginationModel } from '@/utils/types';

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  disabled = false,
}: IPaginationModel) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={disabled}
            className={`px-3 py-1 rounded ${
              pageNum === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
