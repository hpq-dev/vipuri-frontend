import { UserIcon } from './User';
import { clsx } from 'clsx';

export const UsersIcon = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={clsx('flex items-center justify-center', props.className)}>
      <div className="flex items-center justify-center">
        <UserIcon className="w-[0.6vw] stroke-black stroke-1" />
        <UserIcon className="w-[0.6vw] stroke-black stroke-1" />
      </div>
      <UserIcon className="absolute mt-[1.5vh] w-[0.6vw] stroke-black stroke-2" />
    </div>
  );
};
