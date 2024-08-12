Descripción General
Esta aplicación está diseñada para obtener y mostrar una lista de artículos desde una API remota. La aplicación permite a los usuarios ver los artículos, los cuales se muestran en un diseño de tarjeta. Si el artículo tiene una imagen asociada, se muestra; de lo contrario, se utiliza una imagen de marcador de posición. Los usuarios pueden hacer clic en cualquier artículo para navegar a una vista detallada de ese artículo.

Características
Obtener Artículos: Recupera una lista de artículos desde un punto final de API.
Manejo de Errores: Proporciona retroalimentación si hay un error al obtener los artículos.
Diseño Responsivo: Los artículos se muestran en un diseño de tarjeta, facilitando su lectura y navegación.
Manejo de Imágenes: Si un artículo no tiene una imagen, se muestra una imagen de marcador de posición.
Navegación: Los usuarios pueden hacer clic en un artículo para ver más detalles en una página separada.
Requisitos Previos
Node
npm
Instalación
Clona el repositorio:

bash
Copy code
git clone https://github.com/tu-repo/articles-app.git
Navega al directorio del proyecto:


Instala las dependencias:

bash
Copy code
npm install
Configura las variables de entorno:

Creacion de un archivo .env en el directorio raíz.
Agrega la siguiente variable de entorno:
env
Copy code
VITE_API_BASE_URL=tu_url_base_de_api_aqui
Ejecutar la Aplicación
Para iniciar el servidor de desarrollo, ejecuta:

bash
Copy code
npm run dev
La aplicación debería estar ejecutándose en http://localhost:3000.

Estructura del Código
Componentes
Articles.js:

Obtiene los artículos desde la API y gestiona el estado de la aplicación.
Muestra un spinner de carga mientras se obtienen los artículos.
Mapea los artículos obtenidos para renderizar una lista de componentes ItemListArticle.
ItemListArticle.js:

Muestra los detalles individuales de un artículo en un diseño de tarjeta.
Maneja la visualización de la imagen del artículo, el título y el contenido truncado.
Spinner.js:

Un componente simple que indica cuando la aplicación está cargando datos.
Contexto y Gestión de Estado
AuthContext.js:

Gestiona el estado de autenticación del usuario.
Proporciona un contexto que otros componentes pueden usar para acceder a los datos y métodos de autenticación.
AuthReducer.js:

Contiene la lógica para manejar diferentes acciones de autenticación como login y logout.
Actualiza el estado basado en el tipo de acción que se haya despachado.
Hooks Clave
useEffect:

Se utiliza en Articles.js para obtener los artículos cuando el componente se monta.
useState:

Maneja el estado de carga (isLoading) y la lista de artículos (articlesCleanList).
useReducer:

Gestiona el estado de autenticación en toda la aplicación usando authReducer.
Manejo de Errores
La aplicación verifica el estado de la respuesta de la API. Si la respuesta no es correcta (res.ok es false), se lanza un error y la aplicación lo registra en la consola.