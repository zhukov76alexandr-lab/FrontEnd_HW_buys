import { Button, Stack, } from "@mui/material"
import { useState } from "react"
import { OrderAddDialog, type OrderItem } from "./OrderAddDialog"

export type PlaceOrderProps = {
  items: OrderItem[]
}

const PlaceOrderSx={
  variant: "h6", 
  border: 1, 
  borderColor: "grey.300", 
  borderRadius: 2, 
  padding: 1, 
  textAlign: "center"
}

export const PlaceOrder: React.FC<PlaceOrderProps> = ({ items }) => {
  const [openDialog, setOpenDialog] = useState(false)                                  // состояние для управления открытием диалогового окна оформления заказа

  return (
    <Stack direction="column" spacing={2} width="100%">
      <Button 
        sx={PlaceOrderSx} 
        onClick={() => setOpenDialog(!openDialog)}
      >
        Оформить заказ
      </Button>
      
      <OrderAddDialog     
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        items={items}
      />
    </Stack> 
  )
}