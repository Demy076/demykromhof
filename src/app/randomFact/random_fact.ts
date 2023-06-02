import { ICatResponse } from "./interfaces/ICat";
import { isAxiosError, AxiosInstance } from "axios";

export const retrieveRandomFact = async (
  httpClient: AxiosInstance
): Promise<{
  success: boolean;
  httpCode?: number;
  data?: ICatResponse;
}> => {
  try {
    const { data, status } = await httpClient.get<ICatResponse>(
      "https://catfact.ninja/fact"
    );
    return {
      success: true,
      httpCode: status,
      data,
    };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        httpCode: e.response?.status,
      };
    }
    return {
      success: false,
    };
  }
};
