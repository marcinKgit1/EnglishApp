import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const newSentences = [
  // L1-B1: To be (adding 5 more to reach 15)
  {
    id: "ps-new-171",
    branch_id: "l1-b1",
    topic: "To be",
    polish: "To jest mój pies.",
    english: ["This is my dog."],
  },
  {
    id: "ps-new-172",
    branch_id: "l1-b1",
    topic: "To be",
    polish: "Jesteś zmęczony?",
    english: ["Are you tired?"],
  },
  {
    id: "ps-new-173",
    branch_id: "l1-b1",
    topic: "To be",
    polish: "Niebo jest niebieskie.",
    english: ["The sky is blue."],
  },
  {
    id: "ps-new-174",
    branch_id: "l1-b1",
    topic: "To be",
    polish: "Ona jest bardzo miła.",
    english: ["She is very nice.", "She's very nice."],
  },
  {
    id: "ps-new-175",
    branch_id: "l1-b1",
    topic: "To be",
    polish: "Czy to jest twój samochód?",
    english: ["Is this your car?"],
  },

  // L4-B1: Present Perfect Continuous (adding 5 more to reach 15)
  {
    id: "ps-new-176",
    branch_id: "l4-b1",
    topic: "Present Perfect Continuous",
    polish: "Ona uczy się hiszpańskiego od trzech miesięcy.",
    english: [
      "She has been learning Spanish for three months.",
      "She's been learning Spanish for three months.",
    ],
  },
  {
    id: "ps-new-177",
    branch_id: "l4-b1",
    topic: "Present Perfect Continuous",
    polish: "Pada od rana.",
    english: [
      "It has been raining since morning.",
      "It's been raining since morning.",
    ],
  },
  {
    id: "ps-new-178",
    branch_id: "l4-b1",
    topic: "Present Perfect Continuous",
    polish: "Co robiłeś przez cały dzień?",
    english: ["What have you been doing all day?"],
  },
  {
    id: "ps-new-179",
    branch_id: "l4-b1",
    topic: "Present Perfect Continuous",
    polish: "Oni nie rozmawiają ze sobą od zeszłego tygodnia.",
    english: [
      "They haven't been talking to each other since last week.",
      "They have not been talking to each other since last week.",
    ],
  },
  {
    id: "ps-new-180",
    branch_id: "l4-b1",
    topic: "Present Perfect Continuous",
    polish: "Pracuję nad tym projektem od stycznia.",
    english: [
      "I have been working on this project since January.",
      "I've been working on this project since January.",
    ],
  },

  // L4-B4: Future Continuous (adding 5 more to reach 15)
  {
    id: "ps-new-181",
    branch_id: "l4-b4",
    topic: "Future Continuous",
    polish: "Jutro o tej porze będę leciał do Paryża.",
    english: [
      "This time tomorrow I will be flying to Paris.",
      "This time tomorrow I'll be flying to Paris.",
    ],
  },
  {
    id: "ps-new-182",
    branch_id: "l4-b4",
    topic: "Future Continuous",
    polish: "Ona nie będzie brała udziału w spotkaniu.",
    english: [
      "She won't be attending the meeting.",
      "She will not be attending the meeting.",
    ],
  },
  {
    id: "ps-new-183",
    branch_id: "l4-b4",
    topic: "Future Continuous",
    polish: "Czy będziesz używał komputera wieczorem?",
    english: ["Will you be using the computer in the evening?"],
  },
  {
    id: "ps-new-184",
    branch_id: "l4-b4",
    topic: "Future Continuous",
    polish: "Będziemy czekać na ciebie przed kinem.",
    english: [
      "We will be waiting for you in front of the cinema.",
      "We'll be waiting for you in front of the cinema.",
    ],
  },
  {
    id: "ps-new-185",
    branch_id: "l4-b4",
    topic: "Future Continuous",
    polish: "On będzie pracował do późna dzisiaj.",
    english: [
      "He will be working late tonight.",
      "He'll be working late tonight.",
    ],
  },

  // L5-B1: Past Perfect Continuous (adding 5 more to reach 15)
  {
    id: "ps-new-186",
    branch_id: "l5-b1",
    topic: "Past Perfect Continuous",
    polish: "Czekałem od dwóch godzin, kiedy w końcu przyszedł.",
    english: [
      "I had been waiting for two hours when he finally arrived.",
      "I'd been waiting for two hours when he finally arrived.",
    ],
  },
  {
    id: "ps-new-187",
    branch_id: "l5-b1",
    topic: "Past Perfect Continuous",
    polish: "Ona uczyła się cały dzień i była bardzo zmęczona.",
    english: [
      "She had been studying all day and was very tired.",
      "She'd been studying all day and was very tired.",
    ],
  },
  {
    id: "ps-new-188",
    branch_id: "l5-b1",
    topic: "Past Perfect Continuous",
    polish: "Jak długo pracowali nad tym projektem, zanim go anulowano?",
    english: [
      "How long had they been working on that project before it was cancelled?",
    ],
  },
  {
    id: "ps-new-189",
    branch_id: "l5-b1",
    topic: "Past Perfect Continuous",
    polish: "Ziemia była mokra, bo wcześniej padało.",
    english: ["The ground was wet because it had been raining."],
  },
  {
    id: "ps-new-190",
    branch_id: "l5-b1",
    topic: "Past Perfect Continuous",
    polish: "Nie czułem się dobrze od kilku dni, więc poszedłem do lekarza.",
    english: [
      "I hadn't been feeling well for a few days, so I went to the doctor.",
      "I had not been feeling well for a few days, so I went to the doctor.",
    ],
  },

  // L5-B2: Future Perfect Simple (adding 5 more to reach 15)
  {
    id: "ps-new-191",
    branch_id: "l5-b2",
    topic: "Future Perfect Simple",
    polish: "Do końca roku napiszę książkę.",
    english: [
      "By the end of the year, I will have written a book.",
      "By the end of the year, I'll have written a book.",
    ],
  },
  {
    id: "ps-new-192",
    branch_id: "l5-b2",
    topic: "Future Perfect Simple",
    polish: "Ona nie skończy pracy do 18:00.",
    english: [
      "She won't have finished work by 6 PM.",
      "She will not have finished work by 6 PM.",
    ],
  },
  {
    id: "ps-new-193",
    branch_id: "l5-b2",
    topic: "Future Perfect Simple",
    polish: "Czy naprawią samochód do jutra?",
    english: ["Will they have fixed the car by tomorrow?"],
  },
  {
    id: "ps-new-194",
    branch_id: "l5-b2",
    topic: "Future Perfect Simple",
    polish: "Zanim przyjedziesz, posprzątamy cały dom.",
    english: [
      "By the time you arrive, we will have cleaned the whole house.",
      "By the time you arrive, we'll have cleaned the whole house.",
    ],
  },
  {
    id: "ps-new-195",
    branch_id: "l5-b2",
    topic: "Future Perfect Simple",
    polish: "On wyda wszystkie pieniądze do końca tygodnia.",
    english: [
      "He will have spent all the money by the end of the week.",
      "He'll have spent all the money by the end of the week.",
    ],
  },

  // L5-B3: Future Perfect Continuous (adding 5 more to reach 15)
  {
    id: "ps-new-196",
    branch_id: "l5-b3",
    topic: "Future Perfect Continuous",
    polish: "W przyszłym miesiącu minie rok, odkąd tu pracuję.",
    english: [
      "Next month I will have been working here for a year.",
      "Next month I'll have been working here for a year.",
    ],
  },
  {
    id: "ps-new-197",
    branch_id: "l5-b3",
    topic: "Future Perfect Continuous",
    polish: "Do czasu przejścia na emeryturę będzie uczył przez 40 lat.",
    english: [
      "By the time he retires, he will have been teaching for 40 years.",
      "By the time he retires, he'll have been teaching for 40 years.",
    ],
  },
  {
    id: "ps-new-198",
    branch_id: "l5-b3",
    topic: "Future Perfect Continuous",
    polish: "Jak długo będziesz się uczył francuskiego do końca kursu?",
    english: [
      "How long will you have been studying French by the end of the course?",
    ],
  },
  {
    id: "ps-new-199",
    branch_id: "l5-b3",
    topic: "Future Perfect Continuous",
    polish:
      "Ona nie będzie mieszkać w Londynie wystarczająco długo, by dostać obywatelstwo.",
    english: [
      "She won't have been living in London long enough to get citizenship.",
      "She will not have been living in London long enough to get citizenship.",
    ],
  },
  {
    id: "ps-new-200",
    branch_id: "l5-b3",
    topic: "Future Perfect Continuous",
    polish: "Do północy będziemy tańczyć od pięciu godzin.",
    english: [
      "By midnight we will have been dancing for five hours.",
      "By midnight we'll have been dancing for five hours.",
    ],
  },

  // L5-B4: Mixed Conditionals (adding 5 more to reach 15)
  {
    id: "ps-new-201",
    branch_id: "l5-b4",
    topic: "Mixed Conditionals",
    polish: "Gdybym nie zjadł tyle wczoraj, nie czułbym się teraz źle.",
    english: ["If I hadn't eaten so much yesterday, I wouldn't feel bad now."],
  },
  {
    id: "ps-new-202",
    branch_id: "l5-b4",
    topic: "Mixed Conditionals",
    polish: "Gdyby ona była lepszym kierowcą, nie miałaby tamtego wypadku.",
    english: [
      "If she were a better driver, she wouldn't have had that accident.",
      "If she was a better driver, she wouldn't have had that accident.",
    ],
  },
  {
    id: "ps-new-203",
    branch_id: "l5-b4",
    topic: "Mixed Conditionals",
    polish: "Gdybyśmy znali drogę, bylibyśmy już na miejscu.",
    english: [
      "If we knew the way, we would be there by now.",
      "If we knew the way, we'd be there by now.",
    ],
  },
  {
    id: "ps-new-204",
    branch_id: "l5-b4",
    topic: "Mixed Conditionals",
    polish: "Gdyby on nie zgubił mapy, nie bylibyśmy teraz zgubieni.",
    english: ["If he hadn't lost the map, we wouldn't be lost now."],
  },
  {
    id: "ps-new-205",
    branch_id: "l5-b4",
    topic: "Mixed Conditionals",
    polish: "Gdybym mówił po włosku, zrozumiałbym, co on wczoraj powiedział.",
    english: [
      "If I spoke Italian, I would have understood what he said yesterday.",
      "If I spoke Italian, I would've understood what he said yesterday.",
    ],
  },
];

async function seedSentences() {
  console.log(`Starting to seed ${newSentences.length} sentences...`);

  const { error } = await supabase.from("sentences").insert(newSentences);

  if (error) {
    console.error("Error inserting sentences:", error);
  } else {
    console.log("Successfully inserted all sentences!");
  }
}

seedSentences();
