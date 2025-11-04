import { TeamMember } from "@/types/team";
import { adminDb } from "@/lib/firebase-admin";

const teamCollection = adminDb.collection("teamMembers");

export async function readTeamMembers(): Promise<TeamMember[]> {
  try {
    const snapshot = await teamCollection.orderBy("name").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<TeamMember, "id">) }));
  } catch (error) {
    console.warn("Failed to read team members from Firestore; returning empty list.", error);
    return [];
  }
}

export async function getTeamMember(memberId: string): Promise<TeamMember | null> {
  const doc = await teamCollection.doc(memberId).get();

  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...(doc.data() as Omit<TeamMember, "id">) };
}

export async function saveTeamMember(member: TeamMember): Promise<void> {
  await teamCollection.doc(member.id).set(member);
}

export async function removeTeamMember(memberId: string): Promise<void> {
  await teamCollection.doc(memberId).delete();
}
