import httpClient from "../api/http-client";
import type { IServiceResult } from "../domain/IServiceResult";
import type { IJWTResponse } from "../domain/IJWTRepsonse";
import type { AxiosError } from "axios";

export class AccountService {
  userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  async login(
    email: string,
    password: string
  ): Promise<IServiceResult<IJWTResponse>> {
    try {
      let loginInfo = {
        email,
        password,
      };
      let response = await httpClient.post(
        "/identity/account/login",
        loginInfo
      );
      return {
        status: response.status,
        data: response.data as IJWTResponse,
      };
    } catch (e) {
      let response = {
        status: (e as AxiosError).response!.status,
      };

      return response;
    }
  }

  async register(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<any> {
    try {
      const registerInfo = {
        firstName,
        lastName,
        email,
        password,
      };

      let response = await httpClient.post(
        "/identity/account/register",
        registerInfo
      );

      return {
        status: response.status,
      };
    } catch (err) {
      return {
        status: (err as AxiosError).response!.status,
      };
    }
  }

  async refreshIdentity(): Promise<IServiceResult<IJWTResponse>> {
    try {
      let response = await httpClient.post("/identity/account/refreshtoken", {
        jwt: this.userInfo.token,
        refreshToken: this.userInfo.refreshToken,
      });

      localStorage.setItem("userInfo", JSON.stringify(response));
    } catch (e) {
      let response = {
        status: (e as AxiosError).response!.status,
      };

      return response;
    }
    return null as any
  }

  async getMemberCount() {
    try {
      let response = await httpClient.get("/identity/account/getmembercount", {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return response as any;
    } catch (e) {
      let response = {
        status: (e as AxiosError).response!.status,
      };

      return response as any;
    }
  }
}
