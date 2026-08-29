import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck, Sparkles, LogIn } from 'lucide-react';

export const UserAuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-6 font-sans">
      <div className="bg-surface border border-slate-800 rounded-2xl w-[440px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-panel border-b border-slate-800 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-bold">
            ✕
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-cyan via-blue-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-accent-cyan/20 mb-3">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-base font-bold text-slate-100 tracking-wide font-mono">
            {isSignUp ? 'STUDENT & EDUCATOR SIGN UP' : 'SIGN IN TO VIRTUAL CIRCUIT'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp ? 'Access premium IoT simulation features & share projects' : 'Welcome back! Enter your account credentials'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-accent-cyan to-blue-600 font-bold text-slate-950 text-xs rounded-xl shadow-lg shadow-accent-cyan/20 hover:opacity-90 transition-all flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSignUp ? 'Create Student Account' : 'Sign In'}</span>
          </button>

          <div className="pt-2 text-center text-xs text-slate-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-accent-cyan font-semibold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up Free'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
