import { useEventos } from "../context/EventoProvider";
import { useNavigate } from "react-router-dom";

import { formatDate, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function EventoCard({ evento }) {
  const { deleteEvento, toggleEventoDone } = useEventos();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleEventoDone(evento.idevento);
  };

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 shadow-md">
      <header className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">
        Creado hace {formatDistanceToNow(new Date(evento.fecha_movto), { locale: es })}: {formatDate(evento.fecha_movto, "dd/MM/yyyy", { locale: es })}
        </h3>
        <span className="text-xl">{evento.tipo == 'FINALIZADO' ? "✅" : "❌"}</span>
      </header>
      <p className="text-sm mb-2">{evento.problema}</p>
      <p className="text-sm mb-2">{evento.ubicacion}</p>
      <p className="text-sm mb-2">{evento.vecino + " - " + evento.contacto_vecino}</p>
      <span className="text-xs text-gray-400">{evento.createAt}</span>

      {/* Espaciado entre el contenido y los botones */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2 card-actions justify-end">
        <button
          className="btn btn-soft border-yellow-600 btn-warning w-full sm:w-1/4 xl:w-auto"
          onClick={() => navigate(`/edit/${evento.idevento}`)}
        >
          Transferir
        </button>
        <button
          className="btn btn-soft border-green-700 btn-accent w-full sm:w-1/4 xl:w-auto"
          onClick={() => handleDone(evento.done)} // ajustar funcion para que aparezca un apartado para cambiar estado pero tambien para poner descripcion de como se soluciono
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default EventoCard;
