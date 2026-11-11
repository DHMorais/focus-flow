import React from 'react';
import { Smartphone, Download, CheckCircle, Share } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

export const InstallFooterButton: React.FC = () => {
  const { isInstallable, isInstalled, installPwa } = usePwaInstall();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3 text-center">
      <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-2xl flex items-center justify-center mx-auto border border-teal-100">
        <Smartphone className="w-6 h-6" />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800">Aplicativo no Celular (PWA)</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Use o FocusFlow diretamente da sua tela inicial com suporte offline completo.
        </p>
      </div>

      {isInstalled ? (
        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Aplicativo Instalado na Tela Inicial
        </div>
      ) : isInstallable ? (
        <button
          onClick={installPwa}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-bold text-xs rounded-xl shadow-md transition transform active:scale-95"
        >
          <Download className="w-4 h-4" />
          Instalar Aplicativo na Tela Inicial
        </button>
      ) : (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-left text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700 flex items-center gap-1">
            <Share className="w-3.5 h-3.5 text-teal-600" />
            Como instalar no celular:
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 pl-1">
            <li><strong>Android (Chrome):</strong> Toque no menu de 3 pontos ➔ "Adicionar à Tela Inicial".</li>
            <li><strong>iPhone (Safari):</strong> Toque no botão Compartilhar ➔ "Adicionar à Tela de Início".</li>
          </ul>
        </div>
      )}
    </div>
  );
};
