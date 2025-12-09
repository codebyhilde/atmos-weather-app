## 🌧️ Atmos - Una Aplicación Web del Clima con Arquitectura Moderna

**Atmos** es una aplicación web del clima moderna y de código abierto, construida con una arquitectura de **monorepo** para una gestión de código eficiente. Consume datos de la API de **OpenWeatherMap**, normalizándolos y presentándolos a través de una interfaz de usuario **React** limpia y responsiva.

-----

## 🏗️ Arquitectura del Proyecto

El proyecto Atmos sigue una estructura de **Monorepo** gestionada con **pnpm workspaces**, dividida en dos aplicaciones principales:

### 1\. `apps/web` (Frontend)

  * **Rol:** Encargado de la presentación de datos, la interacción del usuario y el manejo del estado.
  * **Stack:** **React**, **TypeScript**, **Vite** para *bundling* y **Tailwind CSS** para los estilos.
  * **Funcionalidad:** Renderiza el pronóstico actual y los gráficos de la semana/hora, y además realiza las llamadas a la API interna (ubicada en `apps/api`).

### 2\. `apps/api` (Backend)

  * **Rol:** Actúa como un *proxy* entre el Frontend y el proveedor externo (**OpenWeatherMap**), centralizando la lógica de negocio.
  * **Stack:** **Node.js**, **Express**, y **TypeScript**.
  * **Funcionalidad:**
      * Gestiona la **normalización de datos** (transforma la respuesta cruda de OpenWeatherMap a un formato limpio y tipado para el frontend).
      * Aplica **Rate Limiting** para proteger el backend de OpenWeatherMap y la API.
      * Gestiona la lógica de **CORS** para restringir el acceso solo a las URLs permitidas.

### 📂 Estructura esencial del Proyecto

```text
.
├── README.md                 # Documentación principal del proyecto
├── apps
│   ├── api                   # Aplicación Backend: Capa de proxy y normalización de datos
│   │   ├── src
│   │   │   ├── interfaces    # Define las estructuras de datos (Weather API, Geocoding API, Datos Normalizados)
│   │   │   ├── middlewares   # Lógica de Express que se ejecuta antes de las rutas (ej: Rate Limiting)
│   │   │   ├── routes        # Define los endpoints de la API (ej: /api/weather)
│   │   │   ├── server.ts     # Configuración y arranque del servidor Express Monolítico
│   │   │   ├── services      # Contiene la lógica de negocio para interactuar con APIs externas
│   │   │   └── utils         # Funciones de ayuda reutilizables (ej: transformación de datos)
│   │   └── tsconfig.json     # Configuración de TypeScript para el backend
│   └── web                   # Aplicación Frontend: Interfaz de usuario React
│       ├── src
│       │   ├── App.tsx       # Componente principal que orquesta la aplicación
│       │   ├── components    # Componentes de UI reutilizables (ej: Header, Loader, Forecast)
│       │   ├── data          # Datos estáticos usados en la UI (ej: lista de países)
│       │   ├── hooks         # Lógica de React reutilizable (ej: useWeather, useTheme)
│       │   ├── interfaces    # Define las estructuras de datos que consume el frontend
│       │   └── main.tsx      # Punto de entrada de la aplicación React
│       └── vite.config.ts    # Configuración del bundler Vite
└── package.json              # Script base y configuración del monorepo
```

-----

## 🛠️ Stack Tecnológico Detallado

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Monorepo Manager** | **pnpm Workspaces** | Gestión eficiente de dependencias y *linking* de proyectos. |
| **Frontend** | **React** + **Vite** | Interfaz de usuario rápida y moderna. |
| **Backend** | **Node.js** + **Express** | API *proxy* y capa de normalización de datos. |
| **Tipado** | **TypeScript** | Código más robusto y a prueba de errores en todo el *stack*. |
| **Estilos** | **Tailwind CSS** | Estilizado rápido y responsivo. |
| **Datos** | **OpenWeatherMap API** | Fuente principal de datos meteorológicos. |
| **Gráficos** | **Chart.js** + `react-chartjs-2` | Visualización de tendencias de temperatura. |

-----

## ✨ Características Implementadas

Las siguientes funcionalidades ya están operativas en la aplicación:

  * **🔍 Búsqueda de Localidad:** Obtención del clima por ciudad y país (con soporte opcional para estados/provincias).
  * **🎨 Cambio de Tema:** Alternancia entre el tema claro y oscuro (implementado en `useTheme.ts`).
  * **📊 Gráficos de Temperatura:** Visualización del pronóstico semanal y por horas mediante gráficos (utilizando `WeeklyForecastChart.tsx` y Chart.js).
  * **🛡️ Rate Limiting:** Protección en la capa de la API para limitar el número de solicitudes (implementado en `rateLimiter.ts`).
  * **⚙️ Normalización de Datos:** Limpieza y tipado estricto de los datos de OpenWeatherMap antes de enviarlos al frontend.

-----

## 🚀 Instalación y Ejecución

Para levantar el proyecto en tu entorno de desarrollo, sigue estos pasos:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/codebyhilde/atmos-weather-app.git
    cd atmos-weather-app
    ```

2.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en el directorio `apps/api` con tu clave de API de OpenWeatherMap:

    ```bash
    # apps/api/.env
    OPENWEATHERMAP_API_KEY="TU_CLAVE_AQUI"
    # El puerto por defecto es 3001
    PORT=3001 
    ```

3.  **Instalar dependencias y arrancar los servicios:**
    Como se utiliza un monorepo, un solo comando iniciará tanto la API como el Frontend:

    ```bash
    pnpm install
    pnpm run dev
    ```

    Esto iniciará ambos:

      * **Frontend Web:** en `http://localhost:5173`
      * **Backend API:** en `http://localhost:3001` (a menos que se cambie el puerto manualmente)

-----

## 🤝 Contribuciones y Contacto

¡Este proyecto está abierto a sugerencias! Si tienes ideas para mejorar la arquitectura o la interfaz, no dudes en contactarme.

-----
