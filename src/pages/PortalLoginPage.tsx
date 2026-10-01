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
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-gold-500">
            <Building2 size={24} className="text-navy-900" />
          </div>
          <div className="text-center">
            <span className="text-white font-bold text-xl">FracProp OS</span>
            <p className="text-xs text-textgray">by Gnanova Pro AI Technologies</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-6">
          <h1 className="text-lg font-semibold text-white">Buyer Portal Login</h1>
          <p className="mt-1 text-sm text-textgray">Enter your registered phone number to continue</p>

          {step === 'phone' ? (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-textgray">Phone Number</label>
                <div className="flex items-center gap-2 rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2.5">
                  <Phone size={16} className="text-textgray" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-white placeholder-textgray focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleSendOtp}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
              >
                Send OTP <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-textgray">Enter 6-digit OTP</label>
                <div className="flex items-center gap-2 rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2.5">
                  <KeyRound size={16} className="text-textgray" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-transparent text-center text-lg tracking-[0.5em] text-white placeholder-textgray focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-xs text-textgray">Any 6-digit code works for this demo</p>
              </div>
              <button
                onClick={handleVerify}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
              >
                Verify & Login <ArrowRight size={16} />
              </button>
              <button onClick={() => setStep('phone')} className="w-full text-center text-xs text-textgray hover:text-white">
                Change phone number
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-navy-600 pt-4">
            <Link to="/dashboard" className="flex items-center justify-center gap-1 text-xs text-gold-500 hover:text-gold-400">
              <ArrowLeft size={12} /> Are you a developer? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
