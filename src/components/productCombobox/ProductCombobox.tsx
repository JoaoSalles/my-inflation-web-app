import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useProductStore } from '@/store/products'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { cn } from '@/lib/cn'

interface ProductComboboxProps {
  value: string
  onChange: (name: string) => void
  className: string | undefined
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

// cmdk filter that ignores case and accents (e.g. "feijao" matches "Feijão")
const accentInsensitiveFilter = (value: string, search: string) =>
  norm(value).includes(norm(search)) ? 1 : 0

export function ProductCombobox({ value, onChange, className }: ProductComboboxProps) {
  const [open, setOpen] = useState(false)
  const { data, isPending, error } = useProducts()
  const { setProducts } = useProductStore()

  useEffect(() => {
    if (data?.data) setProducts(data.data)
  }, [data, setProducts])

  if (isPending) {
    return (
      <Button variant="outline" disabled className={cn('w-50 justify-between mr-1', className)}>
        Loading…
      </Button>
    )
  }

  if (error && !data) {
    return (
      <Button variant="outline" disabled className={cn('w-50 justify-between mr-1', className)}>
        Error loading products
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-50 justify-between truncate mr-1', className)}
        >
          <span className="truncate">{value || 'Selecione um produto'}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command filter={accentInsensitiveFilter}>
          <CommandInput placeholder="Buscar produto..." />
          <CommandList>
            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
            <CommandGroup>
              {data.data.map((product) => (
                <CommandItem
                  key={product.name}
                  value={product.name}
                  onSelect={() => {
                    onChange(product.name)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === product.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
