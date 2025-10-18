interface IProgressProps {
  value: number;
}

export const Progress = ({ value }: IProgressProps) => {
  return (
    <div className="relative h-[1.2vh] w-[7vw] overflow-visible bg-success/10">
      <div className="h-full bg-success" style={{ width: `${value}%` }} />
    </div>
  );
};
