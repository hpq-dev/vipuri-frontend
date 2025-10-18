import { useCommonStore } from "@/stores";
import { useDealershipStore } from "@/stores/apps";
import { CoinDollarIcon } from "@/utils/icons/dealership";

export const Money = () => {
  const { selectedVehicle } = useDealershipStore();
  const { user } = useCommonStore();
  if (!selectedVehicle) return null;

  const cardBase =
    "skew-x-[-20deg] w-fit transform rounded-[1.3vh] bg-dark-200 px-[.7vw] pb-[0.4vh] pt-[0.8vh] [box-shadow:-0.2vw_0_0_0.0vw_rgba(0,0,0,0.4)]";

  return (
    <div className="flex items-center justify-center gap-[1vw] absolute right-[10vw]">
      <div className={cardBase}>
        <div className="flex skew-x-[20deg] transform items-center gap-[0.3vw]">
          <CoinDollarIcon variant="dark" className="w-[1.1vw] text-success" />
          <div className="flex flex-col items-start leading-[1.8vh]">
            <h1 className="text-[.8vw] font-extrabold italic tracking-wider text-success">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(user?.money ?? 0)}
            </h1>
            <h2 className="text-[.55vw] font-bold italic text-success">CASH</h2>
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <div className="flex skew-x-[20deg] transform items-center gap-[0.3vw]">
          <CoinDollarIcon variant="dark" className="w-[1.1vw] text-warning" />
          <div className="flex flex-col items-start leading-[1.8vh]">
            <h1 className="text-[.8vw] font-extrabold italic tracking-wider text-warning">
              0
            </h1>
            <h2 className="text-[.55vw] font-bold italic text-warning">BANK</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
