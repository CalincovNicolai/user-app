import { IFadeLoaderModel } from '@/utils/types';

export default function FadeLoaderWrapper({ loading, skeleton, children }: IFadeLoaderModel) {
  return (
    <div className="relative w-full min-w-[640px] xl:min-w-[1080px] mb-10">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          loading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
        }`}
      >
        {skeleton}
      </div>

      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
}
