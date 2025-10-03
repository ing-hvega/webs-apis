from datetime import datetime
from typing import Optional


class Usuario:
    id: Optional[int] = None
    nombre: str = ""
    apellido: str = ""
    email: str = ""
    password: str = ""
    activo: bool = True
    fecha_creacion: datetime = None

    def __post_init__(self):
        if self.fecha_creacion is None:
            self.fecha_creacion = datetime.now()

    def to_dict(self):
        return  {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "password": self.password,
            "activo": self.activo,
            "fecha_creacion": self.fecha_creacion
        }
