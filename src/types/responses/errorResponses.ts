export interface ErrorType {
  status: number;
  data: {
    message: string;
    status: string;
  };
}