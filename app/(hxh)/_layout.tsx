// app/(hxh)/_layout.tsx
import { HxHProvider } from '@/context/HxHContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function HxHLayout() {
  return (
    <HxHProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Hunter x Hunter',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="CharacterDetailsScreen" 
          options={{ 
            title: 'Detalles del Personaje',
            headerShown: false 
          }} 
        />
      </Stack>
    </HxHProvider>
  );
}