from pydantic import BaseModel, Field


class UserSchemaBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    apellido: str = Field(..., min_length=2, max_length=50)
    email: str = Field(..., min_length=2, max_length=50)

