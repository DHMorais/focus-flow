import React, { useState } from 'react';
import { Send, Trash2, ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';
import { BrainDumpItem } from '../../types/braindump';
import { TimePeriod } from '../../types/task';

interface Props {
  items: BrainDumpItem[];
  onAddItem: (content: string) => void;
  onDeleteItem: (id: string) => void;
  onConvertToTask: (content: string, period: TimePeriod) => void;
  onMarkProcessed: (id: string) => void;
}

export const BrainDumpView: React.FC<Props> = ({
  items,
  onAddItem,
  onDeleteItem,
  onConvertToTask,
  onMarkProcessed,
}) => {
  const [text, setText] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<Record<string, TimePeriod>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddItem(text.trim());
      setText('');
    }
  };

  const handleConvert = (item: BrainDumpItem) => {
    const period = selectedPeriod[item.id] || 'morning';
    onConvertToTask(item.content, period);
    onMarkProcessed(item.id);
  };

  const active = items.filter((i) => !i.processed);
  const done = items.filter((i) => i.processed);

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-700/80 rounded-2xl">
            <Lightbulb className="w-6 h-6 text-teal-200" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Descarga Mental (Brain Dump)</h2>
            <p className="text-xs text-teal-100/90 mt-1">
              Ideia ou pensamento intrusivo? Solte aqui para esvaziar a mente e organizar depois.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-slate-700">O que está na sua cabeça agora?</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Comprar pilhas, Ligar para médico..."
            className="flex-1 bg-slate-50 text-sm border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none text-slate-800"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            Salvar
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 px-1">Sem organizar ({active.length})</h3>

        {active.length === 0 ? (
          <div className="text-center py-8 bg-white/60 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-xs text-slate-500 font-medium">Sua mente está limpa! Nenhuma anotação pendente.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {active.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800">{item.content}</p>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-lg"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">Mover para:</span>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={selectedPeriod[item.id] || 'morning'}
                      onChange={(e) => setSelectedPeriod({ ...selectedPeriod, [item.id]: e.target.value as TimePeriod })}
                      className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                    >
                      <option value="morning">🌅 Manhã</option>
                      <option value="afternoon">☀️ Tarde</option>
                      <option value="night">🌙 Noite</option>
                    </select>

                    <button
                      onClick={() => handleConvert(item)}
                      className="flex items-center gap-1 px-3 py-1 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg shadow-sm"
                    >
                      <span>Mover</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {done.length > 0 && (
          <div className="pt-4 border-t border-slate-200/60 space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 px-1">Organizados ({done.length})</h4>
            <div className="space-y-1.5">
              {done.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-100/70 px-3 py-2 rounded-xl text-xs text-slate-500">
                  <span className="line-through flex-1">{item.content}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 ml-2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
