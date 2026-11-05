# TareasMVC

Aplicación de gestión de tareas desarrollada con ASP.NET Core MVC, Entity Framework Core y SQL Server.

## Funcionalidades

- Registro e inicio de sesión con ASP.NET Core Identity.
- Creación, edición, eliminación y ordenación de tareas.
- Pasos por tarea y seguimiento de su avance.
- Subida, descarga, cambio de título, eliminación y ordenación de archivos adjuntos.
- Interfaz con Razor, Knockout, Bootstrap y jQuery UI.
- Localización en español e inglés.

## Requisitos

- SDK de .NET 10.
- SQL Server disponible localmente o mediante una cadena de conexión propia.
- Visual Studio compatible con .NET 10 para ejecutar las migraciones desde la Consola del Administrador de paquetes.

## Ejecutar en desarrollo

1. Abre `TareasMVC.slnx`.
2. Revisa `ConnectionStrings:DefaultConnection` en `TareasMVC/appsettings.Development.json`. La configuración incluida usa SQL Server local (`Server=.`), la base de datos `Proyecto3MVCTareas` y autenticación integrada de Windows. Si tu instancia es diferente, ajusta la conexión. No publiques contraseñas ni claves; utiliza variables de entorno o secretos de usuario para conexiones privadas.
3. Restaura los paquetes:

   ```powershell
   dotnet restore TareasMVC.slnx
   ```

4. En Visual Studio, abre la Consola del Administrador de paquetes, selecciona `TareasMVC` como proyecto predeterminado y aplica las migraciones:

   ```powershell
   Update-Database
   ```

5. Ejecuta desde Visual Studio o desde la raíz del repositorio:

   ```powershell
   dotnet run --project TareasMVC --launch-profile https
   ```

   El perfil HTTPS usa `https://localhost:7057`. También existe un perfil `http` en `http://localhost:5256`.

## Archivos adjuntos

`Program.cs` registra `AlmacenadorArchivosLocal`. Los archivos se guardan en `TareasMVC/wwwroot/archivosadjuntos/`, que se crea al subir el primer archivo y está excluida de Git.

El proyecto también contiene una implementación para Azure Blob Storage. Para utilizarla, hay que registrar `AlmacenadorArchivosAzure` en lugar de `AlmacenadorArchivosLocal` y configurar `ConnectionStrings:AzureStorage`.

Consulta [AZURITE_LOCAL.md](AZURITE_LOCAL.md) para el entorno Azurite. El ejecutable local de `.tools` no se incluye en el repositorio.

## Estructura

- `TareasMVC/Controllers`: controladores MVC y endpoints de tareas, pasos y adjuntos.
- `TareasMVC/Entidades` y `TareasMVC/Migrations`: entidades y migraciones de la base de datos.
- `TareasMVC/Servicios`: usuarios, almacenamiento de archivos y mapeos.
- `TareasMVC/Views`: vistas Razor.
- `TareasMVC/wwwroot`: estilos, JavaScript y librerías del navegador.
- [ESTILO_VISUAL.md](ESTILO_VISUAL.md): guía visual del proyecto.

Los archivos compilados, bases de datos, adjuntos subidos, configuración privada y herramientas locales quedan fuera del repositorio mediante `.gitignore`.
