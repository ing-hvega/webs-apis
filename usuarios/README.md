# API de Usuarios

Este proyecto implementa una API RESTful para la gestión de usuarios utilizando FastAPI y siguiendo una arquitectura hexagonal (ports and adapters).

## Estructura del Proyecto

```
usuarios/
├── docker-compose.yml       # Configuración de Docker
├── main.py                  # Punto de entrada de la aplicación
├── requirements.txt         # Dependencias del proyecto
├── src/                     # Código fuente
│   ├── application/         # Capa de aplicación
│   │   └── services/        # Servicios de aplicación
│   │       └── usuario_service.py
│   ├── domain/              # Capa de dominio
│   │   ├── entities/        # Entidades del dominio
│   │   │   └── usuario.py   # Entidad Usuario
│   │   └── ports/           # Puertos (interfaces)
│   │       └── usuario_repository_port.py
│   └── infrastructure/      # Capa de infraestructura
│       ├── adapters/        # Adaptadores
│       │   └── usuario_model.py
│       ├── api/             # Componentes de la API
│       │   └── controllers/ # Controladores
│       │       └── usuario_controller.py
│       ├── config/          # Configuración
│       │   └── database.py  # Configuración de base de datos
│       ├── dto/             # Objetos de transferencia de datos
│       │   └── usuario_dto.py
│       └── repositories/    # Implementaciones de repositorios
│           └── usuario_repository.py
```

## Arquitectura

Este proyecto sigue una **Arquitectura Hexagonal** (también conocida como Ports and Adapters), que consta de:

1. **Capa de Dominio**: Contiene la lógica de negocio central y entidades.
   - `domain/entities/`: Define las entidades de negocio (Usuario)
   - `domain/ports/`: Define interfaces (puertos) para servicios externos

2. **Capa de Aplicación**: Orquesta los casos de uso de la aplicación.
   - `application/services/`: Servicios que implementan la lógica de aplicación

3. **Capa de Infraestructura**: Implementa los adaptadores para interactuar con componentes externos.
   - `infrastructure/adapters/`: Modelos ORM
   - `infrastructure/api/`: Implementación de la API REST
   - `infrastructure/repositories/`: Implementación de los repositorios
   - `infrastructure/config/`: Configuración de infraestructura
   - `infrastructure/dto/`: Objetos de transferencia de datos

## Funcionalidad

Este servicio proporciona las siguientes funcionalidades para la gestión de usuarios:

- **Crear usuario**: Registro de nuevos usuarios en el sistema
- **Obtener usuario**: Consulta de información de un usuario por ID
- **Listar usuarios**: Obtención de todos los usuarios registrados
- **Actualizar usuario**: Modificación de datos de un usuario existente
- **Eliminar usuario**: Eliminación de un usuario del sistema

## Comandos

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd usuarios

# Instalar dependencias
pip install -r requirements.txt
```

### Ejecución

```bash
# Ejecutar el servidor de desarrollo
python main.py
```

La aplicación estará disponible en: http://localhost:8100

### Docker

```bash
# Iniciar con Docker Compose
docker-compose --env-file .env.docker up -d

# Detener contenedores
docker-compose --env-file .env.docker down -v
```

## Endpoints

La API expone los siguientes endpoints:

- `GET /usuarios`: Obtener todos los usuarios
- `GET /usuarios/{id}`: Obtener un usuario por su ID
- `POST /usuarios`: Crear un nuevo usuario
- `PUT /usuarios/{id}`: Actualizar un usuario existente
- `DELETE /usuarios/{id}`: Eliminar un usuario

## Tecnologías

- FastAPI: Framework web de alto rendimiento
- SQLAlchemy: ORM para la interacción con la base de datos
- Pydantic: Validación de datos y configuraciones
- Uvicorn: Servidor ASGI
- Docker: Contenedorización de la aplicación
