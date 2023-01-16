export interface ApiResponse {
  success: boolean;
  response?: any;
  error?: ApiResponseNotifyError;
}

enum TypeError {
  ERROR = "error",
  SUCCESS = "success",
}

export type ApiResponseNotifyError = {
  content: string;
  title: string;
  type: TypeError.ERROR;
};

export type ApiResponseNotifySuccess = {
  content: string;
  title: string;
  type: TypeError.SUCCESS;
};
