import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, PlusCircle, List, Settings } from "lucide-react";

function Navbar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* 🔹 Botón para abrir el menú */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-neutral-800 text-white p-2 rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* 🔹 Fondo oscuro cuando el menú está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-75 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 🔹 Menú lateral con animación */}
      <div
        className={`fixed top-0 left-0 h-full bg-neutral-800 text-white p-5 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "16rem" }}
      >
        {/* 🔹 Botón para cerrar */}
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
          <X size={24} />
        </button>

        {/* 🔹 Opciones del menú */}
        <h1 className="text-xl font-bold text-center mt-10">Eventos</h1>
        <ul className="mt-6 flex flex-col gap-y-4">
          <li>
            <Link to="/" className="flex items-center gap-3 p-2 hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
              <Home size={20} /> Inicio
            </Link>
          </li>
          <li>
            <Link to="/new" className="flex items-center gap-3 p-2 hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
              <PlusCircle size={20} /> Crear Evento
            </Link>
          </li>
          <li>
            <Link to="/events" className="flex items-center gap-3 p-2 hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
              <List size={20} /> Ver Eventos
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
              <Settings size={20} /> Configuración
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
