import React from 'react'

const DailyForcast = ({ day, icon, temp, tempe}) => {
  return (
    <div className='w-full h-full bg-neutral-600 flex flex-col flex-1 justify-between items-center gap-2 rounded-md px-[4px] py-[16px] xs:py-[24px] sm:py-[20px] md:py-[20px] lg:py-[8px]'>
      <h3 className='temperature text-md xs:text-[16px] md:text-[18px] lg:text-[16px] 2xl:text-[18px] font-normal text-neutral-50'>{day}</h3>
        <img className='w-10 xs:w-11 md:w-12' src={icon} alt="icon_1" />
      <div className='flex flex-row justify-center items-center space-x-5 sm:space-x-9 md:space-x-12 lg:space-x-5'>
        <h3 className='hour text-md xs:text-[20px] md:text-[24px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-medium text-neutral-50'>{temp}</h3>
        <h3 className='hour text-md font-medium xs:text-[20px] md:text-[24px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-neutral-300'>{tempe}</h3>
      </div>
    </div>
  )
}

export default DailyForcast