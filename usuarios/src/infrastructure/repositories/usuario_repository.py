from typing import Optional

from sqlalchemy.orm import Session

from src.domain.entities.usuario import Usuario
from src.domain.ports.usuario_repository_port import UsuarioRepositoryPort
from src.infrastructure.adapters.usuario_model import UsuarioModel


def _map_to_entity(usuario_model: UsuarioModel) -> Usuario:
    return Usuario(
        id=usuario_model.id,
        nombre=usuario_model.nombre,
        apellido=usuario_model.apellido,
        email=usuario_model.email,
        password=usuario_model.password,
        activo=usuario_model.activo,
        fecha_creacion=usuario_model.fecha_creacion
    )


class UsuarioRepository(UsuarioRepositoryPort):

    def __init__(self, db: Session):
        self.db = db

    def crear_usuario(self, usuario: Usuario) -> Usuario:
        usuario_model = UsuarioModel(
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            email=usuario.email,
            password=usuario.password,
            activo=usuario.activo,
        )

        self.db.add(usuario_model)
        self.db.commit()
        self.db.refresh(usuario_model)

        return _map_to_entity(usuario_model)

    def actualizar_usuario(self, usuario: Usuario) -> Usuario:
        # TODO implementation

        return usuario

    def obtener_usuario_por_correo(self, email: str) -> Optional[Usuario]:

        usuario_model = self.db.query(UsuarioModel).filter(UsuarioModel.email == email).first()

        if usuario_model:
            return _map_to_entity(usuario_model)

        return None
