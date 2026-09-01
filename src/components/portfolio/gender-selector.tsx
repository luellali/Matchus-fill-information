import genderF from "@/assets/gender-f.png";
import genderM from "@/assets/gender-m.png";
import { cn } from "@/lib/utils";

export type GenderValue = "F" | "M";

type GenderSelectorProps = {
  value: GenderValue | null;
  onChange: (value: GenderValue) => void;
};

const genders: Array<{ value: GenderValue; image: string }> = [
  { value: "F", image: genderF },
  { value: "M", image: genderM },
];

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  return (
    <fieldset className="flex justify-center py-3">
      <legend className="sr-only">选择你的性别</legend>
      <div className="flex h-31 w-53.25 items-end justify-between gap-3">
        {genders.map(({ value: gender, image }) => {
          const selected = value === gender;

          return (
            <label
              key={gender}
              className={cn(
                "group flex w-24 flex-col items-center gap-1 rounded-2xl py-1 text-primary transition-all duration-300 active:scale-95",
                selected ? "-translate-y-1" : "opacity-82 hover:-translate-y-0.5 hover:opacity-100",
              )}
            >
              <input
                className="sr-only"
                type="radio"
                name="gender"
                value={gender}
                checked={selected}
                onChange={() => onChange(gender)}
              />
              <span
                className={cn(
                  "relative grid size-24 place-items-center rounded-[18px] transition-all duration-300",
                  selected ? "bg-white/62 shadow-[0_10px_25px_rgba(111,80,230,0.24)]" : "group-hover:bg-white/42",
                )}
                aria-hidden="true"
              >
                <img
                  src={image}
                  alt=""
                  className="size-22 object-contain drop-shadow-[0_8px_14px_rgba(91,61,151,0.16)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {selected && (
                  <span className="absolute right-2 top-2 size-2.5 rounded-full border-2 border-white bg-primary shadow-sm" />
                )}
              </span>
              <span className="text-[16px] font-bold leading-none">{gender}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
