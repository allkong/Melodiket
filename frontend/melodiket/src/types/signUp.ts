export interface SignUpData {
  loginId: string;
  password: string;
  nickname: string;
  name: string;
  description?: string;
  imageUrl?: string;
  role: SignUpRole['value'];
}

export interface SignUpPolicy {
  key: number;
  label: string;
  isEssential: boolean;
}

export interface SignUpRole {
  key: number;
  title: string;
  description: string;
  value: 'audience' | 'musician' | 'stage-manager';
}
