import { UUID } from 'crypto';

export interface StageData {
  stageName: string;
  stageAddress: string;
  isStanding: boolean;
  capacity?: number;
  numOfRow?: number;
  numOfCol?: number;
}

export interface RegisterStageRequest {
  stageName: string;
  stageAddress: string;
  isStanding: boolean;
  capacity?: number;
  numOfRow?: number;
  numOfCol?: number;
}

export interface RegisterStageResponse {
  uuid: UUID;
  stageName: string;
  stageAddress: string;
  isStanding: boolean;
  capacity: number;
  numOfRow: number;
  numOfCol: number;
}
