import { practiceSentences } from "../data/sentences";
import { vocabulary } from "../data/vocabulary";

export interface PracticeSentence {
  polish: string;
  english: string;
  acceptableTranslations?: string[];
}

export interface EvaluationResult {
  isCorrect: boolean;
  feedback: string;
}

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .replace(/[.,?!:;()"']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (text: string) =>
  normalizeText(text).split(" ").filter(Boolean);

const getVocabularyEntry = (english: string) =>
  vocabulary.find(
    (entry) => normalizeText(entry.english) === normalizeText(english),
  );

const toPracticeSentence = (
  polish: string,
  englishVariants: string[],
): PracticeSentence => ({
  polish,
  english: englishVariants[0],
  acceptableTranslations: englishVariants,
});

const buildVerbFallbacks = (
  word: string,
  polishLabel: string,
): PracticeSentence[] => {
  const normalizedWord = normalizeText(word);

  if (normalizedWord === "be") {
    return [
      toPracticeSentence("Jestem dzisiaj spokojny.", [
        "I am calm today.",
        "I'm calm today.",
      ]),
      toPracticeSentence("Oni są teraz w domu.", [
        "They are at home now.",
        "They're at home now.",
      ]),
      toPracticeSentence("Czy ona jest gotowa?", ["Is she ready?"]),
      toPracticeSentence("To jest bardzo ważne.", ["This is very important."]),
      toPracticeSentence("Nie jesteśmy spóźnieni.", [
        "We are not late.",
        "We aren't late.",
      ]),
    ];
  }

  if (normalizedWord === "have") {
    return [
      toPracticeSentence("Mam dziś dużo pracy.", [
        "I have a lot of work today.",
      ]),
      toPracticeSentence("Ona ma dobry pomysł.", ["She has a good idea."]),
      toPracticeSentence("Czy masz chwilę?", ["Do you have a minute?"]),
      toPracticeSentence("Nie mamy teraz czasu.", [
        "We do not have time now.",
        "We don't have time now.",
      ]),
      toPracticeSentence("Oni mają dwa psy.", ["They have two dogs."]),
    ];
  }

  if (normalizedWord === "do") {
    return [
      toPracticeSentence("Robię to codziennie.", ["I do it every day."]),
      toPracticeSentence("Czy robisz to sam?", ["Do you do it yourself?"]),
      toPracticeSentence("Ona nie robi tego często.", [
        "She does not do it often.",
        "She doesn't do it often.",
      ]),
      toPracticeSentence("Zróbmy to teraz.", [
        "Let us do it now.",
        "Let's do it now.",
      ]),
      toPracticeSentence("Oni robią świetną robotę.", ["They do a great job."]),
    ];
  }

  return [
    toPracticeSentence(`Mogę ${polishLabel} teraz.`, [`I can ${word} now.`]),
    toPracticeSentence(`Nie chcę ${polishLabel} dzisiaj.`, [
      `I do not want to ${word} today.`,
      `I don't want to ${word} today.`,
    ]),
    toPracticeSentence(`Czy potrafisz ${polishLabel} szybko?`, [
      `Can you ${word} quickly?`,
    ]),
    toPracticeSentence(`Oni muszą ${polishLabel} razem.`, [
      `They have to ${word} together.`,
    ]),
    toPracticeSentence(`Ona lubi ${polishLabel} rano.`, [
      `She likes to ${word} in the morning.`,
    ]),
  ];
};

const buildPhraseFallbacks = (
  word: string,
  polishLabel: string,
): PracticeSentence[] => [
  toPracticeSentence(`W takiej sytuacji mówię: "${polishLabel}".`, [
    `In this situation I say: "${word}."`,
    `In this situation, I say: "${word}."`,
  ]),
  toPracticeSentence(`Na koniec rozmowy możesz powiedzieć: "${polishLabel}".`, [
    `At the end of the conversation, you can say: "${word}."`,
  ]),
  toPracticeSentence(`To krótkie wyrażenie znaczy: "${polishLabel}".`, [
    `This short phrase means: "${word}."`,
  ]),
  toPracticeSentence(`Często słyszysz zdanie: "${polishLabel}".`, [
    `You often hear the phrase: "${word}."`,
  ]),
  toPracticeSentence(`Najprostsza odpowiedź brzmi: "${polishLabel}".`, [
    `The simplest answer is: "${word}."`,
  ]),
];

const buildNounFallbacks = (
  word: string,
  polishLabel: string,
): PracticeSentence[] => [
  toPracticeSentence(`To jest mój ${polishLabel}.`, [`This is my ${word}.`]),
  toPracticeSentence(`Potrzebuję tego ${polishLabel} teraz.`, [
    `I need this ${word} now.`,
  ]),
  toPracticeSentence(`Ten ${polishLabel} jest bardzo ważny.`, [
    `This ${word} is very important.`,
  ]),
  toPracticeSentence(`Mamy więcej niż jeden ${polishLabel}.`, [
    `We have more than one ${word}.`,
  ]),
  toPracticeSentence(`Czy widzisz ten ${polishLabel}?`, [
    `Can you see this ${word}?`,
  ]),
];

const buildAdjectiveFallbacks = (
  word: string,
  polishLabel: string,
): PracticeSentence[] => [
  toPracticeSentence(`To jest bardzo ${polishLabel}.`, [`It is very ${word}.`]),
  toPracticeSentence(`Ten budynek wydaje się ${polishLabel}.`, [
    `This building seems ${word}.`,
  ]),
  toPracticeSentence(`Dzisiaj czuję się bardziej ${polishLabel}.`, [
    `I feel more ${word} today.`,
  ]),
  toPracticeSentence(`Czy to wygląda ${polishLabel}?`, [
    `Does it look ${word}?`,
  ]),
  toPracticeSentence(`Ich plan jest naprawdę ${polishLabel}.`, [
    `Their plan is really ${word}.`,
  ]),
];

const buildFallbackSentences = (
  word: string,
  type: string,
): PracticeSentence[] => {
  const vocabularyEntry = getVocabularyEntry(word);
  const polishLabel = vocabularyEntry?.polish.split("/")[0] ?? word;

  if (type === "verb") return buildVerbFallbacks(word, polishLabel);
  if (type === "phrase") return buildPhraseFallbacks(word, polishLabel);
  if (type === "adjective") return buildAdjectiveFallbacks(word, polishLabel);
  return buildNounFallbacks(word, polishLabel);
};

export async function generateSentences(
  word: string,
  type: string,
): Promise<PracticeSentence[]> {
  const normalizedWord = normalizeText(word);
  const matches = practiceSentences
    .filter((sentence) =>
      sentence.english.some((translation) => {
        const normalizedTranslation = normalizeText(translation);
        const queryTokens = tokenize(word);

        if (queryTokens.length > 1) {
          return normalizedTranslation.includes(normalizedWord);
        }

        return tokenize(translation).includes(normalizedWord);
      }),
    )
    .map((sentence) => toPracticeSentence(sentence.polish, sentence.english));

  const fallback = buildFallbackSentences(word, type);
  const combined = [...matches, ...fallback];
  const seen = new Set<string>();

  return combined
    .filter((sentence) => {
      const key = normalizeText(sentence.english);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
}

export async function explainError(
  polish: string,
  expectedEnglish: string,
  userEnglish: string,
): Promise<string> {
  const expectedTokens = tokenize(expectedEnglish);
  const userTokens = tokenize(userEnglish);
  const missingTokens = expectedTokens.filter(
    (token) => !userTokens.includes(token),
  );
  const extraTokens = userTokens.filter(
    (token) => !expectedTokens.includes(token),
  );

  if (normalizeText(expectedEnglish) === normalizeText(userEnglish)) {
    return "To tłumaczenie jest poprawne. Różnica dotyczy tylko interpunkcji lub wielkości liter.";
  }

  const notes: string[] = [
    `Porównaj odpowiedź z wzorcem dla zdania: "${polish}".`,
  ];

  if (missingTokens.length > 0) {
    notes.push(`Brakuje elementów: ${missingTokens.slice(0, 4).join(", ")}.`);
  }

  if (extraTokens.length > 0) {
    notes.push(
      `Masz też dodatkowe słowa: ${extraTokens.slice(0, 4).join(", ")}.`,
    );
  }

  notes.push(`Wzorcowa odpowiedź to: "${expectedEnglish}".`);
  return notes.join(" ");
}

export async function evaluateTranslation(
  polish: string,
  userEnglish: string,
  context: string,
): Promise<EvaluationResult> {
  const isQuestion = polish.trim().endsWith("?");
  const normalizedInput = normalizeText(userEnglish);
  const looksQuestion =
    normalizedInput.startsWith("do ") ||
    normalizedInput.startsWith("does ") ||
    normalizedInput.startsWith("did ") ||
    normalizedInput.startsWith("is ") ||
    normalizedInput.startsWith("are ") ||
    normalizedInput.startsWith("was ") ||
    normalizedInput.startsWith("were ") ||
    normalizedInput.startsWith("have ") ||
    normalizedInput.startsWith("has ") ||
    normalizedInput.startsWith("had ") ||
    normalizedInput.startsWith("will ") ||
    normalizedInput.startsWith("can ");

  if (isQuestion && !looksQuestion) {
    return {
      isCorrect: false,
      feedback: `To zdanie jest pytaniem, więc sprawdź szyk pytający właściwy dla struktury "${context}".`,
    };
  }

  if (!normalizedInput) {
    return {
      isCorrect: false,
      feedback: "Najpierw wpisz tłumaczenie, a potem je sprawdź.",
    };
  }

  return {
    isCorrect: true,
    feedback:
      "Tłumaczenie wygląda sensownie. Porównaj je jeszcze z odpowiedzią wzorcową, zwłaszcza pod kątem operatorów i szyku.",
  };
}

export async function translateWord(
  word: string,
  context: string,
): Promise<string> {
  const normalizedWord = normalizeText(word);
  const exactMatch = vocabulary.find((entry) =>
    entry.polish
      .split("/")
      .map((variant) => normalizeText(variant))
      .includes(normalizedWord),
  );

  if (exactMatch) {
    return exactMatch.english;
  }

  const partialMatch = vocabulary.find((entry) =>
    entry.polish
      .split("/")
      .map((variant) => normalizeText(variant))
      .some(
        (variant) =>
          variant.includes(normalizedWord) || normalizedWord.includes(variant),
      ),
  );

  if (partialMatch) {
    return partialMatch.english;
  }

  return `Brak lokalnego tłumaczenia dla "${word}" w zdaniu "${context}".`;
}

export async function getHint(
  polish: string,
  context: string,
): Promise<string> {
  const normalizedContext = normalizeText(context);

  if (normalizedContext.includes("present simple")) {
    return "Użyj Present Simple. W pytaniu lub przeczeniu pamiętaj o do/does, a dla he/she/it o końcówce -s w twierdzeniu.";
  }

  if (normalizedContext.includes("present continuous")) {
    return "Szukaj konstrukcji to be + czasownik z końcówką -ing. Jeśli to pytanie, przesuń operator na początek.";
  }

  if (normalizedContext.includes("past simple")) {
    return "Użyj Past Simple. W twierdzeniu czasownik przechodzi do II formy, a w pytaniu i przeczeniu wraca do podstawowej formy po did.";
  }

  if (normalizedContext.includes("future simple")) {
    return "Użyj will + czasownik w podstawowej formie. Jeśli to pytanie, zacznij od will.";
  }

  if (normalizedContext.includes("present perfect")) {
    return "Pomyśl o have/has + trzecia forma czasownika. Zwróć uwagę, czy zdanie łączy przeszłość z efektem teraz.";
  }

  if (normalizedContext.includes("conditional")) {
    return "Zwróć uwagę na dwie części zdania: warunek po if i rezultat. Najpierw ustal, czy mówisz o fakcie, przyszłości czy gdybaniu.";
  }

  if (polish.trim().endsWith("?")) {
    return "To pytanie, więc sprawdź szyk i operator na początku zdania.";
  }

  return "Najpierw ustal czas i operator, potem zbuduj prosty szyk: podmiot, czasownik, reszta zdania.";
}
