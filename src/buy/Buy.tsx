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
  const [countsById, setCountsById] = useState<Record<number, number>>({})                  // состояние для хранения количества каждого товара, где ключ - id товара, а значение - количество
  const [pricesById, setPricesById] = useState<Record<number, number>>({})                  // состояние для хранения цены каждого товара, где ключ - id товара, а значение - цена
  const [titlesById, setTitlesById] = useState<Record<number, string>>({})                  // состояние для хранения названия каждого товара, где ключ - id товара, а значение - название

  const handleCountChange = (id: number, value: number, price: number, title: string) => {  // функция для обновления количества, цены и названия товара по его id
    setCountsById((prev) => ({ ...prev, [id]: value }))                                     // обновляем состояние Количества, тех товаров, у которых Количество изменилось, создавая новый объект на основе предыдущего и изменяя только значение для данного id          
    setPricesById((prev) => ({ ...prev, [id]: price }))                                     // обновляем состояние Цены, тех товаров, у которых Количество изменилось, создавая новый объект на основе предыдущего и изменяя только значение для данного id
    setTitlesById((prev) => ({ ...prev, [id]: title }))                                     // обновляем состояние Названия, тех товаров, у которых Количество изменилось, создавая новый объект на основе предыдущего и изменяя только значение для данного id
  }

  const totalAmount = Object.entries(countsById).reduce((sum, [id, count]) => {             // вычисляем общую сумму, используя reduce для обхода всех товаров в countsById
    const unitPrice = pricesById[Number(id)] ?? 0                                           // получаем цену за единицу товара по его id, если цена не найдена, используем 0
    return sum + count * unitPrice                                                          // умножаем количество на цену за единицу и добавляем к общей сумме
  }, 0)

  const orderItems: OrderItem[] = Object.entries(countsById)                                // преобразуем countsById в массив объектов OrderItem, фильтруя только те товары, у которых количество больше 0
    .filter(([, count]) => count > 0)
    .map(([id, quantity]) => {                                                              // для каждого выбранного товара создаем объект OrderItem, используя id для получения названия и цены из соответствующих состояний
      const numId = Number(id)                                                              // преобразуем id из строки в число, так как ключи в countsById, pricesById и titlesById являются строками, но нам нужно число для получения данных

      return {
        id,                                                                                // id товара остается строкой, так как OrderItem ожидает id в виде строки
        name: titlesById[numId] ?? `Товар ${id}`,                                          // получаем название товара по его id, если название не найдено, используем "Товар {id}"
        quantity,                                                                          // количество товара из countsById
        price: pricesById[numId] ?? 0,                                                     // получаем цену выбранного товара по его id, если цена не найдена, используем 0
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

          <PlaceOrder items={orderItems} />                                                  {/* передаем массив выбранных товаров в компонент PlaceOrder для отображения в диалоговом окне оформления заказа */}  
        </Stack>

      </Box>
    </Stack>
  )
}