import axios from "axios";

export const getEventosRequest = async () =>
  await axios.get(`http://192.9.200.221:4000/eventos`);

export const createEventoRequest = async (evento) =>
  await axios.post(`http://192.9.200.221:4000/eventos`, evento);

export const deleteEventoRequest = async (idevento) =>
  await axios.delete(`http://192.9.200.221:4000/eventos/${idevento}`);

export const getEventoRequest = async (idevento) =>
  await axios.get(`http://192.9.200.221:4000/eventos/${idevento}`);

export const updateEventoRequest = async (idevento, newFields) =>
  await axios.put(`http://192.9.200.221:4000/eventos/${idevento}`, newFields);

export const toggleEventoDoneRequest = async (idevento, done) =>
  await axios.put(`http://192.9.200.221:4000/eventos/${idevento}`, {
    done,
  });
