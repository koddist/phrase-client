export interface Authorization {
  id: string;
  note: string;
  token_last_eight: string;
  hashed_token: string;
  scopes: string[];
  expires_at: string;
  created_at: string;
  updated_at: string;
  token: string
}

export interface CurrentUser {
  id: string;
  username: string;
  name: string;
  email: string;
  position: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  main_format: string;
  project_image_url: string;
  created_at: string;
  updated_at: string;
  account: {
    id: string;
    name: string;
    slug: string;
    company: string;
    created_at: string;
    updated_at: string;
  }
}
