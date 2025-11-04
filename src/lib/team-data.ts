import fs from "fs/promises";
import path from "path";
import { TeamMember } from "@/types/team";

const TEAM_DATA_PATH = path.join(process.cwd(), "src", "data", "team-members.json");

export async function readTeamMembers(): Promise<TeamMember[]> {
  const raw = await fs.readFile(TEAM_DATA_PATH, "utf-8");
  const members: TeamMember[] = JSON.parse(raw);
  return members;
}

export async function writeTeamMembers(members: TeamMember[]): Promise<void> {
  await fs.writeFile(
    TEAM_DATA_PATH,
    JSON.stringify(members, null, 2) + "\n",
    "utf-8"
  );
}
