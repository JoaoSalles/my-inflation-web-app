import type { ColumnDef } from "@tanstack/react-table"
import type { ProductLog } from "@/types/productLog"
import { formatPrice } from "@/utils/formatPrice"
import { formatTime } from "@/utils/formatTime"
import { formatLocation } from "@/utils/location"

export const productLogColumns: ColumnDef<ProductLog>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    accessorKey: "location",
    header: "Localização",
    cell: ({ row }) => formatLocation(row.original.location),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => (row.original.time ? formatTime(row.original.time) : ""),
  },
]
