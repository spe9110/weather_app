import React, { memo } from 'react'
import logo from '../assets/images/logo.svg'
import DropDownButton from './DropDownButton'
import { MdOutlineSettings } from "react-icons/md";

const Header = ({ tempUnit, setTempUnit, windUnit, setWindUnit, precipUnit, setPrecipUnit }) => {
  return (
    <div className='header_top'>
        <img src={logo} alt="logo" width={80} height={80} loading='lazy' className='header_logo'/>
        <DropDownButton 
          icon={<MdOutlineSettings/>} 
          value={"Units"} 
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
          windUnit={windUnit}
          setWindUnit={setWindUnit}
          precipUnit={precipUnit}
          setPrecipUnit={setPrecipUnit}
          />
    </div>
  )
}

export default memo(Header)