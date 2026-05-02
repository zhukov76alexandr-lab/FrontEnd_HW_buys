import { Box, Stack, Typography } from "@mui/material"
import { getBuys, type Buy } from "../api/buy"
import { useQuery } from "@tanstack/react-query"
import NumberSpinner from "./buysList/components/NumberSpinner"

export type ListProductsProps = {
  countsById: Record<number, number>
  onCountChange: (id: number, value: number, price: number, title: string) => void
}

const headerSx = {
  border: 1, borderColor: "grey.300", borderRadius: 2, padding: 1, textAlign: "start"
}

const cellProdSx = {
  borderBottom: 1,
  borderColor: "grey.300",
  padding: 1,
  textAlign: "start",
  display: "flex",
  alignItems: "center",
  minHeight: 38,
}

const cellPriceSx = {
  borderBottom: 1,
  borderColor: "grey.300",
  padding: 1,
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 38,
}

export const ListProducts: React.FC<ListProductsProps> = ({ countsById, onCountChange }) => {
  const { data: buys = [], isLoading, isError, error, } = useQuery<Buy[]>({
    queryKey: ['buys'],
    queryFn: getBuys,
  })

  return (
    <Stack direction='column' spacing={1}>
      {/* Заголовок */}
      <Stack direction="row" spacing={1} width="100%">
        <Box width="20%">
          <Typography variant="h6" sx={headerSx}>Название товара:</Typography>
        </Box>
        <Box width="48%">
          <Typography variant="h6" sx={headerSx}>Описание:</Typography>
        </Box>
        <Box width="17%">
          <Typography variant="h6" sx={headerSx}>{`Цена ₽ за 1шт.:`}</Typography>
        </Box>
        <Box width="15%">
          <Typography variant="h6" sx={headerSx}>Количество:</Typography>
        </Box>
      </Stack>

      {/* Строки товаров */}
      {buys.map((buy) => (
        <Stack key={buy.id} direction="row" spacing={0} width="100%">
          <Box width="20%" sx={cellProdSx}>{buy.title}</Box>
          <Box width="48%" sx={cellProdSx}>{buy.description}</Box>
          <Box width="17%" sx={cellPriceSx} >{buy.price}</Box>
          <Box width="15%" sx={cellProdSx}>
            <NumberSpinner
              min={0}
              max={10}
              defaultValue={0}
              size="small"
              value={countsById[buy.id] ?? 0}                                                                 // устанавливаем значение из countsById, если оно есть, иначе 0. Это значение пришло сверху из Buy.tsx и соответствует количеству товара с данным id в корзине
              onValueChange={(value) => onCountChange(buy.id, Number(value ?? 0), buy.price, buy.title)}      // при изменении значения отправляем наверх id, новое количество, цену и название товара. 
            />
          </Box>
        </Stack>
      ))}

      {isLoading && <Typography>Загрузка...</Typography>}
      {isError && <Typography color="error">Ошибка: {error?.message}</Typography>}
    </Stack>
  )
}
