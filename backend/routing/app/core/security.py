from typing import Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings

security = HTTPBearer(auto_error=False)


async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Основная проверка наличия токена у пользователя"""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Отсутствует токен авторизации",
        )

    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )

        user_id = payload.get("userId")
        username = payload.get("username")
        email = payload.get("email")

        if not all([user_id, username, email]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Неполные данные в токене",
            )

        return {"userId": user_id, "username": username, "email": email}

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Срок действия токена истек",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Недействительный токен"
        )


async def optional_verify_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
):
    """
    Опциональная проверка токена (для публичных route)
    """
    if not credentials:
        return None

    try:
        return await verify_token(credentials)
    except HTTPException:
        return None
