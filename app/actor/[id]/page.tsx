import { ActorProfileView } from "@/features/actor/actor-profile-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ActorPage({ params }: Props) {
  const { id } = await params;
  return <ActorProfileView id={id} />;
}
