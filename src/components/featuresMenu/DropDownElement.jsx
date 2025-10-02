import { FaCheck } from "react-icons/fa6";

export const DropDownElement = ({ title, valueOne, valueTwo, selectedUnit, setSelectedUnit }) => {
  return (
    <div className="bg-neutral-700 border-b border-neutral-500 p-2 text-white text-[14px] md:text-[16px]">
      <h4 className="text-sm text-neutral-400">{title}</h4>

      {/* Option One */}
      <div
        onClick={() => setSelectedUnit(valueOne.value)}
        className={`flex justify-between items-center py-[4px] px-[8px] cursor-pointer rounded-md 
          ${selectedUnit === valueOne.value ? "bg-neutral-600" : "hover:bg-neutral-600"}`}
      >
        <span className="text-md text-neutral-200">{valueOne.label}</span>
        {selectedUnit === valueOne.value && <FaCheck />}
      </div>

      {/* Option Two */}
      <div
        onClick={() => setSelectedUnit(valueTwo.value)}
        className={`flex justify-between items-center py-[4px] px-[8px] cursor-pointer rounded-md 
          ${selectedUnit === valueTwo.value ? "bg-neutral-600" : "hover:bg-neutral-600"}`}
      >
        <span className="text-md text-neutral-200">{valueTwo.label}</span>
        {selectedUnit === valueTwo.value && <FaCheck />}
      </div>
    </div>
  );
};
