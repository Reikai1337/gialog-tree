import { type Node, type Edge } from "@xyflow/react";

// ─── Начальные ноды ───────────────────────────────────────────────────────────

export const initialNodes: Node[] = [
  // ── Уровень 1: Стартовый вопрос ──
  {
    id: "q-start",
    type: "question",
    position: { x: 350, y: 40 },
    data: {
      label: "Как вас найти?",
      hint: "Выберите канал для дальнейшего общения",
    },
  },

  // ── Уровень 2: Ответы ──
  {
    id: "a-email",
    type: "answer",
    position: { x: 80, y: 180 },
    data: { label: "По email", emoji: "📧" },
  },
  {
    id: "a-phone",
    type: "answer",
    position: { x: 350, y: 180 },
    data: { label: "По телефону", emoji: "📞" },
  },
  {
    id: "a-chat",
    type: "answer",
    position: { x: 620, y: 180 },
    data: { label: "В мессенджере", emoji: "💬" },
  },

  // ── Уровень 3: Сценарии ──
  {
    id: "s-email",
    type: "scenario",
    position: { x: 30, y: 320 },
    data: {
      label: "Email-сценарий",
      description: "Отправляем письмо с подтверждением",
      color: "green",
    },
  },
  {
    id: "s-phone",
    type: "scenario",
    position: { x: 290, y: 320 },
    data: {
      label: "Звонок-сценарий",
      description: "Уточняем удобное время для звонка",
      color: "amber",
    },
  },
  {
    id: "s-chat",
    type: "scenario",
    position: { x: 570, y: 320 },
    data: {
      label: "Мессенджер-сценарий",
      description: "Выбираем платформу — Telegram, WhatsApp",
      color: "purple",
    },
  },

  // ── Уровень 4: Продолжение email-сценария ──
  {
    id: "q-email-time",
    type: "question",
    position: { x: 30, y: 490 },
    data: {
      label: "Когда удобно получить ответ?",
    },
  },
  {
    id: "a-asap",
    type: "answer",
    position: { x: -70, y: 630 },
    data: { label: "Как можно скорее", emoji: "⚡" },
  },
  {
    id: "a-week",
    type: "answer",
    position: { x: 140, y: 630 },
    data: { label: "В течение недели", emoji: "📅" },
  },
  {
    id: "s-urgent",
    type: "scenario",
    position: { x: -100, y: 770 },
    data: {
      label: "Срочный email",
      description: "Ответим в течение 2 часов",
      color: "red",
    },
  },
  {
    id: "s-regular",
    type: "scenario",
    position: { x: 110, y: 770 },
    data: {
      label: "Стандартный email",
      description: "Ответим в рабочие дни",
      color: "green",
    },
  },
];

// ─── Начальные связи ──────────────────────────────────────────────────────────

export const initialEdges: Edge[] = [
  // Вопрос → Ответы
  {
    id: "e1",
    source: "q-start",
    target: "a-email",
    animated: true,
    style: { stroke: "#6366f155", strokeWidth: 1.5 },
  },
  {
    id: "e2",
    source: "q-start",
    target: "a-phone",
    animated: true,
    style: { stroke: "#6366f155", strokeWidth: 1.5 },
  },
  {
    id: "e3",
    source: "q-start",
    target: "a-chat",
    animated: true,
    style: { stroke: "#6366f155", strokeWidth: 1.5 },
  },

  // Ответы → Сценарии
  {
    id: "e4",
    source: "a-email",
    target: "s-email",
    style: { stroke: "#22d3ee66", strokeWidth: 1.5 },
  },
  {
    id: "e5",
    source: "a-phone",
    target: "s-phone",
    style: { stroke: "#22d3ee66", strokeWidth: 1.5 },
  },
  {
    id: "e6",
    source: "a-chat",
    target: "s-chat",
    style: { stroke: "#22d3ee66", strokeWidth: 1.5 },
  },

  // Email-сценарий → следующий вопрос
  {
    id: "e7",
    source: "s-email",
    target: "q-email-time",
    style: { stroke: "#4ade8066", strokeWidth: 1.5 },
  },
  {
    id: "e8",
    source: "q-email-time",
    target: "a-asap",
    animated: true,
    style: { stroke: "#6366f155", strokeWidth: 1.5 },
  },
  {
    id: "e9",
    source: "q-email-time",
    target: "a-week",
    animated: true,
    style: { stroke: "#6366f155", strokeWidth: 1.5 },
  },
  {
    id: "e10",
    source: "a-asap",
    target: "s-urgent",
    style: { stroke: "#22d3ee66", strokeWidth: 1.5 },
  },
  {
    id: "e11",
    source: "a-week",
    target: "s-regular",
    style: { stroke: "#22d3ee66", strokeWidth: 1.5 },
  },
];
