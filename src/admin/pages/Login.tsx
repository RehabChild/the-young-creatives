import { useState, type FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';

export default function Login() {
  const { login, isAuthenticated } = useAdminAuth();
  const handleApiError = useApiErrorHandler();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6 text-text">
      <div className="w-full max-w-sm">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-sm font-bold text-white">
            YC
          </span>
          The Young Creatives
        </Link>
        <div className="mt-8 rounded-2xl border border-border bg-surface p-8">
          <h1 className="font-display text-xl font-semibold text-text">Studio admin</h1>
          <p className="mt-1 text-sm text-text-soft">Sign in to manage bookings, content, and messages.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-text">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text focus:border-blue-500 focus:outline-none"
                placeholder="admin@theyoungcreatives.studio"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-600 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
