export interface SignUpData {
  loginId: string;
  password: string;
  nickname: string;
  description: string;
  role: SignUpRole['value'];
}

export interface SignUpPolicy {
  key: number;
  label: string;
  isEssential: boolean;
}

export interface SignUpRole {
  key: number;
  mainLabel: string;
  subLabel: string;
  value: 'AUDIENCE' | 'MUSICIAN' | 'MANAGER';
}
