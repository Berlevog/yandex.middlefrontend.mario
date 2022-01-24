import axios from "axios";
import { API_BASE_URL } from "../constants/url";

export const redirectUrl = "https://berlevog-mario-08.ya-praktikum.tech";

export const getOAuthUrl = (serviceId: string) =>
  `https://oauth.yandex.ru/authorize/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`;

export const getServiceId = (): Promise<any> =>
  axios.get(`${API_BASE_URL}/oauth/yandex/service-id/?redirect_uri=${redirectUrl}`);

export const autorize = (code: string | number): Promise<string> =>
  axios.post(`${API_BASE_URL}/oauth/yandex/`, {
    code,
    redirect_uri: redirectUrl,
  });
