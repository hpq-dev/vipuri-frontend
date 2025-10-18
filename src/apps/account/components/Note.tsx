import { InfoIcon } from '@/utils/icons';
import { clsx } from 'clsx';

export function Note({
  note,
  className,
}: {
  note: string;
  className?: string;
}) {
  return (
    <div className="flex w-full items-center justify-start gap-[0.5vw]">
      <InfoIcon className={clsx('w-[1.1vw]', className)} />
      <p className="text-[0.6vw] font-medium leading-[1.3vh] text-dark-100">
        {note}
      </p>
    </div>
  );
}
