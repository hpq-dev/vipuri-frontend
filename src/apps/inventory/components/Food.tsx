import { CupIcon, FoodIcon } from '@/utils/icons/hud';

export const FoodComponent = () => {
  const foodValues = [
    {
      value: 50,
      colorProgress: 'bg-warning',
      color: 'bg-warning/20',
      iconColor: 'text-warning',
      icon: FoodIcon,
    },
    {
      value: 50,
      colorProgress: 'bg-secondary',
      color: 'bg-secondary/20',
      iconColor: 'text-secondary',
      icon: CupIcon,
    },
  ];

  return (
    <div className="absolute bottom-[7vh] right-[22vh]">
      <div className="flex items-center justify-center gap-[1vw]">
        {foodValues.map(
          ({ value, icon: Icon, color, colorProgress, iconColor }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-[1vh]"
            >
              <Icon className={`w-[.8vw] ${iconColor}`} />
              <div className={`relative h-[0.6vh] w-[1.5vw] ${color}`}>
                <div
                  className={`absolute left-[0vh] top-[0vh] h-full ${colorProgress}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
