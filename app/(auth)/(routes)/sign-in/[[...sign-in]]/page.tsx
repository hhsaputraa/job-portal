"use client"; // Diperlukan untuk hook seperti useState

import { SignIn } from "@clerk/nextjs";
import { User, Shield, Briefcase, Copy, Check } from "lucide-react";
import { useState } from "react";

// Menambahkan interface untuk mendefinisikan tipe props
interface CredentialRowProps {
  label: string;
  value: string;
}

// Komponen Reusable untuk baris kredensial dengan fungsi copy
const CredentialRow = ({ label, value }: CredentialRowProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center transition-all hover:bg-white/10">
      <div>
        <p className="text-teal-200 text-xs uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-white font-mono text-sm">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 rounded-md transition-colors text-teal-200 hover:text-white hover:bg-white/10"
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};


export default function Page() {
  return (
    <>
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden lg:flex min-h-screen font-sans">
        
        {/* KIRI: Sisi Branding & Kredensial Demo dengan tema HIJAU */}
        <div className="w-1/2 bg-gradient-to-br from-emerald-700 to-teal-900 p-12 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
               <div className="w-20 h-20 bg-white/10 border border-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Briefcase className="w-9 h-9 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">JobsSukabumi</h1>
              <p className="text-teal-200 text-lg">Demo Accounts untuk Testing</p>
            </div>

            <div className="space-y-5">
              {/* Akun Admin */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500/80 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/50">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Admin Account</h3>
                    <p className="text-teal-200 text-sm">Akses penuh ke dashboard</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <CredentialRow label="Email" value="admin@demo.com" />
                  <CredentialRow label="Password" value="AtminSmi@123" />
                </div>
              </div>

              {/* Akun User */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md">
                 <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-sky-500/80 rounded-lg flex items-center justify-center shadow-lg shadow-sky-900/50">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">User Account</h3>
                    <p className="text-teal-200 text-sm">Akses user reguler</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <CredentialRow label="Email" value="user@demo.com" />
                  <CredentialRow label="Password" value="Pencaker@123" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KANAN: Form Sign In */}
        <div className="w-1/2 bg-slate-50 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
             <div className="text-left mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang</h2>
              <p className="text-slate-600">Silakan masuk untuk melanjutkan.</p>
            </div>
            <SignIn />
          </div>
        </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="lg:hidden min-h-screen bg-gradient-to-br from-emerald-700 to-teal-900 p-6 flex flex-col justify-center font-sans">
        <div className="max-w-md mx-auto w-full">
           {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">JobsSukabumi</h1>
          </div>
          
          {/* Form Sign In */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg mb-6">
            <SignIn />
          </div>
          
          {/* Akun Demo (Collapsible) */}
          <details className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-md text-white">
            <summary className="font-semibold cursor-pointer text-center">Lihat Akun Demo</summary>
            <div className="mt-4 space-y-4">
               {/* Admin */}
               <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-emerald-300"/>
                    <h4 className="font-semibold text-sm">Admin Account</h4>
                  </div>
                  <CredentialRow label="Email" value="admin@demo.com" />
                  <CredentialRow label="Password" value="AtminSmi@123" />
               </div>
               <div className="pt-2"></div>
               {/* User */}
               <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-sky-300"/>
                    <h4 className="font-semibold text-sm">User Account</h4>
                  </div>
                  <CredentialRow label="Email" value="user@demo.com" />
                  <CredentialRow label="Password" value="Pencaker@123" />
               </div>
            </div>
          </details>

        </div>
      </div>
    </>
  );
}
