interface RequireAuthProps {
  children: JSX.Element;
}

// TODO тут будет логика проверки на роли и авторизированного пользователя
export function RequireAuth({ children }: RequireAuthProps) {
  return children;
}
