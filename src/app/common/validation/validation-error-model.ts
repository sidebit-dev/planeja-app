export interface ValidationErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  fieldsInvalids: CampoInvalido[];
}

export interface CampoInvalido {
  field: string;
  error: string;
}
