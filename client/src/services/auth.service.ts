import { CONFIG } from "../const";
import { ApiCallException, Exception } from "../exceptions";
import { FailureResponse } from "../types";
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
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data as AuthService.Login.Response;
    } else {
      throw new ApiCallException({
        data: data as FailureResponse,
        message: data.message,
      });
    }

    throw new Exception({ message: "An error occurred" });
  }

  public async register(
    request: AuthService.Register.Request,
  ): Promise<AuthService.Register.Response> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return {
      token: data.token,
    };
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
}

export const authService = new AuthService();
