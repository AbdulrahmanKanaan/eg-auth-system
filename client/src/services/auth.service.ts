import { CONFIG } from "../const";
import { API_ENDPOINTS } from "../const/api-endpoints";
import { ApiCallException } from "../exceptions";
import { FailureResponse, User } from "../types";
import { Service } from "./service";

export class AuthService extends Service {
  private readonly baseUrl;

  constructor() {
    super();
    this.baseUrl = CONFIG.API_URL;
  }

  public async login(
    request: AuthService.Login.Request,
  ): Promise<AuthService.Login.Response> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiCallException({
        data: data as FailureResponse,
        message: data.message,
      });
    }

    return data as AuthService.Login.Response;
  }

  public async register(
    request: AuthService.Register.Request,
  ): Promise<AuthService.Register.Response> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    return {
      token: data.token,
    };
  }

  public async me({
    token,
  }: AuthService.Me.Request): Promise<AuthService.Me.Response> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.ME}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiCallException({
        data: data as FailureResponse,
        message: data.message,
      });
    }

    return data;
  }
}

export namespace AuthService {
  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }

    export interface Response {
      token: string;
    }
  }

  export namespace Register {
    export interface Request {
      name: string;
      email: string;
      password: string;
    }

    export interface Response {
      token: string;
    }
  }

  export namespace Me {
    export interface Request {
      token: string;
    }

    export type Response = User;
  }
}

export const authService = new AuthService();
