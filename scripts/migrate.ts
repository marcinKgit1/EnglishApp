import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { learningPath } from "../src/data/learningPath";
import { practiceSentences } from "../src/data/sentences";

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

async function migrate() {
  console.log("Starting migration to Supabase...");

  // 1. Migrate Levels and Branches
  for (let i = 0; i < learningPath.length; i++) {
    const level = learningPath[i];

    const { error: levelError } = await supabase.from("levels").upsert({
      id: level.id,
      title: level.title,
      level: level.level,
      focus: level.focus,
      order_index: i,
    });

    if (levelError) {
      console.error("Error inserting level:", levelError);
    } else {
      console.log(`Inserted level: ${level.title}`);
    }

    for (let j = 0; j < level.branches.length; j++) {
      const branch = level.branches[j];

      const { error: branchError } = await supabase.from("branches").upsert({
        id: branch.id,
        level_id: level.id,
        title: branch.title,
        focus: branch.focus || null,
        when: branch.when || null,
        structure: branch.structure,
        examples: branch.examples,
        order_index: j,
      });

      if (branchError) {
        console.error("Error inserting branch:", branchError);
      } else {
        console.log(`Inserted branch: ${branch.title}`);
      }
    }
  }

  // 2. Migrate Sentences
  for (const sentence of practiceSentences) {
    // Find the branch_id for this sentence's topic
    let branchId = null;
    for (const level of learningPath) {
      const branch = level.branches.find((b) => {
        const title = b.title.toLowerCase();
        const topic = sentence.topic.toLowerCase();
        if (title.includes(topic)) return true;
        if (
          topic === "present perfect" &&
          title.includes("present perfect simple")
        )
          return true;
        if (topic === "be going to" && title.includes("going to")) return true;
        if (topic === "first conditional" && title.includes("1st conditional"))
          return true;
        if (topic === "second conditional" && title.includes("2nd"))
          return true;
        if (topic === "past perfect" && title.includes("past perfect simple"))
          return true;
        return false;
      });
      if (branch) {
        branchId = branch.id;
        break;
      }
    }

    if (!branchId) {
      console.warn(`Could not find branch for topic: ${sentence.topic}`);
      continue;
    }

    const { error: sentenceError } = await supabase.from("sentences").upsert({
      id: sentence.id,
      branch_id: branchId,
      topic: sentence.topic,
      polish: sentence.polish,
      english: sentence.english,
    });

    if (sentenceError) {
      console.error("Error inserting sentence:", sentenceError);
    } else {
      console.log(`Inserted sentence: ${sentence.id}`);
    }
  }

  console.log("Migration complete! Check your Supabase Table Editor.");
}

migrate();
