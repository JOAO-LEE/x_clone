export interface NewsDTO {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface NewsResponse {
  articles: Array<NewsDTO>
  status: string
  totalResults: number;
}