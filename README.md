# 🧠 FocusFlow — Agenda & Gestão de Tarefas Otimizada para TDAH (PWA)

O **FocusFlow** é um aplicativo web progressivo (PWA) de alta performance, projetado com base em princípios de neurodiversidade e psicologia comportamental para pessoas com **TDAH (Transtorno do Déficit de Atenção com Hiperatividade)**.

---

## ✨ Recursos Neuroinclusivos Implementados

1. **Baixa Carga Cognitiva:**
   - Visual limpo e acolhedor (paleta sálvia, ardósia e verde teal).
   - Nada de listas intermináveis: foco exclusivo no **Hoje**, dividido em **Manhã 🌅**, **Tarde ☀️** e **Noite 🌙**.
   - Barra de progresso visual gentil no topo com contagem suave.

2. **Microtarefas (Decomposição contra Paralisia Executiva):**
   - Criação ou desdobramento de tarefas em micro-passos atômicos com 1 clique.
   - Checklist expansível para comemorar cada pequeno avanço.

3. **Gamificação Leve & Feedback Dopaminérgico:**
   - Efeito visual de confetti suave ao concluir qualquer tarefa ou microtarefas.
   - Síntese sonora harmônica via **Web Audio API** (sem arquivos externos, roda 100% offline).

4. **Timer de Foco (Pomodoro / Timebox):**
   - Botão **15m / 25m** direto no card da tarefa.
   - Modo Hiperfoco imersivo em tela cheia com contagem regressiva e aviso ao finalizar.
   - Suporte a notificações locais (Web Notifications API).

5. **Descarga Mental (Brain Dump):**
   - Aba rápida para despejar ideias e pensamentos intrusivos na hora em que surgem.
   - Opção de transformar anotações em tarefas do dia com apenas 1 clique.

6. **100% Offline & PWA:**
   - Salvo automaticamente no `LocalStorage` do dispositivo. Sem login, sem cadastros, sem rastreadores.
   - Pode ser instalado na tela de início de celulares Android e iPhones (iOS).

---

## 🚀 Como Executar o Projeto

No terminal, acesse a pasta do projeto:

```bash
cd "C:\Users\dougl\.cline\data\workspaces\chat\focus-planner-pwa"
npm run dev
```

### 📱 Como Rodar e Testar no Celular:
Para abrir diretamente no celular conectado na mesma rede Wi-Fi:

```bash
npm run dev -- --host
```
O terminal exibirá um endereço como `http://192.168.x.x:5173`.
1. Abra esse endereço no navegador do celular (Chrome ou Safari).
2. Toque no banner **"Instalar no seu Celular"** ou no menu do navegador (**Adicionar à tela de início**).
3. O app se tornará um aplicativo nativo no celular, funcionando inclusive no modo avião!

---

## 🛠️ Tecnologias Utilizadas

- **React 18** + **Vite 6**
- **TypeScript** (Strict Mode)
- **Tailwind CSS**
- **Lucide React** (Ícones minimalistas)
- **Vite PWA Plugin** (`vite-plugin-pwa` + Workbox)
- **Canvas Confetti** + **Web Audio API**
