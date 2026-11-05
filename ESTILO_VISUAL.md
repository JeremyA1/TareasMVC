# Estilo visual de TareasMVC

## Comando para futuros cambios

Escribe en el chat del asistente, desde este proyecto:

```text
Aplica el estilo TareasMVC a [la vista o componente nuevo].
```

Para crear algo y darle estilo en una misma instrucción:

```text
Crea [la funcionalidad] y aplica el estilo TareasMVC.
```

Es una instrucción para el asistente, no un comando de PowerShell. `AGENTS.md` dirige al asistente a esta guía en futuras tareas del proyecto.

## Línea gráfica

Interfaz tranquila y ligera: fondo gris frío, superficies blancas, texto gris oscuro y azul apagado para la acción principal. Mantener la tipografía del sistema, bordes finos, sombras leves y espacio suficiente entre elementos. Sin degradados, colores saturados ni animaciones que desplacen las tarjetas al pasar el cursor.

La fuente de verdad es `TareasMVC/wwwroot/css/site.css`. Los dos layouts cargan este archivo después de Bootstrap. No editar Bootstrap ni duplicar estos estilos en `_Layout.cshtml.css`.

| Variable | Uso |
| --- | --- |
| `--app-bg` / `--app-surface` / `--app-surface-soft` | Fondo general, tarjetas y superficies secundarias |
| `--app-text` / `--app-muted` | Texto principal y texto de apoyo |
| `--app-primary` / `--app-primary-hover` / `--app-primary-soft` | Acciones principales y estados interactivos |
| `--app-border` / `--app-danger` | Bordes y acciones destructivas |
| `--app-radius-sm` / `--app-radius` | Radio de controles (8 px) y tarjetas (14 px) |
| `--app-shadow` / `--app-focus` / `--app-transition` | Sombra discreta, foco visible y transición de 160 ms |

## Clases reutilizables

| Clase | Cuándo usarla |
| --- | --- |
| `app-page` | Ancho de contenido de hasta 960 px; ya lo aplica el layout principal |
| `page-header` | Encabezado con título y acción; se adapta al ancho disponible |
| `page-title` / `page-subtitle` | Título de página y texto de apoyo opcional |
| `surface-card` | Panel blanco con borde, sombra, radio y padding |
| `card` + `card-body` | Alternativa Bootstrap al panel; ya recibe el mismo estilo |
| `form-actions` | Grupo de botones con separación y salto de línea |
| `empty-state` | Mensaje de listado vacío |
| `table-panel` + `table-responsive` + `app-table` | Panel de tabla con desplazamiento horizontal en móvil |
| `task-list` / `task-item` / `task-title` | Lista de tareas, fila interactiva y título |
| `section-heading` / `task-step` / `task-step-content` | Encabezados pequeños y pasos de tareas |
| `auth-shell` / `auth-intro` / `auth-content` / `auth-actions` | Estructura de acceso y registro |

Los controles Bootstrap (`btn`, `form-control`, `form-select`, `form-check-input`, `modal-content`) reciben la base visual automáticamente. Usar `btn-primary` para la acción principal, `btn-secondary` para acciones secundarias y `btn-outline-danger` para borrar. Conservar los colores semánticos de errores y confirmaciones.

## Ejemplo de una vista nueva

```html
<div class="page-header">
    <div>
        <h1 class="page-title">Título de la sección</h1>
        <p class="page-subtitle">Descripción breve, si aporta información.</p>
    </div>
    <button type="button" class="btn btn-primary">Nueva acción</button>
</div>

<section class="surface-card" aria-labelledby="titulo-detalle">
    <h2 id="titulo-detalle" class="h5 mb-3">Detalle</h2>
    <label for="nombre" class="form-label">Nombre</label>
    <input id="nombre" class="form-control" />
    <div class="form-actions mt-3">
        <button type="button" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-secondary">Cancelar</button>
    </div>
</section>
```

## Al extender el estilo

- Reutilizar las clases existentes antes de agregar CSS. Si hace falta una clase nueva, definirla en `site.css` con las variables `--app-*` y documentar aquí su propósito.
- Usar espaciados de Bootstrap, normalmente `gap-3`, `mb-3`, `mt-3` y `g-4`; evitar estilos inline y reglas específicas por ID.
- Conservar rutas, tag helpers, validaciones, IDs, nombres de campos, traducciones y bindings `data-bind`. El estilo no debe modificar el comportamiento.
- Mantener etiquetas asociadas a los campos, foco visible y nombres accesibles en botones de icono. Respetar `prefers-reduced-motion`.
- Revisar escritorio y móvil: permitir que las acciones se distribuyan en varias líneas, que el texto largo se ajuste y que las tablas se desplacen dentro de su contenedor.
- Compilar el proyecto después de editar Razor. Verificar visualmente las vistas afectadas cuando sea posible e indicar cualquier vista que no pudo verificarse.
