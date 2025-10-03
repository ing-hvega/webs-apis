from abc import ABC, abstractmethod

from src.domain.entities.usuario import Usuario


class UsuarioRepositoryPort(ABC):

    @abstractmethod
    def crear_usuario(self, usuario: Usuario) -> Usuario:
        pass

    @abstractmethod
    def actualizar_usuario(self, usuario: Usuario) -> Usuario:
        pass

    @abstractmethod
    def obtener_usuario_por_correo(self, email: str) -> Usuario:
        pass
