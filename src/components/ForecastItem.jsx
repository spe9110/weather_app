import React, { memo } from "react";
const ForecastItem = ({ icon, hour, temperature}) => {
  return (
    <div className='w-full h-[50px] bg-neutral-600 flex flex-row justify-between items-center gap-2 rounded-md px-[8px] mt-3 border border-neutral-500'>
      <div className='flex flex-row justify-center items-center gap-2 lg:gap-1'>
        <img className='w-10 xs:w-11 md:w-12' src={icon} alt="icon_1" />
        <h3 className='hour text-md font-medium  xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-neutral-50'>{hour}</h3>
      </div>
      <h3 className='temperature text-md font-normal xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-neutral-300'>{temperature}</h3>
    </div>
  )
}

export default memo(ForecastItem)