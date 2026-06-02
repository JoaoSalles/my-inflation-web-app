import { useState } from 'react'
import { ScrollText } from 'lucide-react'
import { useProductLog } from '@/hooks/useProductLog'
import { ProductCombobox } from '@/components/productCombobox'
import { DataTable, productLogColumns } from '@/components/productLogTable'
import { dateToInstant } from '@/utils/dateToInstant'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const PAGE_SIZE = 20

export default function LogsPage() {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [page, setPage] = useState(0)

  const params = selectedProduct
    ? {
        product: selectedProduct,
        from: from ? dateToInstant(from) : undefined,
        to: to ? dateToInstant(to) : undefined,
        page,
        pageSize: PAGE_SIZE,
      }
    : undefined

  const { data, isFetching, error, refetch } = useProductLog(params)

  const rows = data?.data ?? []
  const hasNext = data?.hasNext ?? false
  const isFirstLoad = isFetching && !data

  const handleProductChange = (name: string) => {
    setSelectedProduct(name)
    setPage(0)
  }
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value)
    setPage(0)
  }
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value)
    setPage(0)
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-md">
        <h1 className="mb-0" data-testid="logs-card-header">
          Registro de preços
        </h1>
        <div className="flex flex-wrap items-end gap-md">
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-medium text-muted-foreground">Produto</span>
            <ProductCombobox
              value={selectedProduct}
              onChange={handleProductChange}
              className="w-72"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-medium text-muted-foreground">De</span>
            <Input
              type="date"
              value={from}
              onChange={handleFromChange}
              className="w-44"
              data-testid="from-input"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-medium text-muted-foreground">Até</span>
            <Input
              type="date"
              value={to}
              onChange={handleToChange}
              className="w-44"
              data-testid="to-input"
            />
          </div>
        </div>
      </div>

      <Card className="w-full">
        <CardContent className="pt-6">
          {!selectedProduct && (
            <div
              className="flex flex-col items-center justify-center gap-sm py-16 text-muted-foreground"
              data-testid="initial-state-message"
            >
              <ScrollText size={32} strokeWidth={1.5} />
              <p className="text-sm">
                Selecione um produto acima para ver o registro de preços.
              </p>
            </div>
          )}

          {selectedProduct && isFirstLoad && (
            <div className="flex flex-col gap-sm" data-testid="logs-loading">
              <Skeleton className="h-10 w-full bg-border" />
              <Skeleton className="h-10 w-full bg-border" />
              <Skeleton className="h-10 w-full bg-border" />
            </div>
          )}

          {selectedProduct && error && !isFetching && (
            <div className="flex flex-col items-center justify-center gap-sm py-16 text-muted-foreground">
              <p className="text-sm">Não foi possível carregar o registro.</p>
              <button
                onClick={() => void refetch()}
                className="text-xs text-foreground underline-offset-2 hover:underline"
              >
                Tente novamente
              </button>
            </div>
          )}

          {selectedProduct && !error && data && rows.length === 0 && (
            <div
              className="flex flex-col items-center justify-center gap-sm py-16 text-muted-foreground"
              data-testid="empty-state-message"
            >
              <p className="text-sm">
                Nenhum registro encontrado para os filtros selecionados.
              </p>
            </div>
          )}

          {selectedProduct && !error && rows.length > 0 && (
            <div
              className="flex flex-col gap-md transition-opacity duration-200"
              style={{ opacity: isFetching ? 0.5 : 1 }}
              data-testid="logs-table"
            >
              <DataTable columns={productLogColumns} data={rows} />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Página {page + 1}
                </span>
                <div className="flex gap-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0 || isFetching}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    data-testid="prev-page"
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasNext || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                    data-testid="next-page"
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
