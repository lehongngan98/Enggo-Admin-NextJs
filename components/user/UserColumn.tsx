"use client"

import { UserType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Delete from "../custom ui/Delete"


export const columns: ColumnDef<UserType>[] = [
	{
		accessorKey: "fullname",
		header: "Họ và tên",
		cell: ({ row }) => row.original.fullname,
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => row.original.email,		
	},
	{
		accessorKey: "photoURL",
		// cell: ({ row }) => <Image src={row.original.photoURL} alt={row.original.fullname} width={40} height={40} className="rounded-full" />,
		cell: ({ row }) => <img src={row.original.photoURL} alt={row.original.fullname} className="w-10 h-10 rounded-full" />,
	},
	{
		accessorKey: "role",
		header: "Vai trò",
		cell: ({ row }) => row.original.role,
	},
	{
		id: "actions",
		header: "Hành động",
		cell: ({ row }) => <Delete id={row.original._id} item="user" />
	}
]