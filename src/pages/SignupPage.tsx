import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { user, signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await signUpWithEmail(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Google registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors duration-300">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Return back button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-8 shadow-xl relative z-10">
        
        {/* Branding header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-black text-white dark:bg-white dark:text-black p-2.5 rounded-2xl shadow-md flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black font-heading uppercase tracking-tight text-slate-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Standardize your documents at no cost
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. John Doe"
            required
            disabled={submitting}
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. jdoe@example.com"
            required
            disabled={submitting}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            required
            disabled={submitting}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
            disabled={submitting}
          />

          <Button 
            type="submit" 
            disabled={submitting} 
            className="w-full bg-black text-white hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 py-3 mt-2 font-bold uppercase tracking-widest text-xs"
          >
            {submitting ? 'Registering...' : 'Sign Up'}
          </Button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-200 dark:border-neutral-800" />
          <span className="text-[10px] font-bold text-slate-400 uppercase px-4 tracking-widest">or continue with</span>
          <div className="flex-1 border-t border-slate-200 dark:border-neutral-800" />
        </div>

        {/* Google sign-in */}
        <Button
          type="button"
          onClick={handleGoogleSignup}
          disabled={submitting}
          variant="outline"
          className="w-full border-slate-250 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-950 font-bold uppercase tracking-wider text-xs py-3 gap-2"
        >
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Google Account
        </Button>

        {/* Login redirect links */}
        <p className="text-center text-xs text-slate-450 dark:text-slate-400 mt-8 font-semibold">
          Already have an account?{' '}
          <Link to="/login" className="text-black dark:text-white hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignupPage;
