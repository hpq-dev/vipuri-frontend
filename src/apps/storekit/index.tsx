import { useStoreKitStore } from "@/stores/apps";
import { Actions } from "./components/Actions";
import { AddToCart } from "./components/AddToCart";
import { Cart } from "./components/Cart";
import { Colors } from "./components/Colors";
import { Controls } from "./components/Controls";
import { StoreItems } from "./components/Items";
import { Range } from "./components/Range";

export const StoreKit = () => {
  const storeKitStore = useStoreKitStore();
  return (
    <div className="h-screen w-full bg-dark-100">
      <div
        style={{
          background:
            "radial-gradient(41.48% 67.59% at 50% 50%, rgba(17, 17, 17, 0) 0%, #111111 100%)",
        }}
        className="h-full w-full"
      >
        <div className="flex items-center justify-between px-[1.5vw] py-[2.5vh]">
          <div className="flex w-full max-w-[18vw] flex-col items-start justify-start">
            <StoreItems />
            <Range
              min={1}
              max={10}
              value={1}
              onChange={() => {}}
              step={1}
              label={""}
            />
            {storeKitStore.category !== "TATTOOS" && <Colors />}
          </div>
          {storeKitStore.category === "CLOTHES" && <Cart />}
        </div>
        <Controls />
        {storeKitStore.category === "CLOTHES" && <AddToCart />}
        <Actions />
      </div>
    </div>
  );
};
