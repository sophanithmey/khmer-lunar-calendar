interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'កំពុងផ្ទុក...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#142A4D]" />
        <div className="absolute inset-0 rounded-full border-2 border-[#E8BF70] border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-[#A9B8CC] animate-pulse">{message}</p>
    </div>
  );
}
