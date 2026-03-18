export interface Branch {
  id: string;
  title: string;
  focus?: string;
  when?: string;
  structure: string;
  examples: string[];
}

export interface Level {
  id: string;
  title: string;
  level: string;
  focus: string;
  branches: Branch[];
}

export const learningPath: Level[] = [
  {
    id: 'level-1',
    title: 'Solidne Fundamenty',
    level: 'A1 - Początkujący',
    focus: 'Co jest teraz, co jest ogólnie i absolutne podstawy.',
    branches: [
      {
        id: 'l1-b1',
        title: 'Stan (To be)',
        structure: 'Twierdzenie: I am, You are, He is. (Jestem, ty jesteś...)\nPrzeczenie: I am not, You aren\'t.\nPytanie: Are you? Is he? (Inwersja - zamiana miejscami).',
        examples: ['I am happy.', 'Are you ready?', 'He isn\'t here.']
      },
      {
        id: 'l1-b2',
        title: 'Rutyna i Fakty (Present Simple)',
        when: 'Zwyczaje, rozkłady jazdy, stałe sytuacje.',
        structure: 'Twierdzenie: I play. He plays (uwaga na końcówkę \'s\' dla 3 os. l.poj!).\nPytanie/Przeczenie: Używamy do/does. (Do you play? He doesn\'t play).',
        examples: ['I play tennis every Sunday.', 'She doesn\'t like coffee.', 'Do they live here?']
      },
      {
        id: 'l1-b3',
        title: 'Tu i Teraz (Present Continuous)',
        when: 'W tym momencie, tymczasowe sytuacje.',
        structure: 'Struktura: To be + V-ing.\nPytanie/Przeczenie: Am I working? I am not working.',
        examples: ['I am working right now.', 'Is she sleeping?', 'They aren\'t watching TV.']
      }
    ]
  },
  {
    id: 'level-2',
    title: 'Swobodna Komunikacja',
    level: 'A2 - Niższy Średniozaawansowany',
    focus: 'Zakończona przeszłość i proste plany na przyszłość.',
    branches: [
      {
        id: 'l2-b1',
        title: 'Zamknięta Przeszłość (Past Simple)',
        when: 'Akcja zakończona w przeszłości (znamy czas: wczoraj, rok temu).',
        structure: 'Twierdzenie: Używasz V2 (I played. I went).\nPytanie/Przeczenie: Używamy did + V1 (powrót do podstawowej formy!).',
        examples: ['I played football yesterday.', 'Did you go to the cinema?', 'I didn\'t see him.']
      },
      {
        id: 'l2-b2',
        title: 'Zamiary (Struktura "Going to")',
        when: 'Masz już plan lub widzisz, że coś się zaraz wydarzy (ciemne chmury -> będzie padać).',
        structure: 'Struktura: To be + going to + V1.',
        examples: ['I am going to work tomorrow.', 'Look at those clouds! It is going to rain.', 'Are you going to buy it?']
      },
      {
        id: 'l2-b3',
        title: 'Obietnice i Spontaniczność (Future Simple)',
        when: 'Spontaniczne decyzje podjęte w chwili mówienia, obietnice, przewidywania bez dowodów.',
        structure: 'Struktura: Will + V1.',
        examples: ['I will help you.', 'Will you help me?', 'I won\'t do it.']
      }
    ]
  },
  {
    id: 'level-3',
    title: 'Pewność Siebie',
    level: 'B1 - Średniozaawansowany',
    focus: 'Łączenie przeszłości z teraźniejszością i budowanie kontekstu.',
    branches: [
      {
        id: 'l3-b1',
        title: 'Tło dla wydarzeń (Past Continuous)',
        when: 'Coś trwało w przeszłości i zostało przerwane, lub stanowiło tło.',
        structure: 'Struktura: Was/were + V-ing.\nPytanie/Przeczenie: Were you reading? I wasn\'t reading.',
        examples: ['I was reading when the phone rang.', 'Were they playing games?', 'She wasn\'t listening.']
      },
      {
        id: 'l3-b2',
        title: 'Życiowe Doświadczenia i Skutki (Present Perfect Simple)',
        when: 'Przeszłość ma skutek TERAZ. Doświadczenia życiowe (bez podawania konkretnej daty). Most między przeszłością a teraźniejszością.',
        structure: 'Struktura: Have/has + V3.\nPytanie/Przeczenie: Have you visited? I haven\'t visited.',
        examples: ['I have visited Paris.', 'She has lost her keys.', 'Have you ever eaten sushi?']
      },
      {
        id: 'l3-b3',
        title: 'Warunki (0 i 1st Conditional)',
        when: 'Zero: Fakty. First: Prawdopodobna przyszłość.',
        structure: 'Zero: If + Present Simple, Present Simple.\nFirst: If + Present Simple, Future Simple (will).',
        examples: ['If you heat water, it boils.', 'If it rains, I will stay home.', 'If she calls, I will tell her.']
      }
    ]
  },
  {
    id: 'level-4',
    title: 'Płynność i Precyzja',
    level: 'B2 - Wyższy Średniozaawansowany',
    focus: 'Precyzyjne określanie czasu trwania, gdybanie i zaprzeszłość.',
    branches: [
      {
        id: 'l4-b1',
        title: 'Zmęczenie i Proces (Present Perfect Continuous)',
        when: 'Akcja zaczęła się w przeszłości, trwała aż do teraz i widać tego efekty (np. jesteś spocony, bo biegałeś). Kładzie nacisk na PROCES, nie efekt.',
        structure: 'Struktura: Have/has + been + V-ing.',
        examples: ['I have been waiting for 2 hours.', 'She has been studying all day.', 'Have you been crying?']
      },
      {
        id: 'l4-b2',
        title: '"Zaprzeszłość" (Past Perfect Simple)',
        when: 'Dwie rzeczy wydarzyły się w przeszłości. Ten czas opisuje tę, która wydarzyła się NAJPIERW (przeszłość w przeszłości).',
        structure: 'Struktura: Had + V3.',
        examples: ['When I arrived, the train had left.', 'I had finished my homework before dinner.', 'Had they met before?']
      },
      {
        id: 'l4-b3',
        title: 'Niemożliwa teraźniejszość i przeszłość (2nd & 3rd Conditional)',
        when: 'Second: Gdybanie o teraźniejszości/przyszłości. Third: Gdybanie o przeszłości - żale.',
        structure: 'Second: If + Past Simple, would + V1.\nThird: If + Past Perfect, would have + V3.',
        examples: ['If I had a million dollars, I would buy a boat.', 'If I had studied harder, I would have passed.', 'What would you do if you won the lottery?']
      },
      {
        id: 'l4-b4',
        title: 'Akcja w trakcie w przyszłości (Future Continuous)',
        when: 'O konkretnej porze w przyszłości będziesz "w środku" robienia czegoś.',
        structure: 'Struktura: Will be + V-ing.',
        examples: ['Tomorrow at 5 PM, I will be flying to NY.', 'Will you be using the car later?', 'They won\'t be working on Sunday.']
      }
    ]
  },
  {
    id: 'level-5',
    title: 'Pełne Mistrzostwo',
    level: 'C1/C2 - Zaawansowany',
    focus: 'Ekstremalna precyzja, skomplikowane hipotezy i subtelności znaczeniowe.',
    branches: [
      {
        id: 'l5-b1',
        title: 'Proces przed przeszłością (Past Perfect Continuous)',
        when: 'Pokazuje, jak długo coś trwało, ZANIM wydarzyło się coś innego w przeszłości.',
        structure: 'Struktura: Had been + V-ing.',
        examples: ['I had been driving for 6 hours before I stopped.', 'She had been waiting for an hour when he arrived.', 'Had they been talking long?']
      },
      {
        id: 'l5-b2',
        title: 'Zakończenie w przyszłości (Future Perfect Simple)',
        when: 'Zrobię coś DO konkretnego momentu w przyszłości (np. "skończę ten projekt do piątku").',
        structure: 'Struktura: Will have + V3.',
        examples: ['I will have finished it by Friday.', 'Will she have arrived by then?', 'They won\'t have completed the work.']
      },
      {
        id: 'l5-b3',
        title: 'Długość trwania w przyszłości (Future Perfect Continuous)',
        when: 'Bardzo rzadki czas. Wskazuje, ile czasu będzie trwała jakaś czynność do określonego momentu w przyszłości.',
        structure: 'Struktura: Will have been + V-ing.',
        examples: ['By next year, I will have been living here for 10 years.', 'Will you have been working here for a year next month?', 'She won\'t have been studying long enough.']
      },
      {
        id: 'l5-b4',
        title: 'Mixed Conditionals (Mieszane Tryby Warunkowe)',
        when: 'Mieszanie przeszłości z teraźniejszością. Np.: Gdybym wczoraj poszedł spać wcześniej (przeszłość), to dzisiaj nie byłbym zmęczony (teraźniejszość).',
        structure: 'Struktura: If + Past Perfect, would + V1 (lub odwrotnie).',
        examples: ['If I had gone to bed earlier, I wouldn\'t be tired now.', 'If I were richer, I would have bought that car yesterday.', 'If she had taken the job, she would be living in London now.']
      }
    ]
  }
];

export const cheatSheet = [
  { group: 'Simple (Teraźniejszość)', operator: 'Do / Does', question: 'Do you work?', negative: 'I do not (don\'t) work.' },
  { group: 'Simple (Przeszłość)', operator: 'Did', question: 'Did you work?', negative: 'I did not (didn\'t) work.' },
  { group: 'Continuous (Wszystkie)', operator: 'To be (am, is, are, was, were)', question: 'Are you working?', negative: 'I am not working.' },
  { group: 'Perfect (Wszystkie)', operator: 'Have / Has / Had', question: 'Have you worked?', negative: 'I have not (haven\'t) worked.' },
  { group: 'Future (Wszystkie)', operator: 'Will', question: 'Will you work?', negative: 'I will not (won\'t) work.' },
];
