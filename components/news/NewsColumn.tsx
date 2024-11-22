"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"


export const columns: ColumnDef<NewsType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (<Link href={`/news/${row.original._id}`} className="hover:text-red-500 hover:italic">{row.original.title}</Link>),
	},
	{
		accessorKey: "content",
		header: "Content",
		cell: ({ row }) => <p>{row.original.content}</p>,
	},
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => <img src={row.original.image} alt={row.original.title} className="h-10 w-10 object-cover" />,
	},
	{
		accessorKey: "infomation",
		header: "Article",
		cell: ({ row }) => {
			const info = row.original.information;
			console.log("info :", info);
			
			// Kiểm tra nếu `information` là một mảng
			return <p>{Array.isArray(info) ? info.length : 0}</p>;
		},
	},
	


	
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <Delete id={row.original._id} item="news" />
	},
]