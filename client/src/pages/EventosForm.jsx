import { Form, Formik } from "formik";
import { useEventos } from "../context/EventoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EventoForm() {
  const { createEvento, getEvento, updateEvento } = useEventos();
  const [evento, setEvento] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvento = async () => {
      if (params.id) {
        const evento = await getEvento(params.id);
        console.log(evento);
        setEvento({
          title: evento.title,
          description: evento.description,
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
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Editar evento" : "Nuevo evento"}
            </h1>

            <label className="block">Problema</label>
            <textarea
              name="problema"
              rows="3"
              placeholder="Write a description"
              onChange={handleChange}
              className="px-2 py-1 rounded-sm w-full"
              value={values.description}
            ></textarea>

            <label className="block">title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.title}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EventoForm;
