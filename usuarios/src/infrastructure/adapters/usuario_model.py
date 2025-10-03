from sqlalchemy import Integer, Column, DateTime, Boolean, String
from sqlalchemy.sql.functions import func

from src.infrastructure.config.database import Base

# creación del modelo ORM para la tabla de usuarios
class UsuarioModel(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
