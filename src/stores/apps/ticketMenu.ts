import { BugIcon, QuestionIcon, ReportIcon } from "@/utils/icons/ticketMenu";
import { create } from "zustand";
import { type JSX } from "react";

interface ITicketMenuOptionFieldBase {
  identifier: string;
  placeholder: string;
  type: "input" | "textarea" | "select";
}

interface ITicketMenuOptionFieldSelect extends ITicketMenuOptionFieldBase {
  type: "select";
  options: { value: string; label: string }[];
}

type ITicketMenuOptionFiled =
  | (Omit<ITicketMenuOptionFieldBase, "type" | "options"> & {
      type: "input" | "textarea";
    })
  | ITicketMenuOptionFieldSelect;

interface ITicketMenuOption {
  identifier: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  fields: ITicketMenuOptionFiled[];
}

interface ITicketMenuStore {
  selectedIdentifierOption: string | null;
  staffOnDuty: number;
  options: ITicketMenuOption[];

  setStaffOnDuty: (count: number) => void;
  setSelectedIdentifierOption: (option: string | null) => void;
}

export const useTicketMenuStore = create<ITicketMenuStore>((set) => ({
  selectedIdentifierOption: null,
  staffOnDuty: 0,
  options: [
    {
      identifier: "ticket_player",
      label: "Raporteaza jucator",
      icon: ReportIcon,
      fields: [
        { identifier: "player_id", placeholder: "ID Jucator", type: "input" },
        {
          identifier: "description",
          placeholder: "Descrie problema...",
          type: "textarea",
        },
      ],
    },
    {
      identifier: "ticket_bug",
      label: "Raporteaza bug",
      icon: BugIcon,
      fields: [
        { identifier: "bug_title", placeholder: "Titlu Bug", type: "input" },
        {
          identifier: "priority",
          placeholder: "Selectează prioritatea",
          type: "select",
          options: [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "critical", label: "Critical" },
          ],
        },
        {
          identifier: "description",
          placeholder: "Descrie bug-ul...",
          type: "textarea",
        },
      ],
    },
    {
      identifier: "ticket_question",
      label: "Am o intrebare",
      icon: QuestionIcon,
      fields: [
        {
          identifier: "description",
          placeholder: "Descrie intrebare...",
          type: "textarea",
        },
      ],
    },
  ],

  setStaffOnDuty: (count) => set({ staffOnDuty: count }),
  setSelectedIdentifierOption: (identifier) =>
    set({ selectedIdentifierOption: identifier }),
}));
