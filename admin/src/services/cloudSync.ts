import { Order, Product, StoreSettings } from '../types';

const UPSTASH_URL = 'https://holy-gobbler-70550.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAROWAAIgcDJlOTE0NTNiY2EyYjA0MjU3YmNjNjJkMzc3YmZmYjQ2NA';

const ORDERS_KEY = 'rxfif_orders';
const PRODUCTS_KEY = 'rxfif_products';
const SETTINGS_KEY = 'rxfif_settings';

// Helper to execute Upstash command
async function upstashCommand(cmd: any[]): Promise<any> {
  try {
    const res = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cmd)
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result;
  } catch (err) {
    console.warn('Cloud database sync error:', err);
    return null;
  }
}

// Fetch orders from cloud
export async function fetchCloudOrders(): Promise<Order[] | null> {
  try {
    const res = await fetch(`${UPSTASH_URL}/get/${ORDERS_KEY}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.result) return null;
    const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// Save all orders to cloud
export async function saveCloudOrders(orders: Order[]): Promise<boolean> {
  const result = await upstashCommand(['SET', ORDERS_KEY, JSON.stringify(orders)]);
  return result === 'OK';
}

// Push a single new order to cloud
export async function pushCloudOrder(newOrder: Order): Promise<boolean> {
  try {
    const current = (await fetchCloudOrders()) || [];
    const exists = current.some(o => o.id === newOrder.id);
    const updated = exists ? current.map(o => (o.id === newOrder.id ? newOrder : o)) : [newOrder, ...current];
    return await saveCloudOrders(updated);
  } catch (err) {
    console.error('Failed to push order to cloud:', err);
    return false;
  }
}

// Update order status in cloud
export async function updateCloudOrder(updatedOrder: Order): Promise<boolean> {
  try {
    const current = (await fetchCloudOrders()) || [];
    const updated = current.map(o => (o.id === updatedOrder.id ? updatedOrder : o));
    return await saveCloudOrders(updated);
  } catch {
    return false;
  }
}

// Fetch products from cloud
export async function fetchCloudProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${UPSTASH_URL}/get/${PRODUCTS_KEY}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.result) return null;
    const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// Save products to cloud
export async function saveCloudProducts(products: Product[]): Promise<boolean> {
  const result = await upstashCommand(['SET', PRODUCTS_KEY, JSON.stringify(products)]);
  return result === 'OK';
}

// Fetch settings from cloud
export async function fetchCloudSettings(): Promise<StoreSettings | null> {
  try {
    const res = await fetch(`${UPSTASH_URL}/get/${SETTINGS_KEY}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.result) return null;
    return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
  } catch {
    return null;
  }
}

// Save settings to cloud
export async function saveCloudSettings(settings: StoreSettings): Promise<boolean> {
  const result = await upstashCommand(['SET', SETTINGS_KEY, JSON.stringify(settings)]);
  return result === 'OK';
}
