import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography 
} from "@mui/material"

export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
}

export type OrderAddDialogProps = {
  open: boolean
  onClose: () => void
  items?: OrderItem[]
}

export const OrderAddDialog: React.FC<OrderAddDialogProps> = ({ 
  open, onClose, items = [] 
}) => {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Оформление заказа</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ mb: 2, mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell> Выбранные Товары:</TableCell>
                <TableCell align="right">Количество</TableCell>
                <TableCell align="right">Цена</TableCell>
                <TableCell align="right">Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography variant="h6">
            Итого: <strong>{total.toFixed(2)}</strong>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Отмена
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Оформить
        </Button>
      </DialogActions>
    </Dialog>
  )
}