import axios from "axios";

const SERVER_IP = import.meta.env.VITE_SERVER_IP || "127.0.0.1";

if (!import.meta.env.VITE_SERVER_IP) {
  console.warn("⚠️  SERVER_IP no está definida en el archivo .env");
}

export const getEventosRequest = async () =>
  await axios.get(`http://${SERVER_IP}/eventos`);

export const createEventoRequest = async (evento) =>
  await axios.post(`http://${SERVER_IP}/eventos`, evento);

export const deleteEventoRequest = async (idevento) =>
  await axios.delete(`http://${SERVER_IP}/eventos/${idevento}`);

export const getEventoRequest = async (idevento) =>
  await axios.get(`http://${SERVER_IP}/eventos/${idevento}`);

export const updateEventoRequest = async (idevento, newFields) =>
  await axios.put(`http://${SERVER_IP}/eventos/${idevento}`, newFields);

export const toggleEventoDoneRequest = async (idevento, done) =>
  await axios.put(`http://${SERVER_IP}/eventos/${idevento}`, { done });
