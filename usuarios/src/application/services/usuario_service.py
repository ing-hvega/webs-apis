from src.domain.entities.usuario import Usuario
from src.domain.ports.usuario_repository_port import UsuarioRepositoryPort
from src.infrastructure.dto.usuario_dto import UsuarioCreateDto, UsuarioDto


class UsuarioService:

    def __init__(self, usuario_repository: UsuarioRepositoryPort):
        self.usuario_repository = usuario_repository

    def crear_usuario(self, usuario_dto: UsuarioCreateDto) -> UsuarioDto:
        usuario = Usuario(
            nombre=usuario_dto.nombre,
            apellido=usuario_dto.apellido,
            email=usuario_dto.email,
            password=usuario_dto.password
        )

        usuario_creado = self.usuario_repository.crear_usuario(usuario)

        return UsuarioDto.from_entity(usuario_creado)
