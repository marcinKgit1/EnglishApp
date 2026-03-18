export interface StaticSentence {
  id: string;
  topic: string;
  polish: string;
  english: string[];
}

export const practiceSentences: StaticSentence[] = [
  // Present Simple
  {
    id: 'ps-1',
    topic: 'Present Simple',
    polish: 'Ona pracuje w banku.',
    english: ['She works in a bank.', 'She works at a bank.']
  },
  {
    id: 'ps-2',
    topic: 'Present Simple',
    polish: 'Czy lubisz kawę?',
    english: ['Do you like coffee?']
  },
  {
    id: 'ps-3',
    topic: 'Present Simple',
    polish: 'Oni nie grają w tenisa w weekendy.',
    english: ['They do not play tennis on weekends.', 'They don\'t play tennis on weekends.', 'They do not play tennis at weekends.', 'They don\'t play tennis at weekends.']
  },
  {
    id: 'ps-4',
    topic: 'Present Simple',
    polish: 'Mój brat często czyta książki.',
    english: ['My brother often reads books.']
  },
  {
    id: 'ps-5',
    topic: 'Present Simple',
    polish: 'O której godzinie wstajesz?',
    english: ['What time do you get up?', 'What time do you wake up?']
  },

  // Present Continuous
  {
    id: 'pc-1',
    topic: 'Present Continuous',
    polish: 'Teraz czytam ciekawą książkę.',
    english: ['I am reading an interesting book now.', 'I\'m reading an interesting book now.', 'Right now I am reading an interesting book.']
  },
  {
    id: 'pc-2',
    topic: 'Present Continuous',
    polish: 'Czy oni oglądają telewizję w tym momencie?',
    english: ['Are they watching TV at the moment?', 'Are they watching television at the moment?']
  },
  {
    id: 'pc-3',
    topic: 'Present Continuous',
    polish: 'Ona nie słucha muzyki.',
    english: ['She is not listening to music.', 'She isn\'t listening to music.', 'She\'s not listening to music.']
  },
  {
    id: 'pc-4',
    topic: 'Present Continuous',
    polish: 'Dlaczego płaczesz?',
    english: ['Why are you crying?']
  },
  {
    id: 'pc-5',
    topic: 'Present Continuous',
    polish: 'Mój pies śpi na kanapie.',
    english: ['My dog is sleeping on the sofa.', 'My dog is sleeping on the couch.']
  },

  // Past Simple
  {
    id: 'pas-1',
    topic: 'Past Simple',
    polish: 'Wczoraj poszedłem do kina.',
    english: ['I went to the cinema yesterday.', 'Yesterday I went to the cinema.', 'I went to the movies yesterday.']
  },
  {
    id: 'pas-2',
    topic: 'Past Simple',
    polish: 'Czy widziałeś mojego psa?',
    english: ['Did you see my dog?']
  },
  {
    id: 'pas-3',
    topic: 'Past Simple',
    polish: 'Ona nie kupiła tego samochodu.',
    english: ['She did not buy this car.', 'She didn\'t buy this car.', 'She did not buy that car.', 'She didn\'t buy that car.']
  },
  {
    id: 'pas-4',
    topic: 'Past Simple',
    polish: 'Gdzie spędziłeś wakacje?',
    english: ['Where did you spend your holidays?', 'Where did you spend your vacation?']
  },
  {
    id: 'pas-5',
    topic: 'Past Simple',
    polish: 'Graliśmy w piłkę nożną w zeszłym tygodniu.',
    english: ['We played football last week.', 'We played soccer last week.']
  },

  // Past Continuous
  {
    id: 'pac-1',
    topic: 'Past Continuous',
    polish: 'O 8 rano jadłem śniadanie.',
    english: ['I was eating breakfast at 8 am.', 'I was having breakfast at 8 am.', 'At 8 am I was eating breakfast.']
  },
  {
    id: 'pac-2',
    topic: 'Past Continuous',
    polish: 'Co robiłeś wczoraj o tej porze?',
    english: ['What were you doing yesterday at this time?', 'What were you doing at this time yesterday?']
  },
  {
    id: 'pac-3',
    topic: 'Past Continuous',
    polish: 'Ona nie spała, kiedy zadzwoniłem.',
    english: ['She was not sleeping when I called.', 'She wasn\'t sleeping when I called.', 'She was not asleep when I called.']
  },
  {
    id: 'pac-4',
    topic: 'Past Continuous',
    polish: 'Słońce świeciło i ptaki śpiewały.',
    english: ['The sun was shining and the birds were singing.']
  },
  {
    id: 'pac-5',
    topic: 'Past Continuous',
    polish: 'Czy oni rozmawiali o mnie?',
    english: ['Were they talking about me?']
  },

  // Present Perfect
  {
    id: 'pp-1',
    topic: 'Present Perfect',
    polish: 'Zgubiłem klucze.',
    english: ['I have lost my keys.', 'I\'ve lost my keys.']
  },
  {
    id: 'pp-2',
    topic: 'Present Perfect',
    polish: 'Czy kiedykolwiek byłeś w Paryżu?',
    english: ['Have you ever been to Paris?']
  },
  {
    id: 'pp-3',
    topic: 'Present Perfect',
    polish: 'Ona jeszcze nie skończyła pracy.',
    english: ['She has not finished work yet.', 'She hasn\'t finished work yet.', 'She has not finished her work yet.']
  },
  {
    id: 'pp-4',
    topic: 'Present Perfect',
    polish: 'Znamy się od 10 lat.',
    english: ['We have known each other for 10 years.', 'We\'ve known each other for 10 years.']
  },
  {
    id: 'pp-5',
    topic: 'Present Perfect',
    polish: 'Właśnie zjadłem obiad.',
    english: ['I have just eaten dinner.', 'I\'ve just eaten dinner.', 'I have just had dinner.', 'I\'ve just had lunch.']
  },

  // Future Simple
  {
    id: 'fs-1',
    topic: 'Future Simple',
    polish: 'Pomogę ci z tym.',
    english: ['I will help you with this.', 'I\'ll help you with this.', 'I will help you with that.']
  },
  {
    id: 'fs-2',
    topic: 'Future Simple',
    polish: 'Czy pójdziesz ze mną na imprezę?',
    english: ['Will you go to the party with me?', 'Will you come to the party with me?']
  },
  {
    id: 'fs-3',
    topic: 'Future Simple',
    polish: 'Oni nie wygrają tego meczu.',
    english: ['They will not win this match.', 'They won\'t win this match.', 'They won\'t win this game.']
  },
  {
    id: 'fs-4',
    topic: 'Future Simple',
    polish: 'Myślę, że jutro będzie padać.',
    english: ['I think it will rain tomorrow.', 'I think that it will rain tomorrow.']
  },
  {
    id: 'fs-5',
    topic: 'Future Simple',
    polish: 'Kiedy do mnie zadzwonisz?',
    english: ['When will you call me?']
  },

  // Be going to
  {
    id: 'bgt-1',
    topic: 'Be going to',
    polish: 'Zamierzam kupić nowy samochód.',
    english: ['I am going to buy a new car.', 'I\'m going to buy a new car.']
  },
  {
    id: 'bgt-2',
    topic: 'Be going to',
    polish: 'Czy oni zamierzają się przeprowadzić?',
    english: ['Are they going to move?', 'Are they going to move out?']
  },
  {
    id: 'bgt-3',
    topic: 'Be going to',
    polish: 'Ona nie zamierza mu powiedzieć.',
    english: ['She is not going to tell him.', 'She isn\'t going to tell him.', 'She\'s not going to tell him.']
  },
  {
    id: 'bgt-4',
    topic: 'Be going to',
    polish: 'Spójrz na te chmury. Będzie padać.',
    english: ['Look at those clouds. It is going to rain.', 'Look at these clouds. It\'s going to rain.']
  },
  {
    id: 'bgt-5',
    topic: 'Be going to',
    polish: 'Co zamierzasz zrobić?',
    english: ['What are you going to do?']
  },

  // First Conditional
  {
    id: 'fc-1',
    topic: 'First Conditional',
    polish: 'Jeśli będzie padać, zostaniemy w domu.',
    english: ['If it rains, we will stay at home.', 'If it rains we will stay home.', 'If it rains, we\'ll stay at home.']
  },
  {
    id: 'fc-2',
    topic: 'First Conditional',
    polish: 'Co zrobisz, jeśli nie zdasz egzaminu?',
    english: ['What will you do if you do not pass the exam?', 'What will you do if you don\'t pass the exam?']
  },
  {
    id: 'fc-3',
    topic: 'First Conditional',
    polish: 'Nie pomogę ci, jeśli mi nie powiesz prawdy.',
    english: ['I will not help you if you do not tell me the truth.', 'I won\'t help you if you don\'t tell me the truth.']
  },
  {
    id: 'fc-4',
    topic: 'First Conditional',
    polish: 'Jeśli ona zadzwoni, powiem jej.',
    english: ['If she calls, I will tell her.', 'If she calls I\'ll tell her.']
  },
  {
    id: 'fc-5',
    topic: 'First Conditional',
    polish: 'Będziemy spóźnieni, jeśli się nie pospieszymy.',
    english: ['We will be late if we do not hurry.', 'We\'ll be late if we don\'t hurry up.']
  },

  // Second Conditional
  {
    id: 'sc-1',
    topic: 'Second Conditional',
    polish: 'Gdybym miał dużo pieniędzy, kupiłbym wyspę.',
    english: ['If I had a lot of money, I would buy an island.', 'If I had much money, I would buy an island.']
  },
  {
    id: 'sc-2',
    topic: 'Second Conditional',
    polish: 'Co byś zrobił, gdybyś wygrał na loterii?',
    english: ['What would you do if you won the lottery?']
  },
  {
    id: 'sc-3',
    topic: 'Second Conditional',
    polish: 'Na twoim miejscu nie robiłbym tego.',
    english: ['If I were you, I would not do that.', 'If I were you, I wouldn\'t do this.', 'If I was you, I wouldn\'t do that.']
  },
  {
    id: 'sc-4',
    topic: 'Second Conditional',
    polish: 'Ona byłaby szczęśliwsza, gdyby zmieniła pracę.',
    english: ['She would be happier if she changed her job.', 'She\'d be happier if she changed jobs.']
  },
  {
    id: 'sc-5',
    topic: 'Second Conditional',
    polish: 'Gdybyśmy znali jego adres, wysłalibyśmy mu list.',
    english: ['If we knew his address, we would send him a letter.', 'If we knew his address we\'d send him a letter.']
  },

  // Passive Voice
  {
    id: 'pv-1',
    topic: 'Passive Voice',
    polish: 'Ten dom został zbudowany w 1990 roku.',
    english: ['This house was built in 1990.', 'That house was built in 1990.']
  },
  {
    id: 'pv-2',
    topic: 'Passive Voice',
    polish: 'Moje auto jest teraz naprawiane.',
    english: ['My car is being repaired now.', 'My car is being fixed right now.']
  },
  {
    id: 'pv-3',
    topic: 'Passive Voice',
    polish: 'Listy są dostarczane codziennie.',
    english: ['Letters are delivered every day.', 'The letters are delivered daily.']
  },
  {
    id: 'pv-4',
    topic: 'Passive Voice',
    polish: 'Książka zostanie opublikowana w przyszłym roku.',
    english: ['The book will be published next year.']
  },
  {
    id: 'pv-5',
    topic: 'Passive Voice',
    polish: 'Czy to okno zostało stłuczone przez ciebie?',
    english: ['Was this window broken by you?', 'Was that window broken by you?']
  },

  // Reported Speech
  {
    id: 'rs-1',
    topic: 'Reported Speech',
    polish: 'Powiedział, że jest zmęczony.',
    english: ['He said that he was tired.', 'He said he was tired.']
  },
  {
    id: 'rs-2',
    topic: 'Reported Speech',
    polish: 'Zapytała mnie, gdzie mieszkam.',
    english: ['She asked me where I lived.']
  },
  {
    id: 'rs-3',
    topic: 'Reported Speech',
    polish: 'Powiedzieli, że nie mogą przyjść.',
    english: ['They said that they could not come.', 'They said they couldn\'t come.']
  },
  {
    id: 'rs-4',
    topic: 'Reported Speech',
    polish: 'Nauczyciel kazał nam otworzyć książki.',
    english: ['The teacher told us to open our books.', 'The teacher told us to open the books.']
  },
  {
    id: 'rs-5',
    topic: 'Reported Speech',
    polish: 'Zapytał, czy lubię pizzę.',
    english: ['He asked if I liked pizza.', 'He asked whether I liked pizza.']
  },

  // Past Perfect
  {
    id: 'pap-1',
    topic: 'Past Perfect',
    polish: 'Kiedy dotarłem na stację, pociąg już odjechał.',
    english: ['When I arrived at the station, the train had already left.', 'When I got to the station, the train had already left.']
  },
  {
    id: 'pap-2',
    topic: 'Past Perfect',
    polish: 'Ona nie widziała tego filmu wcześniej.',
    english: ['She had not seen this movie before.', 'She hadn\'t seen that film before.']
  },
  {
    id: 'pap-3',
    topic: 'Past Perfect',
    polish: 'Czy skończyłeś pracę, zanim ona przyszła?',
    english: ['Had you finished work before she came?', 'Had you finished working before she arrived?']
  },
  {
    id: 'pap-4',
    topic: 'Past Perfect',
    polish: 'Byliśmy zmęczeni, ponieważ pracowaliśmy cały dzień.',
    english: ['We were tired because we had worked all day.', 'We were tired because we had been working all day.']
  },
  {
    id: 'pap-5',
    topic: 'Past Perfect',
    polish: 'Zrozumiałem lekcję po tym, jak nauczyciel ją wyjaśnił.',
    english: ['I understood the lesson after the teacher had explained it.']
  }
];
