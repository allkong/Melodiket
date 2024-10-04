import { UUID } from 'crypto';

export interface StageData {
  name: string;
  address: string;
  isStanding: boolean;
  capacity?: number;
  numOfRow?: number;
  numOfCol?: number;
}

export interface RegisterStageRequest {
  name: string;
  address: string;
  isStanding: boolean;
  capacity?: number;
  numOfRow?: number;
  numOfCol?: number;
}

export interface RegisterStageResponse {
  uuid: UUID;
  name: string;
  address: string;
  isStanding: boolean;
  capacity: number;
  numOfRow: number;
  numOfCol: number;
}
