import { createServer, Model } from "miragejs";
import type { Buy } from "../api/buy";

export function makeServer() {
  return createServer({
    models: {
      buy: Model,
    },

    seeds(server: any) {
      const seedBuys: Buy[] = [
        {
          id: 1,
          title: "клавиатура",
          description: "Механическая клавиатура с подсветкой",
          price: 230,
        },
        {
          id: 2,
          title: "мышь",
          description: "Оптическая мышь с эргономичным дизайном",
          price: 50,
        },
        { id: 3,
          title: "монитор",
          description: "LED монитор с разрешением 4K",
          price: 300,
        },
        {
          id: 4,
          title: "наушники",
          description: "Беспроводные наушники с шумоподавлением",
          price: 150,
        },
        {
          id: 5,
          title: "веб-камера",
          description: "HD веб-камера с микрофоном",
          price: 80,
        },
        {
          id: 6,
          title: "принтер",
          description: "Лазерный принтер с поддержкой Wi-Fi",
          price: 200,
        },
        {
          id: 7,
          title: "сканер",
          description: "Плоский сканер с высоким разрешением",
          price: 120,
        },
      ];

      seedBuys.forEach((buy) => server.create('buy', buy));
    },

    routes() {
      this.namespace = 'api';
      this.timing = 500; // Задержка в 1 секунду для имитации реального API

      // GET /api/buys - Получение всех товаров
      this.get('/buys', (schema: any) => {
        const records = schema.all('buy').models;
        return records.map((record: any) => record.attrs);
      });
    }

  })
}