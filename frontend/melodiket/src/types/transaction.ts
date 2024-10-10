export interface TransactionResponse {
  pageInfo: {
    hasNextPage: boolean;
    requestedSize: number;
    responsedSize: number;
    lastId: string;
  };
  result: {
    id: string;
    contractAddress: string;
    blockHeight: number;
    eventName: string;
    transactionHash: string;
    timestamp: string;
  }[];
}
