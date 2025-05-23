import { MdDarkMode, MdLightMode } from "react-icons/md"
import { FaUsersGear } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";

import { HiChatAlt2, HiUsers, HiAtSymbol, HiStar } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";

import { BsThreeDotsVertical } from "react-icons/bs";
import { LuArrowRightLeft } from "react-icons/lu"

function IconUI({children}){
	return (
		<Icon size="sm" 
			color={{ base: "gray.800", _dark: "gray.100" }}
		>{children}</Icon>
	)
}

export {
	HiChatAlt2,
	MdDarkMode,
	MdLightMode,
	
	FaUsersGear,
	FaUsers,
	HiUsers,
	HiOutlineUsers,
	
	HiAtSymbol,
	HiStar,
	BsThreeDotsVertical,
	LuArrowRightLeft
}
