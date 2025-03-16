import { Form, Formik } from 'formik'

function BitacoraEventoForm() {
  return (
    <div>
        <Formik
            initialValues={{
                tipo: '',
                accion: '',
            }}
        >
        {({handleChange}) => (
            <Form>
            <label>Tipo</label>
            <input type="text" name="tipo" placeholder='Ingrese un tipo'/>

            <label>Accion</label>
            <input type="text" name="accion" placeholder='Ingrese una accion'/>

            <button type="submit">Guardar</button>
            </Form>
        )}
        </Formik>
      
    </div>
  )
}

export default BitacoraEventoForm