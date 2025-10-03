from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from src.application.services.usuario_service import UsuarioService
from src.infrastructure.config.database import get_db
from src.infrastructure.dto.usuario_dto import UsuarioCreateDto
from src.infrastructure.repositories.usuario_repository import UsuarioRepository

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def get_usuario_service(db: Session = Depends(get_db)) -> UsuarioService:
    repository = UsuarioRepository(db)
    return UsuarioService(repository)


@router.post('/', status_code=status.HTTP_201_CREATED)
def crear_usuario(usuario_data, service: UsuarioService = Depends(get_usuario_service)):
    try:
        usuario_dto = UsuarioCreateDto(
            nombre=usuario_data.nombre,
            apellido=usuario_data.apellido,
            email=usuario_data.email,
            password=usuario_data.password
        )

        usuario_creado = service.crear_usuario(usuario_dto)

        return usuario_creado.to_dict()

    except ValueError as e:
        return {"error": str(e)}
