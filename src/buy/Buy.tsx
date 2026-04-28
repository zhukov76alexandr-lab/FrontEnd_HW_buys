import { Box, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { ListProducts } from "./ListProducts"
import { PlaceOrder } from "./PlaceOrder"
import type { OrderItem } from "./OrderAddDialog"

type BuyProps = {

}

const BuySx = {
  border: 1, borderColor: "grey.300", borderRadius: 2, padding: 2
}

export const Buy: React.FC<BuyProps> = () => {
  const [countsById, setCountsById] = useState<Record<number, number>>({})             // это состояние для хранения количества каждого товара, где ключ - id товара, а значение - количество
  const [pricesById, setPricesById] = useState<Record<number, number>>({})            // (New) это состояние для хранения цены каждого товара, где ключ - id товара, а значение - цена
  const [titlesById, setTitlesById] = useState<Record<number, string>>({})

  const handleCountChange = (id: number, value: number, price: number, title: string) => {            // функция для обновления количества, цены и названия товара по его id
    setCountsById((prev) => ({ ...prev, [id]: value }))                                // обновляем состояние, создавая новый объект на основе предыдущего и изменяя только значение для данного id           
    setPricesById((prev) => ({ ...prev, [id]: price }))                                // (New) обновляем состояние, создавая новый объект на основе предыдущего и изменяя только значение для данного id
    setTitlesById((prev) => ({ ...prev, [id]: title }))
  }

  const totalAmount = Object.entries(countsById).reduce((sum, [id, count]) => {          // (New) вычисляем общую сумму, используя reduce для обхода всех товаров в countsById
    const unitPrice = pricesById[Number(id)] ?? 0                                        // (New) получаем цену за единицу товара по его id, если цена не найдена, используем 0
    return sum + count * unitPrice                                                       // умножаем количество на цену за единицу и добавляем к общей сумме
  }, 0)

  const orderItems: OrderItem[] = Object.entries(countsById)
    .filter(([, count]) => count > 0)
    .map(([id, quantity]) => {
      const numId = Number(id)

      return {
        id,
        name: titlesById[numId] ?? `Товар ${id}`,
        quantity,
        price: pricesById[numId] ?? 0,
      }
    })

  return (
    <Stack direction='row' spacing={2} padding={2} width="100%">
      <Box width="80%" sx={BuySx}>
        <Typography variant="h6">
          Товары
        </Typography>
        <ListProducts countsById={countsById} onCountChange={handleCountChange} />
      </Box>

      <Box width="20%" sx={BuySx}>
        <Stack direction="column" spacing={2} width="100%">
          <Stack direction="row" spacing={1} width="100%">
            <Typography variant="h6" width="50%">
              Корзина:
            </Typography>

            <Box width="50%" sx={{...BuySx, padding: 0.5}}>
              <Typography variant="h6" textAlign="center" >
                {totalAmount}
              </Typography>
            </Box>
          </Stack>

          <PlaceOrder items={orderItems} />
        </Stack>

      </Box>
    </Stack>
  )
}