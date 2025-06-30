import { MdDarkMode, MdLightMode } from "react-icons/md"
import { FaUsersGear } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { RiEmojiStickerLine } from "react-icons/ri";

import { HiChatAlt2, HiUsers, HiAtSymbol, HiStar } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";

import { BsThreeDotsVertical } from "react-icons/bs";
import { LuArrowRightLeft } from "react-icons/lu"

import { Icon } from "@chakra-ui/react";

import { TbCrown } from "react-icons/tb";

function IconUI({children, color, size,  ...props}) {
	return (
		<Icon 
			size={size || "sm"}
			color={color || { base: "gray.800", _dark: "gray.100" }}
			{...props}
		>{children}</Icon>
	)
}

export {
	IconUI,

	HiChatAlt2,
	MdDarkMode,
	MdLightMode,
	
	FaUsersGear,
	FaUsers,
	
	FiSend,

	HiUsers,
	HiOutlineUsers,
	
	HiAtSymbol,
	HiStar,
	BsThreeDotsVertical,
	LuArrowRightLeft,
	TbCrown,
	RiEmojiStickerLine
}
