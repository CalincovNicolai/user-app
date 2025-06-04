import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { IRefreshButtonModel } from '@/utils/types';

export default function RefreshButton({
  onClick,
  loading = false,
  disabled = false,
  cooldownLeft = 0,
  title = 'Refresh',
}: IRefreshButtonModel) {
  const isDisabled = disabled || cooldownLeft > 0;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || loading}
      className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 min-w-[2.5rem] flex justify-center items-center"
      title={title}
    >
      {cooldownLeft > 0 ? (
        <span className="text-xs">{cooldownLeft}s</span>
      ) : (
        <ArrowPathIcon className="w-5 h-5" />
      )}
    </button>
  );
}
