import { useState, useEffect, useCallback } from 'react';
import { BrainDumpItem } from '../types/braindump';
import { storageService } from '../services/storage';
import { generateId } from '../utils/id';

export function useBrainDump() {
  const [items, setItems] = useState<BrainDumpItem[]>([]);

  useEffect(() => {
    const loaded = storageService.getBrainDumpItems();
    setItems(loaded);
  }, []);

  const updateItemsState = useCallback((newItems: BrainDumpItem[]) => {
    setItems(newItems);
    storageService.saveBrainDumpItems(newItems);
  }, []);

  const addBrainDumpItem = useCallback((content: string) => {
    if (!content.trim()) return;

    const newItem: BrainDumpItem = {
      id: generateId(),
      content: content.trim(),
      createdAt: Date.now(),
      processed: false,
    };

    updateItemsState([newItem, ...items]);
  }, [items, updateItemsState]);

  const deleteBrainDumpItem = useCallback((id: string) => {
    const updated = items.filter((item) => item.id !== id);
    updateItemsState(updated);
  }, [items, updateItemsState]);

  const markProcessed = useCallback((id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, processed: true } : item
    );
    updateItemsState(updated);
  }, [items, updateItemsState]);

  return {
    items,
    addBrainDumpItem,
    deleteBrainDumpItem,
    markProcessed,
  };
}
