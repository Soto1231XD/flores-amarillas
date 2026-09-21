// Mensajes que se descubren al tocar cada flor en la sección "Reasons".
// `secret: true` marca el easter egg — no se revela hasta tocarlo varias veces.
export const messages = [
  { id: "smile", text: "Esta es por hacerme sonreír.", variant: "sunflower" },
  { id: "thought", text: "Esta es porque pensé en ti.", variant: "tulip" },
  {
    id: "deserved",
    text: "Esta es porque hoy merecías recibir flores.",
    variant: "sunflower",
  },
  { id: "justbecause", text: "Y esta simplemente porque sí.", variant: "tulip" },
  {
    id: "calm",
    text: "Esta es por las veces que, sin saberlo, me diste calma.",
    variant: "sunflower",
  },
  {
    id: "secret",
    text: "¿De verdad pensaste que solo te iba a dar flores? 👀",
    variant: "tulip",
    secret: true,
    secretUnlockAfter: 4,
    secretFollowUp:
      "Hay una carta esperando más adelante. Sigue bajando cuando quieras.",
  },
];
