import { useAuth } from '../hooks/useAuth';

function HomePrivate() {
  const { user } = useAuth();

  return (
    <>
      <h1>Bienvenido</h1>

      <p>Has iniciado sesión correctamente.</p>
    </>
  );
}

export default HomePrivate;
