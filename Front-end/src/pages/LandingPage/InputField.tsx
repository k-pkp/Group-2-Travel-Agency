import React from "react";

interface InputFieldProps { // Interface defining the structure of the props that the InputField component expects to receive.
  label: string;
  value: string;
  leadingIcon?: string;
  trailingIcon?: string;
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({// Functional component InputField receiving props.
  label,
  value,
  leadingIcon,
  className = "",
  onChange,
}) => {
  return (
    <div className={className}>
      <div className="w-full bg-white rounded border border-solid border-zinc-500">
        <div
          className={`flex items-center py-1 ${leadingIcon ? "pr-4" : "pl-4"} w-full rounded`}
        >
          {leadingIcon && (
            <div className="flex flex-col justify-center items-center self-stretch my-auto w-12 min-h-12">
              <div className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-10 rounded-[100px]">
                <div className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
                  <img
                    src={leadingIcon}
                    className="object-contain self-stretch my-auto w-6 aspect-square"
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}

          <div
            className={`flex relative flex-col flex-1 shrink justify-center items-start self-stretch my-auto  min-h-10 text-zinc-900`}
          >
            {onChange ? (
              <input
              type="text"
              onChange={(e) => {onChange(e.target.value);}}
              placeholder="Enter your destination"
              className="z-0 self-stretch text-base w-full bg-transparent outline-none"
              />
            ) : (
              <div className="z-0 self-stretch text-base">{value}</div>
            )}
            <div
              className={`absolute ${leadingIcon ? "-top-4 -left-9" : "-left-1 -top-4"} z-0 self-stretch px-1 text-sm bg-white text-neutral-900`}
            >
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;
