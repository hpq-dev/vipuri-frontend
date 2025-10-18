import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import type { AnyAbility } from "@casl/ability";

export const AbilityContext = createContext<AnyAbility>(
  null as unknown as AnyAbility
);
export const Can = createContextualCan(AbilityContext.Consumer);
