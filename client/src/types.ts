export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  original_language: string;
}

export interface TrendingSearch {
  _id: string;
  searchTerm: string;
  count: number;
}