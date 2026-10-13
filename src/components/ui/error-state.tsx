import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'មានបញ្ហាមួយបានកើតឡើង',
  message,
  onRetry,
  retryLabel = 'ព្យាយាមម្តងទៀត'
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl glass-panel text-center max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-[#F4F3EF] mb-1">{title}</h3>
      <p className="text-sm text-[#A9B8CC] mb-6">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#142A4D] hover:bg-[#1E3E72] text-[#F4F3EF] text-sm font-medium border border-white/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}
