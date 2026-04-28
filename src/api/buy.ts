export type Buy = {
    id: number;
    title: string;
    description: string;
    price: number;
}

export async function getBuys(): Promise<Buy[]> {
    const response = await fetch('/api/buys');

    if (!response.ok) {
        throw new Error('Не удалось загрузить товары');
    }

    return response.json() as Promise<Buy[]>;
}