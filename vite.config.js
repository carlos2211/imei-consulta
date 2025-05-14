
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'https://migracion.clarochilepromociones.com/consulta_imei/consulta-imei-migracion/dist/',
  plugins: [react()]
})
