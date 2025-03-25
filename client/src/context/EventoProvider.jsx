import { createContext, useContext, useState } from "react";
import {
  getEventosRequest,
  deleteEventoRequest,
  createEventoRequest,
  getEventoRequest,
  updateEventoRequest,
  toggleEventoDoneRequest,
} from "../api/eventos.api";

import { EventoContext } from "./EventoContext";

export const useEventos = () => {
  const context = useContext(EventoContext);
  if (context === undefined) {
    throw new Error("useEventos must be used within a EventosContextProvider");
  }
  return context;
};

export const EventoContextProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);

  async function loadEventos () {
    const response = await getEventosRequest();
    setEventos(response.data);
  }

  const deleteEvento = async (idevento) => {
    try {
      const response = await deleteEventoRequest(idevento);
      setEventos(eventos.filter((evento) => evento.idevento !== idevento));
    } catch (error) {
      console.error(error);
    }
  };

  const createEvento = async (evento) => {
    try {
      await createEventoRequest(evento);
    } catch (error) {
      console.error(error);
    }
  };

  const getEvento = async (idevento) => {
    try {
      const response = await getEventoRequest(idevento);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvento = async (idevento, newFields) => {
    try {
      const response = await updateEventoRequest(idevento, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEventoDone = async (idevento) => {
    try {
      const eventoFound = eventos.find((evento) => evento.idevento === idevento);
      await toggleEventoDoneRequest(idevento, eventoFound.done === 0 ? true : false);
      setEventos(
        eventos.map((evento) =>
          evento.idevento === idevento ? { ...evento, done: !evento.done } : evento
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventoContext.Provider
      value={{
        eventos,
        loadEventos,
        deleteEvento,
        createEvento,
        getEvento,
        updateEvento,
        toggleEventoDone,
      }}
    >
      {children}
    </EventoContext.Provider>
  );
};
