# Azure Storage local para TareasMVC

El entorno usa Azurite 3.35.0 y el paquete NuGet Azure.Storage.Blobs 12.26.0.
Estas versiones se comprobaron juntas con una subida, descarga y eliminacion
de un archivo desde C#. No necesitas cuenta ni suscripcion de Azure.

## Iniciar y detener

Abre una terminal en la carpeta que contiene `TareasMVC.slnx` y ejecuta:

```powershell
npm.cmd run azurite
```

Deja esa terminal abierta mientras ejecutas TareasMVC desde Visual Studio.
Para detener el emulador, presiona `Ctrl+C` en esa terminal. Si Windows pregunta
si deseas terminar el trabajo por lotes, confirma.

Se utiliza `npm.cmd` para evitar el bloqueo de `npm.ps1` de la configuracion
actual de PowerShell. No se necesita cambiar la politica de ejecucion.

Los servicios escuchan solo en el equipo local:

| Servicio | Direccion |
| --- | --- |
| Blob | http://127.0.0.1:10000 |
| Queue | http://127.0.0.1:10001 |
| Table | http://127.0.0.1:10002 |

Los datos se guardan en `.azurite` y se conservan entre ejecuciones.
No inicies otra instancia en los mismos puertos. Las carpetas de datos,
herramientas y dependencias locales estan excluidas en `.gitignore`.

## Conexion desde el proyecto

`TareasMVC/appsettings.Development.json` contiene:

```json
"AzureStorage": "UseDevelopmentStorage=true"
```

La entrada esta dentro de `ConnectionStrings`. Los perfiles `http` y `https`
existentes de Visual Studio usan el entorno Development y cargan este archivo.

Al implementar tu servicio, puedes crear el cliente con `IConfiguration`:

```csharp
using Azure.Storage.Blobs;

var cliente = new BlobServiceClient(
    configuration.GetConnectionString("AzureStorage"));
```

El emulador esta preparado; la implementacion de `IAlmacenadorArchivos` y su
registro en `Program.cs` forman parte del siguiente ejercicio. Instalar el
emulador y el SDK no implementa los botones de la interfaz automaticamente.

## Instalacion en este equipo

Se copio el ejecutable oficial incluido en Visual Studio a
`.tools/azurite/azurite.exe`, por lo que este comando no necesita descargar
paquetes npm ni acceder a Internet. El ejecutable de origen es:

```text
C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator\azurite.exe
```

El SDK de C# esta referenciado en `TareasMVC/TareasMVC.csproj` y sus dependencias
estan disponibles en la cache NuGet del usuario. Visual Studio puede restaurar
las dependencias desde NuGet normalmente en futuras compilaciones.

Si copias el proyecto a otro equipo, `.tools` no se incluye en Git: tendras
que instalar Azurite alli o copiar el ejecutable de su instalacion de Visual
Studio a la misma ruta local.

Documentacion oficial:

- [Instalar y ejecutar Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-install-azurite)
- [Conectar clientes a Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-connect-azurite)
- [SDK instalado](https://www.nuget.org/packages/Azure.Storage.Blobs/12.26.0)
