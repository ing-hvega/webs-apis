from datetime import datetime
from typing import Optional
from dataclasses import dataclass

@dataclass
class UsuarioDto:
    id: Optional[int] = None
    nombre: str = ""
    apellido: str = ""
    email: str = ""
    password: str = ""
    activo: bool = True
    fecha_creacion: datetime = None

    @classmethod
    def from_entity(cls, entity):
        return cls(
            id=entity.id,
            nombre=entity.nombre,
            apellido=entity.apellido,
            email=entity.email,
            password=entity.password,
            activo=entity.activo,
            fecha_creacion=entity.fecha_creacion
        )

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "password": self.password,
            "activo": self.activo,
            "fecha_creacion": self.fecha_creacion
        }


@dataclass
class UsuarioCreateDto:
    nombre: str = ""
    apellido: str = ""
    email: str = ""
    password: str = ""


@dataclass
class UsuarioUpdateDto:
    id: int
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    activo: Optional[bool] = None
