import { MovieDetailsView } from "@/features/movie/movie-details-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  return <MovieDetailsView id={id} />;
}
