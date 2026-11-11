# 🧠 FocusFlow — Planejamento de Arquitetura & UX/UI para TDAH
**App PWA de Agenda e Gestão de Tarefas Otimizado para TDAH**

---

## 1. Filosofia de Design & Diretrizes de Acessibilidade Neuroinclusiva (TDAH)

Pessoas com TDAH frequentemente enfrentam desafios específicos com **funções executivas**, tais como:
1. **Cegueira Temporal (*Time Blindness*):** Dificuldade em estimar e perceber o transcorrer do tempo.
2. **Paralisia por Sobrecarga (*Task Paralysis / Executive Dysfunction*):** Sentimento de incapacidade ao olhar para uma lista longa e genérica de afazeres.
3. **Desregulação da Dopamina:** Procrastinação em tarefas rotineiras e facilidade para esquecer tarefas sem feedback imediato.
4. **Pensamentos Intrusivos e Sobrecarga de Memória de Trabalho:** Ideias surgem a qualquer momento e desviam o foco da tarefa atual.

### Diretrizes de UX/UI Aplicadas no FocusFlow:
- **Redução da Carga Cognitiva:**
  - Modo padrão: **Apenas o "Hoje"**. O passado já foi, o futuro distante gera ansiedade.
  - Divisão do dia em blocos naturais e intuitivos: **Manhã**, **Tarde** e **Noite** (evitando horários hiper-rígidos que geram frustração ao atrasar 5 minutos).
- **Decomposição em Micro-passos (*Chunking*):**
  - Toda tarefa pode ser desdobrada com 1 clique em subpassos atômicos (ex.: "Fazer relatório" ➔ "1. Abrir documento", "2. Escrever introdução").
- **Paleta de Cores Calmante & Sem Alertas Agressivos:**
  - Evitar vermelhos estridentes para prazos; uso de tons suaves de verde sálvia, ardósia, azul índigo e lavanda suave.
  - Contraste WCAG 2.1 AA garantido para leitura confortável sem sobrecarga sensorial.
- **Feedback Dopaminérgico Imediato:**
  - Conclusão de tarefas acompanhada de micro-animação satisfatória (efeito confetti leve e suave) e som relaxante opcional (Web Audio API sem dependências externas).
- **Descarga Mental Imediata (*Brain Dump*):**
  - Botão de acesso rápido flutuante ("Descarregar Pensamento") que não tira o usuário do contexto atual.
- **Foco Integrado com Temporizador Visual:**
  - Pomodoro/Timebox direto no card da tarefa (opções rápidas: 15min, 25min) com barra de progresso visual para combater a cegueira temporal.

---

## 2. Arquitetura Técnica & Stack

- **Frontend:** React 18 / 19 com Vite
- **Linguagem:** TypeScript (Strict Mode)
- **Estilização:** Tailwind CSS (com tema customizado e paleta neutra/relaxante)
- **Ícones:** `lucide-react` (ícones minimalistas, compreensíveis e consistentes)
- **PWA (Progressive Web App):**
  - `vite-plugin-pwa`
  - Manifest completo (`display: standalone`, `theme_color`, ícones responsivos)
  - Service Worker com estratégia de cache para **100% de funcionamento offline**
  - Notificações locais (Web Notifications API) para aviso de fim de timer
- **Persistência Local:**
  - `localStorage` estruturado e versionado (com tipagem e serialização segura).
  - Sem necessidade de login ou banco de dados externo (privacidade total e funcionamento instantâneo).


---

## 3. Estrutura de Pastas e Componentes

```text
focus-planner-pwa/
├── public/
│   ├── favicon.svg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── maskable-icon-512.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx               # Barra superior com saudação, data e status de conectividade
│   │   │   ├── InstallPwaBanner.tsx     # Botão sutil para salvar na tela inicial do celular
│   │   │   └── TabNavigation.tsx        # Abas simples: 'Hoje' e 'Descarga Mental'
│   │   ├── today/
│   │   │   ├── TodayView.tsx            # Visão principal com resumo e blocos do dia
│   │   │   ├── PeriodSection.tsx        # Seções: Manhã (🌅), Tarde (☀️) e Noite (🌙)
│   │   │   ├── TaskCard.tsx             # Card de tarefa com checkbox, microtarefas e botão de foco
│   │   │   └── QuickTaskInput.tsx       # Campo sem fricção para criar tarefas no período
│   │   ├── subtasks/
│   │   │   ├── SubtaskList.tsx          # Lista expansível de micro-passos
│   │   │   └── QuickSubtaskAdd.tsx      # Adição ágil com 1 clique de subpassos
│   │   ├── timer/
│   │   │   └── FocusTimerModal.tsx      # Modo Hiperfoco imersivo com contador visual de 15/25min
│   │   ├── braindump/
│   │   │   └── BrainDumpView.tsx        # Caixa rápida de ideias e pensamentos intrusivos
│   │   └── ui/
│   │       ├── ConfettiFeedback.tsx     # Micro-celebração ao concluir tarefas (dopamina)
│   │       └── Toast.tsx                # Alertas sutis e não invasivos
│   ├── hooks/
│   │   ├── useTasks.ts                  # Estado e persistência de tarefas no LocalStorage
│   │   ├── useBrainDump.ts              # Estado da Descarga Mental
│   │   ├── useFocusTimer.ts             # Temporizador com Web Audio sintetizado
│   │   └── usePwaInstall.ts             # Hook para interceptar prompt de instalação
│   ├── services/
│   │   ├── storage.ts                   # Persistência local segura
│   │   ├── audio.ts                     # Web Audio API para tons sutis de conclusão
│   │   └── notifications.ts             # Web Notifications API para final de sessão
│   ├── types/
│   │   ├── task.ts
│   │   └── braindump.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                        # Estilos Tailwind e classes neuroinclusivas
├── vite.config.ts                       # Configuração Vite + VitePWA
├── tailwind.config.js                   # Paleta relaxante (Emerald, Sage, Slate)
└── package.json
```

