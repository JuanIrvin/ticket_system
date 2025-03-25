import { useEffect } from "react";
import EventoCard from "../components/EventoCard";
import { useEventos } from "../context/EventoProvider";

function EventosPage() {
  const { eventos, loadEventos } = useEventos();

  useEffect(() => {
    loadEventos();
  }, []);

  function renderMain() {
    if (eventos.length === 0)
      return <h1 className="text-center text-white">No tiene eventos pendientes</h1>;
    return eventos.map((evento) => <EventoCard evento={evento} key={evento.idevento} />);
  }

  return (
    <div className="px-4">
      <h1 className="text-5xl text-white font-bold text-center mb-6">Evento</h1>
      {/* Responsivo: 1 columna en móvil, 2 en tablet y 3 en escritorio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderMain()}
      </div>
    </div>
  );
}

export default EventosPage;
