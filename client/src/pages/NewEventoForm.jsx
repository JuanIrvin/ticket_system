import { Form, Formik } from "formik";
import { useEventos } from "../context/EventoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EventoForm() {
  const { createEvento, getEvento, updateEvento } = useEventos();
  const [evento, setEvento] = useState({
    idmunicipio: 82,
    iddependencia: 7,
    problema: "",
    ubicacion: "",
    vecino: "",
    contacto_vecino: "",
    login: "mzaldana"
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvento = async () => {
      if (params.id) {
        const evento = await getEvento(params.id);
        console.log(evento);
        setEvento({
          problema: evento.problema,
          ubicacion: evento.ubicacion,
          vecino: evento.vecino,
          contacto_vecino: evento.contacto_vecino,
        });
      }
    };
    loadEvento();
  }, []);

  return (
    <div>
      <Formik
        initialValues={evento}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          if (params.id) {
            await updateEvento(params.id, values);
          } else {
            await createEvento(values);
          }
          navigate("/");
          setEvento({
            idmunicipio: 82,
            iddependencia: 7,
            problema: "",
            ubicacion: "",
            vecino: "",
            contacto_vecino: "",
            login: "mzaldana"
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center mb-4">
              {params.id ? "Editar evento" : "Nuevo evento"}
            </h1>

            <label className="block mb-2">Problema</label>
            <textarea
              name="problema"
              rows="3"
              placeholder="Describa su problema"
              onChange={handleChange}
              className="px-2 py-1 rounded-sm w-full mb-4"
              value={values.problema}
            ></textarea>

            <label className="block mb-2">Ubicacion</label>
            <input
              type="text"
              name="ubicacion"
              placeholder="Escriba la ubicacion"
              className="px-2 py-1 rounded-sm w-full mb-4"
              onChange={handleChange}
              value={values.ubicacion}
            />

            <label className="block mb-2">vecino</label>
            <input
              type="text"
              name="vecino"
              placeholder="Ingrese su nombre"
              className="px-2 py-1 rounded-sm w-full mb-4"
              onChange={handleChange}
              value={values.vecino}
            />

            <label className="block mb-2">contacto_vecino</label>
            <input
              type="text"
              name="contacto_vecino"
              placeholder="Ingrese su contacto"
              className="px-2 py-1 rounded-sm w-full mb-4"
              onChange={handleChange}
              value={values.contacto_vecino}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mb-2"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EventoForm;
