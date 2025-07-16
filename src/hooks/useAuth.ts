// hooks/use-auth.ts
export function useAuth() {
  const token = localStorage.getItem('token') || '';
  return { token };
}
