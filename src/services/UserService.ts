import type { AxiosError } from "axios";
import httpClient from "../api/http-client";
import { AccountService } from "../services/AccountService";

export class UserService {
  userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  async addLectureToFavorites(lectureId: string) {
    try {
      let response = await httpClient.post(
        "/savedlectures",
        {
          lectureId: lectureId,
        },
        {
          headers: {
            Authorization: "bearer " + this.userInfo.token,
          },
        }
      );
      return response;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.post(
          "/savedlectures",
          {
            lectureId: lectureId,
          },
          {
            headers: {
              Authorization: "bearer " + this.userInfo.token,
            },
          }
        );
        return response;
      }
    }
  }

  async getUserFavorites() {
    try {
      const response = await httpClient.get("/savedlectures", {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return response;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        const response = await httpClient.get("/savedlectures", {
          headers: {
            Authorization: "bearer " + this.userInfo.token,
          },
        });
        return response as any;
      }
    }
  }

  async removeFromFavorites(lectureId: string) {
    try {
      let response = await httpClient.delete(`/savedlectures/${lectureId}`, {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return response;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.delete(`/savedlectures/${lectureId}`, {
          headers: {
            Authorization: "bearer " + this.userInfo.token,
          },
        });
        return response;
      }
    }
  }
}
