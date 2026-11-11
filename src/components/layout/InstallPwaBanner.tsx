import React from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

export const InstallPwaBanner: React.FC = () => {
  const { isInstallable, installPwa } = usePwaInstall();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <div className="bg-teal-900 text-white px-4 py-3 shadow-md transition-all">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-800/80 rounded-xl">
            <Smartphone className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-100">Instale no seu Celular</p>
            <p className="text-[11px] text-teal-200/80">Use offline e como aplicativo nativo na tela inicial.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={installPwa}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-teal-950 font-bold text-xs rounded-xl shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            Instalar
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-teal-300 hover:text-white rounded-lg"
            aria-label="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
