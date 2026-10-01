import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Phone, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';

export default function PortalLoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.trim()) setStep('otp');
  };

  const handleVerify = () => {
    if (otp.length === 6) navigate('/portal/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-primary">
            <Building2 size={24} className="text-white" />
          </div>
          <div className="text-center">
            <span className="text-heading font-bold text-xl">FracProp OS</span>
            <p className="text-xs text-muted">by Gnanova Pro AI Technologies</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-[6px] border border-border bg-white p-6">
          <h1 className="text-lg font-semibold text-heading">Buyer Portal Login</h1>
          <p className="mt-1 text-sm text-muted">Enter your registered phone number to continue</p>

          {step === 'phone' ? (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-muted">Phone Number</label>
                <div className="flex items-center gap-2 rounded-[6px] border border-border bg-surface px-3 py-2.5">
                  <Phone size={16} className="text-muted" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-heading placeholder-textgray focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleSendOtp}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Send OTP <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-muted">Enter 6-digit OTP</label>
                <div className="flex items-center gap-2 rounded-[6px] border border-border bg-surface px-3 py-2.5">
                  <KeyRound size={16} className="text-muted" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-transparent text-center text-lg tracking-[0.5em] text-heading placeholder-textgray focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-xs text-muted">Any 6-digit code works for this demo</p>
              </div>
              <button
                onClick={handleVerify}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Verify & Login <ArrowRight size={16} />
              </button>
              <button onClick={() => setStep('phone')} className="w-full text-center text-xs text-muted hover:text-heading">
                Change phone number
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <Link to="/dashboard" className="flex items-center justify-center gap-1 text-xs text-primary hover:text-primary-hover">
              <ArrowLeft size={12} /> Are you a developer? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
